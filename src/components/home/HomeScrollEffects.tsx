"use client";

import { useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * Animações ligadas ao scroll na home: crachá, zoom início→sobre, blocos de skills/experiência/projetos.
 */
export function HomeScrollEffects() {
  useLayoutEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mq.matches) return;

    let resizeTimer: ReturnType<typeof setTimeout>;
    const onResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => ScrollTrigger.refresh(), 120);
    };
    window.addEventListener("resize", onResize);

    const ctx = gsap.context(() => {
      const badge = document.querySelector("[data-scroll-badge]");
      const hero = document.getElementById("home");
      const heroZoom = document.querySelector("[data-scroll-hero-zoom]");
      const aboutInner = document.querySelector("[data-scroll-about-inner]");

      /* Crachá: some e desce com o fim do hero; reverte ao subir */
      if (badge && hero) {
        gsap.fromTo(
          badge,
          { opacity: 1, y: 0, scale: 1, rotate: 0 },
          {
            opacity: 0,
            y: 110,
            scale: 0.82,
            rotate: 3,
            ease: "none",
            scrollTrigger: {
              trigger: hero,
              start: "top top",
              end: "bottom 18%",
              scrub: 0.55,
            },
          },
        );
      }

      /* Zoom / handoff: cópia do hero encolhe enquanto “Sobre” entra */
      if (heroZoom) {
        gsap.fromTo(
          heroZoom,
          { scale: 1, opacity: 1 },
          {
            scale: 0.91,
            opacity: 0.55,
            ease: "none",
            scrollTrigger: {
              trigger: "#about",
              start: "top 92%",
              end: "top 28%",
              scrub: 0.85,
            },
          },
        );
      }

      if (aboutInner) {
        gsap.fromTo(
          aboutInner,
          { scale: 0.88, opacity: 0.35, y: 48 },
          {
            scale: 1,
            opacity: 1,
            y: 0,
            ease: "none",
            scrollTrigger: {
              trigger: "#about",
              start: "top 98%",
              end: "top 30%",
              scrub: 0.75,
            },
          },
        );
      }

      /* Habilidades — cartões em sequência */
      const skillCards = gsap.utils.toArray<HTMLElement>(
        "[data-scroll-skills-card]",
      );
      if (skillCards.length) {
        gsap.from(skillCards, {
          opacity: 0,
          y: 44,
          scale: 0.94,
          duration: 0.62,
          stagger: 0.06,
          ease: "power2.out",
          immediateRender: false,
          scrollTrigger: {
            trigger: "#skills",
            start: "top 82%",
            toggleActions: "play none none reverse",
          },
        });
      }

      const skillSoft = document.querySelector("[data-scroll-skills-soft]");
      if (skillSoft) {
        gsap.from(skillSoft, {
          opacity: 0,
          y: 28,
          duration: 0.5,
          ease: "power2.out",
          immediateRender: false,
          scrollTrigger: {
            trigger: skillSoft,
            start: "top 88%",
            toggleActions: "play none none reverse",
          },
        });
      }

      /* Experiência — linhas */
      const expItems = gsap.utils.toArray<HTMLElement>(
        "[data-scroll-exp-item]",
      );
      if (expItems.length) {
        gsap.from(expItems, {
          opacity: 0,
          x: -36,
          duration: 0.55,
          stagger: 0.09,
          ease: "power2.out",
          immediateRender: false,
          scrollTrigger: {
            trigger: "#experience",
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        });
      }

      /* Projetos — grid */
      const projectCards = gsap.utils.toArray<HTMLElement>(
        "[data-scroll-project-card]",
      );
      if (projectCards.length) {
        gsap.from(projectCards, {
          opacity: 0,
          y: 52,
          scale: 0.94,
          duration: 0.65,
          stagger: 0.07,
          ease: "power2.out",
          immediateRender: false,
          scrollTrigger: {
            trigger: "#projects",
            start: "top 78%",
            toggleActions: "play none none reverse",
          },
        });
      }
    });

    ScrollTrigger.refresh();

    return () => {
      window.removeEventListener("resize", onResize);
      clearTimeout(resizeTimer);
      ctx.revert();
    };
  }, []);

  return null;
}
