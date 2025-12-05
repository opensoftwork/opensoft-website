"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  ArrowDown,
  ArrowUpRight,
  ArrowRight,
  Zap,
  Layers,
  Cpu,
  Briefcase,
  Users,
  Check,
  Linkedin,
  Twitter,
  Github,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

gsap.registerPlugin(ScrollTrigger);

const content = {
  client: {
    headline: "Building Software that<br>Solves Real Problems.",
    sub: "We help startups and enterprises build scalable software solutions by combining rapid development with long-term strategic consulting.",
    ctaPrimary: "View Our Work",
    ctaHref: "#work",
    accent: "#3B82F6",
    glowColor: "rgba(59, 130, 246, 0.1)",
  },
  student: {
    headline: "Bridge the Gap Between<br>Theory & Reality.",
    sub: "We bridge the gap between academic theory and industry reality through live project internships.",
    ctaPrimary: "View Internships",
    ctaHref: "#academy",
    accent: "#10B981",
    glowColor: "rgba(16, 185, 129, 0.1)",
  },
};

export const Landing = () => {
  const [mode, setMode] = useState<"client" | "student">("client");
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const ctaPrimaryRef = useRef<HTMLAnchorElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const btnClientRef = useRef<HTMLButtonElement>(null);
  const btnStudentRef = useRef<HTMLButtonElement>(null);
  const bodyRef = useRef<HTMLBodyElement | null>(null);

  useEffect(() => {
    // Show body on load
    gsap.to("body", { autoAlpha: 1, duration: 0.5 });

    const timeline = gsap.timeline();

    // Nav float in
    timeline
      .from(".nav-dock", {
        y: -50,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
      })
      // Hero Elements Stagger
      .from(
        ".hero-element",
        {
          y: 50,
          opacity: 0,
          duration: 1,
          stagger: 0.15,
          ease: "power4.out",
        },
        "-=0.5"
      );

    // Bento Grid Stagger
    gsap.from(".bento-card", {
      scrollTrigger: {
        trigger: "#services",
        start: "top 75%",
      },
      y: 50,
      opacity: 0,
      duration: 0.8,
      stagger: 0.1,
      ease: "power2.out",
    });

    // Pricing Cards
    gsap.from(".pricing-card", {
      scrollTrigger: {
        trigger: ".pricing-card",
        start: "top 80%",
      },
      y: 30,
      opacity: 0,
      duration: 0.6,
      stagger: 0.1,
      ease: "back.out(1.7)",
    });

    // Parallax Effect for Images
    const parallaxWrappers = document.querySelectorAll(".parallax-wrapper");
    parallaxWrappers.forEach((section) => {
      const image = section.querySelector(".parallax-img");
      if (image) {
        gsap.to(image, {
          y: -50,
          ease: "none",
          scrollTrigger: {
            trigger: section as Element,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        });
      }
    });

    // Project Content Reveal
    const projectRows = document.querySelectorAll(".project-row");
    projectRows.forEach((row) => {
      const text = row.querySelector(".project-content");
      if (text) {
        gsap.from(text, {
          scrollTrigger: {
            trigger: row as Element,
            start: "top 70%",
          },
          x: -30,
          opacity: 0,
          duration: 1,
          ease: "power3.out",
        });
      }
    });

    // Academy Section Reveal
    gsap.from(".academy-reveal", {
      scrollTrigger: {
        trigger: "#academy",
        start: "top 60%",
      },
      y: 30,
      opacity: 0,
      duration: 0.8,
      stagger: 0.1,
      ease: "power2.out",
    });

    gsap.from(".academy-card", {
      scrollTrigger: {
        trigger: ".academy-card",
        start: "top 70%",
      },
      x: 50,
      opacity: 0,
      duration: 0.8,
      stagger: 0.1,
      ease: "power2.out",
    });

    // Hover Animations for Images
    const hoverImages = document.querySelectorAll(".hover-scale-img");
    hoverImages.forEach((img) => {
      const hoverAnim = gsap.to(img, {
        scale: 1.1,
        duration: 0.4,
        paused: true,
        ease: "power1.out",
      });
      const parent = img.parentElement;
      if (parent) {
        parent.addEventListener("mouseenter", () => hoverAnim.play());
        parent.addEventListener("mouseleave", () => hoverAnim.reverse());
      }
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  const handleModeChange = (newMode: "client" | "student") => {
    if (newMode === mode) return;
    setMode(newMode);

    const data = content[newMode];

    if (
      !headlineRef.current ||
      !subRef.current ||
      !ctaPrimaryRef.current ||
      !glowRef.current ||
      !btnClientRef.current ||
      !btnStudentRef.current
    )
      return;

    // Button State Updates
    if (newMode === "client") {
      gsap.to(btnClientRef.current, {
        backgroundColor: "#ffffff",
        color: "#000000",
        duration: 0.3,
      });
      gsap.to(btnStudentRef.current, {
        backgroundColor: "transparent",
        color: "#888888",
        duration: 0.3,
      });
      gsap.to(glowRef.current, {
        backgroundColor: data.glowColor,
        duration: 0.5,
      });
      gsap.to(ctaPrimaryRef.current, {
        backgroundColor: data.accent,
        boxShadow: "0 0 0px rgba(0,0,0,0)",
        duration: 0.3,
      });
    } else {
      gsap.to(btnStudentRef.current, {
        backgroundColor: "#ffffff",
        color: "#000000",
        duration: 0.3,
      });
      gsap.to(btnClientRef.current, {
        backgroundColor: "transparent",
        color: "#888888",
        duration: 0.3,
      });
      gsap.to(glowRef.current, {
        backgroundColor: data.glowColor,
        duration: 0.5,
      });
      gsap.to(ctaPrimaryRef.current, {
        backgroundColor: "#059669",
        duration: 0.3,
      });
    }

    // Timeline for Content Switch
    const tl = gsap.timeline();

    tl.to([headlineRef.current, subRef.current, ctaPrimaryRef.current], {
      y: -20,
      opacity: 0,
      duration: 0.3,
      stagger: 0.05,
      ease: "power2.in",
    })
      .call(() => {
        if (headlineRef.current) {
          headlineRef.current.innerHTML = data.headline;
        }
        if (subRef.current) {
          subRef.current.textContent = data.sub;
        }
        if (ctaPrimaryRef.current) {
          ctaPrimaryRef.current.textContent = data.ctaPrimary;
          ctaPrimaryRef.current.setAttribute("href", data.ctaHref);
        }
      })
      .fromTo(
        [headlineRef.current, subRef.current, ctaPrimaryRef.current],
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.4,
          stagger: 0.05,
          ease: "power2.out",
        }
      );
  };

  const currentContent = content[mode];

  return (
    <>
      {/* Noise Overlay */}
      <div className="noise-overlay"></div>

      {/* Floating Navigation */}
      <div className="fixed top-6 left-0 right-0 z-50 flex justify-center px-4 nav-dock">
        <nav className="nav-blur rounded-full px-6 py-3 flex items-center gap-6 shadow-2xl">
          <a
            href="#"
            className="font-display font-bold text-xl tracking-tight text-white hover:opacity-80 transition"
          >
            Open Soft<span className="text-accent">.</span>
          </a>
          <div className="hidden md:flex items-center gap-6 text-sm font-medium text-textMuted">
            <a href="#work" className="hover:text-white transition">
              Work
            </a>
            <a href="#services" className="hover:text-white transition">
              Services
            </a>
            <a href="#about" className="hover:text-white transition">
              About
            </a>
            <a
              href="#academy"
              className="hover:text-studentAccent transition"
            >
              Academy
            </a>
          </div>
          <a
            href="#contact"
            className="bg-white text-black px-4 py-2 rounded-full text-sm font-semibold hover:scale-105 transition transform"
          >
            Book Call
          </a>
        </nav>
      </div>

      {/* Hero Section */}
      <section className="min-h-screen flex flex-col justify-center items-center px-6 relative pt-24 pb-12 overflow-hidden">
        {/* Background Glow */}
        <div
          ref={glowRef}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent/10 rounded-full blur-[120px] pointer-events-none"
          id="hero-glow"
        />

        {/* Toggle Switch */}
        <div className="relative z-10 mb-8 flex p-1 bg-surfaceHighlight rounded-full border border-border hero-element">
          <button
            ref={btnClientRef}
            onClick={() => handleModeChange("client")}
            className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
              mode === "client"
                ? "bg-white text-black shadow-lg"
                : "text-textMuted hover:text-white"
            }`}
          >
            For Clients
          </button>
          <button
            ref={btnStudentRef}
            onClick={() => handleModeChange("student")}
            className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
              mode === "student"
                ? "bg-white text-black shadow-lg"
                : "text-textMuted hover:text-white"
            }`}
          >
            For Students
          </button>
        </div>

        {/* Dynamic Headline */}
        <div className="max-w-4xl text-center relative z-10">
          <h1
            ref={headlineRef}
            className="hero-element font-display text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-[1.1] mb-6 text-transparent bg-clip-text bg-gradient-to-b from-white to-white/60"
            dangerouslySetInnerHTML={{ __html: currentContent.headline }}
          />
          <div className="overflow-hidden">
            <p
              ref={subRef}
              className="hero-element text-lg md:text-xl text-textMuted max-w-2xl mx-auto mb-10 leading-relaxed"
            >
              {currentContent.sub}
            </p>
          </div>

          <div
            className="flex flex-col sm:flex-row gap-4 justify-center items-center hero-element"
            id="hero-cta"
          >
            <a
              ref={ctaPrimaryRef}
              href={currentContent.ctaHref}
              className="px-8 py-3 bg-accent hover:bg-blue-600 text-white rounded-full font-medium transition-colors"
            >
              {currentContent.ctaPrimary}
            </a>
            <a
              href="#contact"
              className="px-8 py-3 border border-border hover:border-white/40 text-textMain rounded-full font-medium transition-colors backdrop-blur-sm"
            >
              Get a Quote
            </a>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 opacity-50 hero-element">
          <ArrowDown className="w-6 h-6 animate-bounce" />
        </div>
      </section>

      {/* Bento Grid Section */}
      <section id="services" className="py-20 px-4 md:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 auto-rows-[minmax(180px,auto)]">
          {/* Block 1: Value Proposition */}
          <div className="md:col-span-2 md:row-span-2 bento-card p-8 flex flex-col justify-between group relative">
            <div className="absolute top-0 right-0 w-64 h-64 bg-accent/5 rounded-full blur-[60px] group-hover:bg-accent/10 transition duration-500"></div>

            <div className="relative z-10">
              <div className="w-12 h-12 rounded-full bg-surfaceHighlight border border-border flex items-center justify-center mb-6 text-accent">
                <Zap className="w-6 h-6" />
              </div>
              <h3 className="font-display text-2xl md:text-3xl font-bold mb-4">
                Rapid MVP to Enterprise Scale
              </h3>
              <p className="text-textMuted text-lg leading-relaxed">
                Most agencies just build what you ask for. We build what your
                business actually needs. From day one, we focus on architecture
                that scales.
              </p>
            </div>

            {/* Simulated Code/Visual */}
            <div className="mt-8 p-4 bg-black/50 rounded-xl border border-white/5 font-mono text-xs text-blue-300 opacity-80 overflow-hidden">
              <div className="flex gap-2 mb-2">
                <div className="w-3 h-3 rounded-full bg-red-500/50"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500/50"></div>
                <div className="w-3 h-3 rounded-full bg-green-500/50"></div>
              </div>
              <p className="typewriter-text">
                &gt; initializing_core_systems...
              </p>
              <p className="typewriter-text">
                &gt; optimizing_database_queries... DONE
              </p>
              <p className="typewriter-text animate-pulse">
                &gt; deploying_to_production...
              </p>
            </div>
          </div>

          {/* Block 2: Divyasimha */}
          <div className="md:col-span-1 md:row-span-2 bento-card p-6 flex flex-col justify-end relative group overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent z-10"></div>
            <div className="absolute inset-0 bg-neutral-800 flex items-center justify-center text-neutral-600">
              <Image
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1974&auto=format&fit=crop"
                alt="Divyasimha"
                fill
                className="object-cover grayscale opacity-60 hover-scale-img"
              />
            </div>

            <div className="relative z-20 translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
              <h4 className="font-display text-xl font-bold text-white">
                Divyasimha
              </h4>
              <p className="text-xs font-mono text-accent mb-2 uppercase tracking-wider">
                The Architect
              </p>
              <p className="text-sm text-gray-300 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-75 leading-snug">
                &quot;I design systems. I turn abstract business goals into
                concrete technical roadmaps.&quot;
              </p>
            </div>
          </div>

          {/* Block 3: Kavya */}
          <div className="md:col-span-1 md:row-span-2 bento-card p-6 flex flex-col justify-end relative group overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent z-10"></div>
            <div className="absolute inset-0 bg-neutral-800 flex items-center justify-center text-neutral-600">
              <Image
                src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1976&auto=format&fit=crop"
                alt="Kavya"
                fill
                className="object-cover grayscale opacity-60 hover-scale-img"
              />
            </div>

            <div className="relative z-20 translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
              <h4 className="font-display text-xl font-bold text-white">
                Kavya
              </h4>
              <p className="text-xs font-mono text-accent mb-2 uppercase tracking-wider">
                The Builder
              </p>
              <p className="text-sm text-gray-300 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-75 leading-snug">
                &quot;The details define the product. I translate design into
                pixel-perfect reality.&quot;
              </p>
            </div>
          </div>

          {/* Block 4: Engagement Models */}
          <div className="md:col-span-2 md:row-span-1 bento-card p-6 flex flex-col">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-display text-lg font-bold flex items-center gap-2">
                <Layers className="w-5 h-5 text-accent" /> Engagement Models
              </h3>
            </div>
            <div className="grid grid-cols-3 gap-2 h-full">
              <div className="bg-surfaceHighlight rounded-lg p-3 hover:bg-accent/20 transition cursor-default border border-transparent hover:border-accent/50 group">
                <div className="text-xs text-textMuted uppercase mb-1">
                  Audit
                </div>
                <div className="font-bold text-sm mb-1 group-hover:text-white">
                  Consultation
                </div>
              </div>
              <div className="bg-surfaceHighlight rounded-lg p-3 hover:bg-accent/20 transition cursor-default border border-transparent hover:border-accent/50 group">
                <div className="text-xs text-textMuted uppercase mb-1">
                  Build
                </div>
                <div className="font-bold text-sm mb-1 group-hover:text-white">
                  MVP Launch
                </div>
              </div>
              <div className="bg-surfaceHighlight rounded-lg p-3 hover:bg-accent/20 transition cursor-default border border-transparent hover:border-accent/50 group">
                <div className="text-xs text-textMuted uppercase mb-1">
                  Scale
                </div>
                <div className="font-bold text-sm mb-1 group-hover:text-white">
                  Dedicated Team
                </div>
              </div>
            </div>
          </div>

          {/* Block 5: AI Persona */}
          <div className="md:col-span-1 md:row-span-1 bento-card p-6 flex flex-col items-center justify-center text-center relative overflow-hidden">
            <div className="absolute inset-0 flex items-center justify-center opacity-20">
              <Cpu className="w-24 h-24 animate-spin-slow" />
            </div>
            <div className="relative z-10">
              <div className="font-mono text-xs text-accent mb-1">
                AI Powered
              </div>
              <div className="font-bold text-white">Efficiency First</div>
            </div>
          </div>

          {/* Block 6: Contact Teaser */}
          <a
            href="#contact"
            className="md:col-span-1 md:row-span-1 bento-card p-6 flex flex-col justify-center items-center hover:bg-white hover:text-black transition-colors group cursor-pointer"
          >
            <ArrowUpRight className="w-8 h-8 mb-2 group-hover:scale-110 transition" />
            <span className="font-bold">Start Project</span>
          </a>
        </div>
      </section>

      {/* Detailed Services List */}
      <section className="py-20 px-4 border-t border-white/5 bg-surfaceHighlight/30">
        <div className="max-w-7xl mx-auto">
          <h2 className="font-display text-3xl font-bold mb-12 text-center section-title">
            Contextual Pricing
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Tier 1 */}
            <div className="pricing-card p-8 rounded-2xl border border-white/10 bg-surface hover:border-accent/50 transition duration-300">
              <h3 className="text-xl font-bold mb-2">Consultation</h3>
              <p className="text-textMuted text-sm mb-6 h-10">
                For companies needing direction but not ready to build.
              </p>
              <ul className="space-y-3 mb-8 text-sm text-gray-400">
                <li className="flex gap-2">
                  <Check className="w-4 h-4 text-accent" /> Tech stack
                  selection
                </li>
                <li className="flex gap-2">
                  <Check className="w-4 h-4 text-accent" /> Hiring strategy
                </li>
                <li className="flex gap-2">
                  <Check className="w-4 h-4 text-accent" /> GTM fit analysis
                </li>
              </ul>
              <div className="text-white font-mono text-lg">
                Hourly / Fixed Fee
              </div>
            </div>

            {/* Tier 2 */}
            <div className="pricing-card p-8 rounded-2xl border border-accent bg-surface relative overflow-hidden group">
              <div className="absolute top-0 right-0 bg-accent text-white text-[10px] font-bold px-3 py-1 uppercase rounded-bl-lg">
                Popular
              </div>
              <h3 className="text-xl font-bold mb-2 text-white">MVP Build</h3>
              <p className="text-textMuted text-sm mb-6 h-10">
                Startups needing a Web App or Mobile App V1.
              </p>
              <ul className="space-y-3 mb-8 text-sm text-gray-300">
                <li className="flex gap-2">
                  <Check className="w-4 h-4 text-accent" /> Design &
                  Prototyping
                </li>
                <li className="flex gap-2">
                  <Check className="w-4 h-4 text-accent" /> Full Stack
                  Development
                </li>
                <li className="flex gap-2">
                  <Check className="w-4 h-4 text-accent" /> Deployment &
                  Launch
                </li>
              </ul>
              <div className="text-white font-mono text-lg">Project Based</div>
            </div>

            {/* Tier 3 */}
            <div className="pricing-card p-8 rounded-2xl border border-white/10 bg-surface hover:border-accent/50 transition duration-300">
              <h3 className="text-xl font-bold mb-2">Dedicated Team</h3>
              <p className="text-textMuted text-sm mb-6 h-10">
                Enterprises needing ongoing dev work and scale.
              </p>
              <ul className="space-y-3 mb-8 text-sm text-gray-400">
                <li className="flex gap-2">
                  <Check className="w-4 h-4 text-accent" /> Resource Management
                </li>
                <li className="flex gap-2">
                  <Check className="w-4 h-4 text-accent" /> Monthly Features
                </li>
                <li className="flex gap-2">
                  <Check className="w-4 h-4 text-accent" /> 24/7 Maintenance
                </li>
              </ul>
              <div className="text-white font-mono text-lg">
                Monthly Retainer
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Work / Case Studies */}
      <section id="work" className="py-24 px-4 max-w-7xl mx-auto">
        <h2 className="font-display text-4xl md:text-5xl font-bold mb-16 section-title">
          Selected Works
        </h2>

        {/* Project 1 */}
        <div className="project-row grid grid-cols-1 lg:grid-cols-2 gap-12 mb-24 items-center">
          <div className="order-2 lg:order-1 project-content">
            <div className="flex items-center gap-2 mb-4">
              <span className="px-3 py-1 rounded-full border border-white/10 text-xs font-mono text-textMuted">
                Fintech
              </span>
              <span className="px-3 py-1 rounded-full border border-white/10 text-xs font-mono text-textMuted">
                React
              </span>
            </div>
            <h3 className="text-3xl font-bold mb-6">
              Automating Financial Data
            </h3>
            <div className="space-y-6 text-textMuted">
              <div>
                <strong className="text-white block mb-1">
                  The Challenge
                </strong>
                <p className="text-sm">
                  Client was manually processing 5,000+ invoices monthly,
                  leading to massive data entry errors.
                </p>
              </div>
              <div>
                <strong className="text-white block mb-1">The Solution</strong>
                <p className="text-sm">
                  Built a custom React dashboard with Python OCR integration to
                  automate extraction.
                </p>
              </div>
              <div>
                <strong className="text-white block mb-1">The Outcome</strong>
                <p className="text-sm text-accent">
                  Reduced processing time by 40% and cut error rates to near
                  zero.
                </p>
              </div>
            </div>
          </div>
          <div className="order-1 lg:order-2 h-[400px] bg-surfaceHighlight rounded-2xl overflow-hidden border border-white/5 relative group parallax-wrapper">
            <Image
              src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop"
              alt="Dashboard"
              fill
              className="parallax-img absolute inset-0 w-full h-[120%] object-cover opacity-80 group-hover:opacity-100 transition-opacity"
            />
          </div>
        </div>

        {/* Project 2 */}
        <div className="project-row grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="order-2 lg:order-2 project-content">
            <div className="flex items-center gap-2 mb-4">
              <span className="px-3 py-1 rounded-full border border-white/10 text-xs font-mono text-textMuted">
                E-Commerce
              </span>
              <span className="px-3 py-1 rounded-full border border-white/10 text-xs font-mono text-textMuted">
                Flutter
              </span>
            </div>
            <h3 className="text-3xl font-bold mb-6">
              Scalable Mobile Commerce
            </h3>
            <div className="space-y-6 text-textMuted">
              <div>
                <strong className="text-white block mb-1">
                  The Challenge
                </strong>
                <p className="text-sm">
                  Legacy app crashed during high-traffic sales events.
                </p>
              </div>
              <div>
                <strong className="text-white block mb-1">The Solution</strong>
                <p className="text-sm">
                  Re-engineered the mobile architecture using Flutter for
                  cross-platform stability.
                </p>
              </div>
              <div>
                <strong className="text-white block mb-1">The Outcome</strong>
                <p className="text-sm text-accent">
                  Zero downtime during Black Friday; 25% increase in conversion.
                </p>
              </div>
            </div>
          </div>
          <div className="order-1 lg:order-1 h-[400px] bg-surfaceHighlight rounded-2xl overflow-hidden border border-white/5 relative group parallax-wrapper">
            <Image
              src="https://images.unsplash.com/photo-1661956602116-aa6865609028?q=80&w=2064&auto=format&fit=crop"
              alt="Mobile App"
              fill
              className="parallax-img absolute inset-0 w-full h-[120%] object-cover opacity-80 group-hover:opacity-100 transition-opacity"
            />
          </div>
        </div>
      </section>

      {/* Academy Section */}
      <section
        id="academy"
        className="py-24 px-4 bg-[#080F08] relative overflow-hidden border-t border-studentAccent/20"
      >
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-studentAccent/5 rounded-full blur-[100px] pointer-events-none academy-glow"></div>
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <span className="text-studentAccent font-mono text-sm uppercase tracking-widest mb-4 block academy-reveal">
            For Students
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-6 academy-reveal">
            Bridge the Gap.
          </h2>
          <p className="text-lg text-textMuted mb-12 max-w-2xl mx-auto academy-reveal">
            Textbooks don&apos;t ship code. Open Soft Academy bridges the gap
            between academic theory and industry reality through live project
            internships.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left max-w-2xl mx-auto mb-12">
            <div className="academy-card bg-black/40 border border-studentAccent/20 p-6 rounded-xl backdrop-blur-sm hover:border-studentAccent/50 transition">
              <div className="w-10 h-10 bg-studentAccent/10 rounded-full flex items-center justify-center text-studentAccent mb-4">
                <Briefcase className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-white mb-2">Paid Internships</h4>
              <p className="text-sm text-textMuted">
                Work on real client projects. Get paid to learn.
              </p>
            </div>
            <div className="academy-card bg-black/40 border border-studentAccent/20 p-6 rounded-xl backdrop-blur-sm hover:border-studentAccent/50 transition">
              <div className="w-10 h-10 bg-studentAccent/10 rounded-full flex items-center justify-center text-studentAccent mb-4">
                <Users className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-white mb-2">Workshops</h4>
              <p className="text-sm text-textMuted">
                Intensive sessions for 3rd/4th year students.
              </p>
            </div>
          </div>
          <a
            href="#"
            className="academy-reveal inline-flex items-center gap-2 text-studentAccent font-bold hover:text-white transition"
          >
            Apply Now <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="py-12 px-4 border-t border-white/5 bg-black">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="text-center md:text-left">
            <h2 className="font-display text-2xl font-bold mb-1">Open Soft.</h2>
            <p className="text-textMuted text-sm">Bengaluru, India.</p>
          </div>

          <div className="flex gap-6">
            <a
              href="#"
              className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/20 transition text-white"
            >
              <Linkedin className="w-4 h-4" />
            </a>
            <a
              href="#"
              className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/20 transition text-white"
            >
              <Twitter className="w-4 h-4" />
            </a>
            <a
              href="#"
              className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/20 transition text-white"
            >
              <Github className="w-4 h-4" />
            </a>
          </div>

          <div className="text-xs text-textMuted">
            &copy; 2025 Open Soft. All rights reserved. <br />
            <Link href="/terms-conditions" className="text-textMuted hover:text-white transition text-xl">Terms & Conditions</Link> 
          </div>
        </div>
      </footer>
    </>
  );
};
