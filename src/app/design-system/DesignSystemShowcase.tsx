"use client";

import { NeoFadeIn, NeoSlideIn, NeoScaleUp, NeoBounceCard } from "@/components/animations/NeoAnimations";

const colors = [
  { name: "Purple", hex: "#7c3aed", var: "--neo-purple", class: "bg-neo-purple", text: "text-white" },
  { name: "Purple Light", hex: "#a78bfa", var: "--neo-purple-light", class: "bg-neo-purple-light", text: "text-white" },
  { name: "Purple Dark", hex: "#5b21b6", var: "--neo-purple-dark", class: "bg-neo-purple-dark", text: "text-white" },
  { name: "Gold", hex: "#d97706", var: "--neo-gold", class: "bg-neo-gold", text: "text-white" },
  { name: "Gold Light", hex: "#fbbf24", var: "--neo-gold-light", class: "bg-neo-gold-light", text: "text-neo-black" },
  { name: "Yellow", hex: "#facc15", var: "--neo-yellow", class: "bg-neo-yellow", text: "text-neo-black" },
  { name: "Yellow Light", hex: "#fef08a", var: "--neo-yellow-light", class: "bg-neo-yellow-light", text: "text-neo-black" },
  { name: "Lilac", hex: "#c4b5fd", var: "--neo-lilac", class: "bg-neo-lilac", text: "text-neo-black" },
  { name: "Lilac Light", hex: "#ddd6fe", var: "--neo-lilac-light", class: "bg-neo-lilac-light", text: "text-neo-black" },
  { name: "Black", hex: "#1a1a1a", var: "--neo-black", class: "bg-neo-black", text: "text-white" },
  { name: "White", hex: "#fffbeb", var: "--neo-white", class: "bg-neo-white", text: "text-neo-black" },
  { name: "Cream", hex: "#fef3c7", var: "--neo-cream", class: "bg-neo-cream", text: "text-neo-black" },
];

export default function DesignSystemShowcase() {
  return (
    <div className="space-y-16">
      {/* Color Palette */}
      <section>
        <NeoFadeIn>
          <h2 className="text-2xl font-bold mb-6">Color Palette</h2>
        </NeoFadeIn>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {colors.map((c, i) => (
            <NeoScaleUp key={c.name} delay={i * 0.06}>
              <div className="overflow-hidden rounded-xl border-[3px] border-neo-black shadow-[4px_4px_0px_var(--neo-black)]">
                <div className={`h-20 ${c.class}`} />
                <div className="bg-white p-3">
                  <p className="font-bold text-sm text-neo-black">{c.name}</p>
                  <p className="text-xs text-neo-gray font-mono">{c.hex}</p>
                </div>
              </div>
            </NeoScaleUp>
          ))}
        </div>
      </section>

      <hr className="neo-divider" />

      {/* Buttons */}
      <section>
        <NeoFadeIn>
          <h2 className="text-2xl font-bold mb-6">Buttons</h2>
        </NeoFadeIn>
        <div className="flex flex-wrap gap-4">
          <NeoSlideIn delay={0.1} direction="left">
            <button className="neo-btn neo-btn-purple">Purple Action</button>
          </NeoSlideIn>
          <NeoSlideIn delay={0.2} direction="left">
            <button className="neo-btn neo-btn-yellow">Yellow Action</button>
          </NeoSlideIn>
          <NeoSlideIn delay={0.3} direction="left">
            <button className="neo-btn neo-btn-gold">Gold Action</button>
          </NeoSlideIn>
          <NeoSlideIn delay={0.4} direction="left">
            <button className="neo-btn neo-btn-lilac">Lilac Action</button>
          </NeoSlideIn>
        </div>
      </section>

      <hr className="neo-divider" />

      {/* Cards with hover animation */}
      <section>
        <NeoFadeIn>
          <h2 className="text-2xl font-bold mb-6">Cards (GSAP hover)</h2>
        </NeoFadeIn>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {["bg-neo-lilac-light", "bg-neo-yellow-light", "bg-neo-cream"].map((bg, i) => (
            <NeoScaleUp key={bg} delay={i * 0.12}>
              <NeoBounceCard className={`p-6 ${bg}`}>
                <h3 className="font-bold text-lg mb-2">Card {i + 1}</h3>
                <p className="text-sm text-neo-gray">Hover me for the neobrutalism press effect.</p>
              </NeoBounceCard>
            </NeoScaleUp>
          ))}
        </div>
      </section>

      <hr className="neo-divider" />

      {/* Tags */}
      <section>
        <NeoFadeIn>
          <h2 className="text-2xl font-bold mb-6">Tags</h2>
        </NeoFadeIn>
        <div className="flex flex-wrap gap-3">
          <span className="neo-tag bg-neo-purple text-white anim-fade-in anim-delay-1">GSAP</span>
          <span className="neo-tag bg-neo-yellow anim-fade-in anim-delay-2">Next.js</span>
          <span className="neo-tag bg-neo-lilac anim-fade-in anim-delay-3">Tailwind</span>
          <span className="neo-tag bg-neo-gold text-white anim-fade-in anim-delay-4">TypeScript</span>
        </div>
      </section>

      <hr className="neo-divider" />

    </div>
  );
}
