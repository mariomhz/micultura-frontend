export function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export function isValidPassword(password: string): boolean {
  return password.length >= 8;
}

export function doPasswordsMatch(password: string, confirm: string): boolean {
  return password === confirm;
}

export interface RegisterFormErrors {
  nombre?: string;
  email?: string;
  password?: string;
  confirm?: string;
}

export function validateRegisterForm(fields: {
  nombre: string;
  email: string;
  password: string;
  confirm: string;
}): RegisterFormErrors {
  const errors: RegisterFormErrors = {};

  if (!fields.nombre.trim()) {
    errors.nombre = "El nombre es obligatorio";
  }

  if (!fields.email.trim()) {
    errors.email = "El email es obligatorio";
  } else if (!isValidEmail(fields.email)) {
    errors.email = "El email no es válido";
  }

  if (!fields.password) {
    errors.password = "La contraseña es obligatoria";
  } else if (!isValidPassword(fields.password)) {
    errors.password = "La contraseña debe tener al menos 8 caracteres";
  }

  if (!fields.confirm) {
    errors.confirm = "Confirma tu contraseña";
  } else if (!doPasswordsMatch(fields.password, fields.confirm)) {
    errors.confirm = "Las contraseñas no coinciden";
  }

  return errors;
}
