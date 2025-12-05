"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowLeft, FileText, Shield, Code, Lock, AlertTriangle } from "lucide-react";
import Link from "next/link";

gsap.registerPlugin(ScrollTrigger);

export const TermsAndConditions = () => {
  const sectionRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    // Page load animation
    const tl = gsap.timeline();
    
    tl.from(".terms-header", {
      y: -30,
      opacity: 0,
      duration: 0.8,
      ease: "power3.out",
    })
      .from(".terms-intro", {
        y: 30,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
      }, "-=0.4")
      .from(".terms-nav", {
        x: -30,
        opacity: 0,
        duration: 0.6,
        ease: "power2.out",
      }, "-=0.6");

    // Section reveal animations - set initial state first
    sectionRefs.current.forEach((section) => {
      if (section) {
        gsap.set(section, { opacity: 1, y: 0 }); // Ensure visible initially
      }
    });

    // Then animate on scroll
    sectionRefs.current.forEach((section, index) => {
      if (section) {
        gsap.from(section, {
          scrollTrigger: {
            trigger: section,
            start: "top 85%",
            end: "bottom 20%",
            toggleActions: "play none none reverse",
          },
          y: 50,
          opacity: 0,
          duration: 0.8,
          delay: index * 0.1,
          ease: "power3.out",
        });

        // Icon animation
        const icon = section.querySelector(".section-icon");
        if (icon) {
          gsap.set(icon, { scale: 1, rotation: 0 }); // Ensure visible initially
          gsap.from(icon, {
            scrollTrigger: {
              trigger: section,
              start: "top 85%",
            },
            scale: 0,
            rotation: -180,
            duration: 0.6,
            ease: "back.out(1.7)",
          });
        }
      }
    });

    // Number counter animation
    const numbers = document.querySelectorAll(".section-number");
    numbers.forEach((num) => {
      gsap.set(num, { scale: 1, rotation: 0 }); // Ensure visible initially
      gsap.from(num, {
        scrollTrigger: {
          trigger: num,
          start: "top 85%",
        },
        scale: 0,
        rotation: -360,
        duration: 0.8,
        ease: "elastic.out(1, 0.5)",
      });
    });

    // Content fade-in for each paragraph - ensure visible initially
    const paragraphs = document.querySelectorAll(".terms-content p, .terms-content ul");
    paragraphs.forEach((p) => {
      gsap.set(p, { opacity: 1, y: 0 }); // Ensure visible initially
    });
    
    // Then animate on scroll
    paragraphs.forEach((p, index) => {
      gsap.from(p, {
        scrollTrigger: {
          trigger: p,
          start: "top 90%",
        },
        y: 20,
        opacity: 0,
        duration: 0.6,
        delay: index * 0.05,
        ease: "power2.out",
      });
    });

    // Scroll progress indicator
    const progressBar = document.getElementById("scroll-progress");
    if (progressBar) {
      gsap.to(progressBar, {
        width: "100%",
        ease: "none",
        scrollTrigger: {
          trigger: "body",
          start: "top top",
          end: "bottom bottom",
          scrub: true,
        },
      });
    }

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  const sections = [
    {
      id: 1,
      title: "Introduction",
      icon: FileText,
      content: (
        <>
          <p className="text-textMuted leading-relaxed mb-4">
            Welcome to Open Soft. By accessing our website and services, you agree to these terms.
          </p>
          <p className="text-textMuted leading-relaxed">
            These Terms and Conditions govern your use of our website and services. Please read them carefully before using our services.
          </p>
        </>
      ),
    },
    {
      id: 2,
      title: "Services",
      icon: Code,
      content: (
        <>
          <p className="text-textMuted leading-relaxed mb-4">
            We provide software development and consulting services. Specific deliverables are defined in individual client contracts.
          </p>
          <p className="text-textMuted leading-relaxed mb-4">
            Our services include but are not limited to:
          </p>
          <ul className="list-disc list-inside space-y-2 text-textMuted ml-4">
            <li>Custom software development</li>
            <li>Technical consulting and architecture design</li>
            <li>MVP development and rapid prototyping</li>
            <li>Dedicated development teams</li>
            <li>Code reviews and technical audits</li>
          </ul>
        </>
      ),
    },
    {
      id: 3,
      title: "Intellectual Property",
      icon: Shield,
      content: (
        <>
          <p className="text-textMuted leading-relaxed mb-4">
            All code and designs created for clients become client property upon full payment, unless otherwise agreed. Open Soft retains rights to reusable internal tools and libraries.
          </p>
          <p className="text-textMuted leading-relaxed">
            We maintain ownership of our proprietary frameworks, tools, and methodologies developed independently of client projects.
          </p>
        </>
      ),
    },
    {
      id: 4,
      title: "Confidentiality",
      icon: Lock,
      content: (
        <>
          <p className="text-textMuted leading-relaxed mb-4">
            We respect client privacy and sign NDAs for all sensitive projects.
          </p>
          <p className="text-textMuted leading-relaxed">
            All client information, project details, and proprietary data are treated with strict confidentiality. We implement industry-standard security measures to protect your information.
          </p>
        </>
      ),
    },
    {
      id: 5,
      title: "Limitation of Liability",
      icon: AlertTriangle,
      content: (
        <>
          <p className="text-textMuted leading-relaxed mb-4">
            Open Soft is not liable for indirect damages or loss of profits arising from software usage.
          </p>
          <p className="text-textMuted leading-relaxed mb-4">
            Our liability is limited to the value of services provided. We are not responsible for:
          </p>
          <ul className="list-disc list-inside space-y-2 text-textMuted ml-4">
            <li>Indirect, incidental, or consequential damages</li>
            <li>Loss of profits, revenue, or business opportunities</li>
            <li>Data loss or corruption beyond our direct control</li>
            <li>Third-party service failures or integrations</li>
          </ul>
        </>
      ),
    },
  ];

  return (
    <div className="min-h-screen bg-background text-textMain relative overflow-hidden">
      {/* Noise Overlay */}
      <div className="noise-overlay"></div>

      {/* Background Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-accent/5 rounded-full blur-[120px] pointer-events-none"></div>

      {/* Navigation Back Button */}
      <div className="fixed top-4 sm:top-6 left-4 sm:left-6 z-50 terms-nav">
        <Link
          href="/"
          className="group flex items-center gap-2 px-3 sm:px-4 py-2 rounded-full bg-surface/90 backdrop-blur-sm border border-border hover:border-accent/50 transition-all duration-300 hover:bg-surfaceHighlight shadow-lg"
        >
          <ArrowLeft className="w-4 h-4 text-textMuted group-hover:text-accent transition-colors" />
          <span className="text-xs sm:text-sm font-medium text-textMuted group-hover:text-white transition-colors hidden sm:inline">
            Back to Home
          </span>
        </Link>
      </div>

      {/* Header Section */}
      <header className="relative z-10 pt-24 sm:pt-32 pb-12 sm:pb-20 px-6 text-center">
        <div className="max-w-4xl mx-auto terms-header">
          <div className="inline-flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-accent/10 border border-accent/20 mb-6">
            <FileText className="w-7 h-7 sm:w-8 sm:h-8 text-accent" />
          </div>
          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-4 sm:mb-6 bg-gradient-to-b from-white to-white/60 text-transparent bg-clip-text">
            Terms & Conditions
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-textMuted max-w-2xl mx-auto terms-intro mb-6">
            Please read these terms carefully before using our services.
          </p>
          <div className="text-xs sm:text-sm text-textMuted">
            Last updated: {new Date().toLocaleDateString("en-US", { 
              year: "numeric", 
              month: "long", 
              day: "numeric" 
            })}
          </div>
        </div>
      </header>

      {/* Terms Content */}
      <main className="relative z-10 max-w-4xl mx-auto px-6 pb-24">
        <div className="space-y-6 md:space-y-8">
          {sections.map((section, index) => {
            const IconComponent = section.icon;
            return (
              <div
                key={section.id}
                ref={(el) => {
                  sectionRefs.current[index] = el;
                }}
                className="terms-section group opacity-100"
              >
                <div className="bento-card p-6 md:p-8 lg:p-10 hover:border-accent/30 transition-all duration-300">
                  {/* Section Header */}
                  <div className="flex flex-col sm:flex-row items-start gap-4 sm:gap-6 mb-6">
                    {/* Number Badge and Icon Container */}
                    <div className="flex items-center gap-4 shrink-0">
                      {/* Number Badge */}
                      <div className="section-number w-12 h-12 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center font-display font-bold text-xl text-accent">
                        {section.id}
                      </div>

                      {/* Icon */}
                      <div className="section-icon">
                        <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-surfaceHighlight border border-border flex items-center justify-center text-accent group-hover:bg-accent/10 group-hover:border-accent/30 transition-all duration-300">
                          <IconComponent className="w-6 h-6 sm:w-7 sm:h-7" />
                        </div>
                      </div>
                    </div>

                    {/* Title */}
                    <div className="flex-1 min-w-0">
                      <h2 className="font-display text-xl sm:text-2xl md:text-3xl font-bold text-white mb-3">
                        {section.id}. {section.title}
                      </h2>
                      <div className="h-1 w-0 bg-accent group-hover:w-full transition-all duration-500"></div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="terms-content sm:ml-0 md:ml-[104px] lg:ml-[120px]">
                    {section.content}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer Note */}
        <div className="mt-16 p-8 rounded-2xl bg-surfaceHighlight/50 border border-border text-center">
          <p className="text-textMuted text-sm leading-relaxed">
            If you have any questions about these Terms & Conditions, please contact us at{" "}
            <a
              href="mailto:legal@opensoft.com"
              className="text-accent hover:text-blue-400 transition-colors underline"
            >
              legal@opensoft.com
            </a>
          </p>
        </div>
      </main>

      {/* Scroll Progress Indicator */}
      <div className="fixed bottom-0 left-0 right-0 h-1 bg-surfaceHighlight z-50">
        <div
          className="h-full bg-accent transition-all duration-300"
          style={{ width: "0%" }}
          id="scroll-progress"
        />
      </div>
    </div>
  );
};
