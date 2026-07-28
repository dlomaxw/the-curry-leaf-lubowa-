"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import RotatingSeal from "./RotatingSeal";

/**
 * Brand intro shown on every full page load: the gold wordmark rises out of
 * the dark plate, a light sweep travels through the lettering (masked by the
 * logo itself), then the whole screen wipes upward to reveal the site.
 * Client-side navigations never remount the layout, so it plays only once.
 */
export default function SplashScreen() {
  const reduce = useReducedMotion();
  const [done, setDone] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setDone(true), reduce ? 500 : 2050);
    return () => clearTimeout(t);
  }, [reduce]);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          key="splash"
          initial={false}
          exit={
            reduce
              ? { opacity: 0, transition: { duration: 0.3 } }
              : {
                  clipPath: "inset(0 0 100% 0)",
                  transition: { duration: 0.7, ease: [0.76, 0, 0.24, 1] },
                }
          }
          style={{ clipPath: "inset(0 0 0% 0)" }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-[#191A22]"
          aria-hidden
        >
          {/* Warm glow rising behind the mark */}
          {!reduce && (
            <motion.div
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.4, ease: "easeOut" }}
              className="absolute h-[55vh] w-[55vh] rounded-full bg-saffron/15 blur-[110px]"
            />
          )}

          <div className="relative">
            <motion.div
              initial={reduce ? false : { opacity: 0, y: 26, scale: 0.94 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              className="relative"
            >
              {/* Slowly rotating text seal framing the mark */}
              {!reduce && (
                <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                  <RotatingSeal size={340} color="rgba(224, 180, 87, 0.32)" duration={26} />
                </div>
              )}
              <Image
                src="/images/logo-gold.png"
                alt=""
                width={792}
                height={426}
                priority
                className="relative h-36 w-auto sm:h-44"
              />

              {/* Light sweep, clipped to the lettering by the logo's own alpha */}
              {!reduce && (
                <div
                  className="pointer-events-none absolute inset-0 overflow-hidden"
                  style={{
                    WebkitMaskImage: "url(/images/logo-gold.png)",
                    maskImage: "url(/images/logo-gold.png)",
                    WebkitMaskSize: "contain",
                    maskSize: "contain",
                    WebkitMaskRepeat: "no-repeat",
                    maskRepeat: "no-repeat",
                    WebkitMaskPosition: "center",
                    maskPosition: "center",
                  }}
                >
                  <motion.div
                    initial={{ x: "-120%" }}
                    animate={{ x: "320%" }}
                    transition={{
                      duration: 1.1,
                      delay: 0.55,
                      ease: [0.4, 0, 0.2, 1],
                    }}
                    className="h-full w-1/3 bg-gradient-to-r from-transparent via-white/80 to-transparent blur-[6px]"
                  />
                </div>
              )}
            </motion.div>

            {/* Gold rule drawing itself beneath the mark */}
            {!reduce && (
              <motion.div
                initial={{ scaleX: 0, opacity: 0 }}
                animate={{ scaleX: 1, opacity: 1 }}
                transition={{ duration: 0.7, delay: 0.9, ease: [0.22, 1, 0.36, 1] }}
                className="absolute -bottom-7 left-1/2 h-px w-40 -translate-x-1/2 bg-gradient-to-r from-transparent via-saffron to-transparent"
              />
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
