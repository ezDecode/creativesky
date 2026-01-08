"use client";

import React, { useRef, useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Icon } from "@iconify/react";
import { motion, useScroll, useTransform } from "framer-motion";
import type { Variants } from "framer-motion";

import { Shell } from "@/components/layout/Shell";
import { MotionSurface } from "@/content/motion-surface/motion-surface";
import { getAllComponentsMetadata } from "@/lib/registry/resolver";
import MagneticButton from "@/content/magnetic-button/magnetic-button";

function pickRandom<T>(arr: T[], count: number) {
  return [...arr].sort(() => 0.5 - Math.random()).slice(0, count);
}

export default function Home() {
  const router = useRouter();
  const [components, setComponents] = useState<
    ReturnType<typeof getAllComponentsMetadata>
  >([]);
  const [startAnimation, setStartAnimation] = useState(false);
  const [showAboutPreview, setShowAboutPreview] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    setComponents(pickRandom(getAllComponentsMetadata(), 3));
    setStartAnimation(true);
    setIsTouchDevice('ontouchstart' in window || navigator.maxTouchPoints > 0);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    show: { opacity: 1, y: 0 },
  };

  // Hero word animation variants
  const wordContainerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.2
      }
    }
  };

  const wordVariants: Variants = {
    hidden: {
      filter: 'blur(10px)',
      opacity: 0,
      y: 20
    },
    visible: {
      filter: 'blur(0px)',
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1]
      }
    }
  };

  const imageVariants: Variants = {
    hidden: {
      opacity: 0,
      scale: 0.8,
      rotate: -10
    },
    visible: {
      opacity: 1,
      scale: 1,
      rotate: 0,
      transition: {
        duration: 1,
        ease: [0.16, 1, 0.3, 1],
        delay: 0.5
      }
    }
  };

  const fadeInUpVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1]
      }
    }
  };

  const socialContainerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 1.2
      }
    }
  };

  const buttonVariants: Variants = {
    hidden: {
      filter: 'blur(10px)',
      opacity: 0,
      y: 20
    },
    visible: {
      filter: 'blur(0px)',
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.16, 1, 0.3, 1]
      }
    }
  };

  return (
    <Shell>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="flex flex-col gap-16 sm:gap-20"
      >
        {/* ================= HERO ================= */}
        <motion.section variants={itemVariants} className="flex flex-col gap-6 sm:gap-8 tracking-normal">
          {/* Identity row */}
          <div className="flex items-center gap-1 sm:gap-2">
            {/* Avatar */}
            <motion.div
              className="shrink-0 relative group cursor-pointer"
              variants={imageVariants}
              initial="hidden"
              animate={startAnimation ? "visible" : "hidden"}
              onMouseEnter={() => !isTouchDevice && setShowAboutPreview(true)}
              onMouseLeave={() => !isTouchDevice && setShowAboutPreview(false)}
              onClick={() => router.push('/vault')}
            >
              <img
                src="/SiteImages/roundImageHeader.svg"
                alt="Zigato"
                className="rounded-md fill-white h-6 w-6 sm:h-6 sm:w-6 md:h-8 md:w-8"
              />

              {/* About Me Preview - Desktop Hover Only */}
              {showAboutPreview && !isTouchDevice && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute top-full mt-3 left-0 bg-card/95 backdrop-blur-xl border border-border rounded-xl p-4 shadow-2xl z-50 pointer-events-none"
                  style={{ width: '260px' }}
                >
                  <p className="text-muted-foreground text-xs leading-relaxed mb-3">
                    Full-stack developer bridging design and engineering with modern frameworks.
                  </p>
                  <div className="flex gap-1.5">
                    <span className="px-2.5 py-1 bg-muted rounded-full text-[10px] text-foreground">Developer</span>
                    <span className="px-2.5 py-1 bg-muted rounded-full text-[10px] text-foreground">Designer</span>
                    <span className="px-2.5 py-1 bg-muted rounded-full text-[10px] text-foreground">Systems</span>
                  </div>
                </motion.div>
              )}
            </motion.div>

            {/* Name + role */}
            <motion.div
              variants={wordContainerVariants}
              initial="hidden"
              animate={startAnimation ? "visible" : "hidden"}
            >
              <h1 className="flex flex-wrap items-baseline gap-2 sm:gap-3 text-page-heading font-normal leading-none tracking-normal">
                <motion.span variants={wordVariants}>Zigato —</motion.span>
                <motion.span variants={wordVariants} className="text-muted-foreground">
                  UI experiments &amp; components
                </motion.span>
              </h1>
            </motion.div>
          </div>

          {/* Tagline */}
          <motion.div
            variants={wordContainerVariants}
            initial="hidden"
            animate={startAnimation ? "visible" : "hidden"}
          >
            <p className="text-subheading font-medium text-foreground max-w-2xl">
              <motion.span variants={wordVariants} className="inline-block">Designing</motion.span>{" "}
              <motion.span variants={wordVariants} className="inline-block">with</motion.span>{" "}
              <motion.span variants={wordVariants} className="inline-block">humans</motion.span>{" "}
              <motion.span variants={wordVariants} className="inline-block">at</motion.span>{" "}
              <motion.span variants={wordVariants} className="inline-block">the</motion.span>{" "}
              <motion.span variants={wordVariants} className="inline-block">centre.</motion.span>
            </p>
          </motion.div>

          {/* Description */}
          <motion.div
            initial="hidden"
            animate={startAnimation ? "visible" : "hidden"}
            variants={fadeInUpVariants}
            transition={{ delay: 0.8 }}
          >
            <p className="max-w-2xl text-body leading-relaxed text-muted-foreground">
              I build systems that balance ambition with pragmatism. My work spans reusable foundations that scale, intelligent visual experiences that adapt, and cloud-native reliability that endures.{' '}
              <Link href="/vault" className="text-body-emphasis underline underline-offset-4">
                Explore projects
              </Link>
              , or{' '}
              <Link href="mailto:ezdecode@gmail.com" className="text-body-emphasis underline underline-offset-4">
                reach out
              </Link>.
            </p>
          </motion.div>

          {/* Social Links */}
          <motion.div
            initial="hidden"
            animate={startAnimation ? "visible" : "hidden"}
            variants={socialContainerVariants}
            className="flex items-center flex-wrap"
            style={{ gap: 0 }}
            role="group"
            aria-label="Social media links"
          >
            <motion.div variants={buttonVariants}>
              <MagneticButton
                onClick={() => window.open('https://github.com/ezDecode', '_blank')}
                hoverVariant="dark"
                customColor="#b3efb2"
                className="border border-border rounded-none text-foreground/80 hover:rounded-full transition-[border-radius] duration-200"
                style={{
                  fontSize: '0.85rem',
                  fontWeight: 450,
                  paddingLeft: '1.5rem',
                  paddingRight: '1.8rem',
                  paddingTop: '0.5rem',
                  paddingBottom: '0.5rem',
                }}
              >
                <span className="flex items-center gap-2">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                  </svg>
                  GitHub
                </span>
              </MagneticButton>
            </motion.div>

            <motion.div variants={buttonVariants}>
              <MagneticButton
                onClick={() => window.open('https://www.linkedin.com/in/akash-choudhury037/', '_blank')}
                hoverVariant="dark"
                customColor="#42cafd"
                className="border border-border rounded-none text-foreground/80 hover:rounded-full transition-[border-radius] duration-200"
                style={{
                  fontSize: '0.85rem',
                  fontWeight: 450,
                  paddingLeft: '1.5rem',
                  paddingRight: '1.8rem',
                  paddingTop: '0.5rem',
                  paddingBottom: '0.5rem',
                  marginLeft: '-1px',
                }}
              >
                <span className="flex items-center gap-2">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                  LinkedIn
                </span>
              </MagneticButton>
            </motion.div>

            <motion.div variants={buttonVariants}>
              <MagneticButton
                onClick={() => window.location.href = 'mailto:ezdecode@gmail.com'}
                hoverVariant="dark"
                customColor="#3157ffff"
                className="border border-border rounded-none text-foreground/80 hover:rounded-full transition-[border-radius] duration-200"
                style={{
                  fontSize: '0.85rem',
                  fontWeight: 450,
                  paddingLeft: '1.5rem',
                  paddingRight: '1.8rem',
                  paddingTop: '0.5rem',
                  paddingBottom: '0.5rem',
                  marginLeft: '-1px',
                }}
              >
                <span className="flex items-center gap-2">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.273H1.636A1.636 1.636 0 0 1 0 19.366V5.457c0-2.023 2.309-3.178 3.927-1.964L5.455 4.64 12 9.548l6.545-4.91 1.528-1.145C21.69 2.28 24 3.434 24 5.457z" />
                  </svg>
                  Email
                </span>
              </MagneticButton>
            </motion.div>
          </motion.div>
        </motion.section>

        {/* ================= LAB PREVIEW ================= */}
        <motion.section variants={itemVariants} className="flex flex-col gap-4 sm:gap-6">
          <h2 className="text-xs font-medium text-muted-foreground">Lab</h2>

          <MotionSurface>
            {components.map((component) => (
              <Link
                key={component.id}
                href={`/lab/${component.id}`}
                className="group block w-full rounded-md py-3 transition-colors"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex flex-col gap-1">
                    <span className="text-sm sm:text-base font-medium text-foreground">
                      {component.title}
                    </span>

                    {component.description && (
                      <span className="line-clamp-2 text-xs sm:text-sm text-muted-foreground">
                        {component.description}
                      </span>
                    )}
                  </div>

                  <Icon
                    icon="solar:arrow-right-linear"
                    className="h-4 w-4 shrink-0 text-muted-foreground/30"
                  />
                </div>
              </Link>
            ))}
          </MotionSurface>
        </motion.section>

        {/* ================= LAB CTA ================= */}
        <motion.section variants={itemVariants}>
          <Link
            href="/lab"
            className="inline-flex items-center gap-2 rounded-2xl bg-muted/40 px-3 py-1.5 text-xs sm:text-sm font-medium text-foreground/60 transition hover:bg-muted hover:text-foreground"
          >
            Visit Lab
            <Icon
              icon="solar:arrow-right-linear"
              className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1"
            />
          </Link>
        </motion.section>
      </motion.div>
    </Shell>
  );
}
