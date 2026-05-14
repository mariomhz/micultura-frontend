"use client";

import { createContext, useContext, useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { getAccessToken, setAccessToken, clearAccessToken } from "@/lib/accessToken";
import { logout as logoutRequest, refresh as refreshRequest } from "@/services/auth";

interface AuthUser {
  id: string;
  nombre: string;
  email: string;
  rol: string;
}

interface AuthContextType {
  user: AuthUser | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (token: string, user: AuthUser) => void;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

function decodeTokenPayload(token: string): AuthUser | null {
  try {
    const parts = token.split(".");
    if (parts.length !== 3) return null;
    const payload = JSON.parse(atob(parts[1]));
    if (typeof payload.exp === "number" && payload.exp * 1000 < Date.now()) {
      return null;
    }
    return {
      id: payload.id,
      nombre: payload.nombre,
      email: payload.sub,
      rol: payload.rol,
    };
  } catch {
    return null;
  }
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    async function restore() {
      const cookieToken = getAccessToken();
      const decoded = cookieToken ? decodeTokenPayload(cookieToken) : null;
      if (decoded) {
        if (!cancelled) setUser(decoded);
      } else {
        const refreshed = await refreshRequest();
        if (!cancelled && refreshed) {
          setAccessToken(refreshed.token);
          setUser(refreshed.user);
        } else if (!cancelled) {
          clearAccessToken();
        }
      }
      if (!cancelled) setIsLoading(false);
    }

    restore();
    return () => {
      cancelled = true;
    };
  }, []);

  const login = useCallback((token: string, authUser: AuthUser) => {
    setAccessToken(token);
    setUser(authUser);
  }, []);

  const logout = useCallback(async () => {
    await logoutRequest();
    clearAccessToken();
    setUser(null);
    router.push("/login");
  }, [router]);

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isAuthenticated: !!user,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
