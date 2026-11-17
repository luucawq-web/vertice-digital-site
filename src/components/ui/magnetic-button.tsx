"use client";

import * as React from "react";
import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

// Botão magnético sem dependências: segue o cursor com leve inclinação 3D
// e volta ao lugar com efeito elástico. Desliga sozinho em telas de toque
// e para quem prefere menos movimento.
export type MagneticButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> &
  React.AnchorHTMLAttributes<HTMLAnchorElement> & {
    as?: React.ElementType;
    strength?: number;
  };

const MagneticButton = React.forwardRef<HTMLElement, MagneticButtonProps>(
  ({ className, children, as: Component = "button", strength = 0.4, style, ...props }, forwardedRef) => {
    const localRef = useRef<HTMLElement | null>(null);

    useEffect(() => {
      const el = localRef.current;
      if (!el) return;
      const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (!fine || reduced) return;

      const onMove = (e: PointerEvent) => {
        const r = el.getBoundingClientRect();
        const x = e.clientX - r.left - r.width / 2;
        const y = e.clientY - r.top - r.height / 2;
        el.style.transition = "transform 0.35s cubic-bezier(0.22, 1, 0.36, 1)";
        el.style.transform = `translate3d(${x * strength}px, ${y * strength}px, 0) rotateX(${-y * 0.15}deg) rotateY(${x * 0.15}deg) scale(1.05)`;
      };
      const onLeave = () => {
        el.style.transition = "transform 0.9s cubic-bezier(0.34, 1.8, 0.64, 1)";
        el.style.transform = "translate3d(0,0,0) rotateX(0) rotateY(0) scale(1)";
      };
      el.addEventListener("pointermove", onMove);
      el.addEventListener("pointerleave", onLeave);
      return () => {
        el.removeEventListener("pointermove", onMove);
        el.removeEventListener("pointerleave", onLeave);
      };
    }, [strength]);

    return (
      <Component
        ref={(node: HTMLElement) => {
          localRef.current = node;
          if (typeof forwardedRef === "function") forwardedRef(node);
          else if (forwardedRef) (forwardedRef as React.MutableRefObject<HTMLElement | null>).current = node;
        }}
        className={cn("cursor-pointer will-change-transform", className)}
        style={{ transformStyle: "preserve-3d", ...style }}
        {...props}
      >
        {children}
      </Component>
    );
  },
);
MagneticButton.displayName = "MagneticButton";

export default MagneticButton;
