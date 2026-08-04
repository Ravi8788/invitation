"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Heart, Loader2, Sparkles } from "lucide-react";
import { WEDDING } from "@/lib/constants";
import { blessingsSchema, type BlessingsFormData } from "@/lib/validations";
import { HeartConfetti } from "@/components/animations/HeartConfetti";
import { FadeIn } from "@/components/animations/FadeIn";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SectionAtmosphere } from "@/components/ui/SectionAtmosphere";
import { SectionShell } from "@/components/ui/SectionShell";
import { cn } from "@/lib/utils";

function FieldLabel({ htmlFor, children }: { htmlFor: string; children: React.ReactNode }) {
  return (
    <label
      htmlFor={htmlFor}
      className="font-body mb-2 block text-xs uppercase tracking-[0.2em] text-ivory/50"
    >
      {children}
    </label>
  );
}

function FieldError({ message }: { message?: string }) {
  if (!message) return null;
  return (
    <p className="font-body mt-1.5 text-xs text-gold-light/90" role="alert">
      {message}
    </p>
  );
}

export function Blessings() {
  const { blessings } = WEDDING;
  const [submitState, setSubmitState] = useState<"idle" | "loading" | "success">("idle");
  const [shake, setShake] = useState(false);
  const [showHearts, setShowHearts] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<BlessingsFormData>({
    resolver: zodResolver(blessingsSchema),
    defaultValues: { name: "", message: "" },
  });

  const triggerShake = () => {
    setShake(true);
    window.setTimeout(() => setShake(false), 450);
  };

  const onSubmit = async (data: BlessingsFormData) => {
    setSubmitState("loading");
    try {
      const response = await fetch("/api/blessings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        triggerShake();
        setSubmitState("idle");
        return;
      }

      setSubmitState("success");
      setShowHearts(true);
    } catch {
      triggerShake();
      setSubmitState("idle");
    }
  };

  return (
    <SectionShell
      id="blessings"
      theme="cinematic"
      atmosphere={<SectionAtmosphere embers={3} />}
      contentClassName="max-w-[600px]"
      aria-labelledby="blessings-heading"
    >
      <FadeIn className="relative w-full">
        <div className="mb-10 flex justify-center">
          <SectionHeading
            title="Share Your Blessings"
            headingId="blessings-heading"
            eyebrow="A Note for the Couple"
            theme="cinematic"
          />
        </div>

        <div className="relative">
          <div className="invitation-card p-6 md:p-10">
            <AnimatePresence mode="wait">
              {submitState === "success" ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  className="flex flex-col items-center py-8 text-center"
                >
                  <motion.div
                    initial={{ scale: 0, rotate: -20 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ type: "spring", stiffness: 280, damping: 16 }}
                    className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-[#8a6a3d] via-[#b8935a] to-[#d4b483]"
                  >
                    <Check className="h-8 w-8 text-twilight" strokeWidth={2.5} />
                  </motion.div>
                  <p className="font-display text-xl text-gold-gradient sm:text-2xl">
                    {blessings.successMessage}
                  </p>
                  <p className="font-body mt-3 text-sm text-ivory/55">
                    Your words mean the world to us
                  </p>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  onSubmit={handleSubmit(onSubmit, triggerShake)}
                  className={cn(shake && "animate-shake")}
                  noValidate
                >
                  <div className="mb-8 flex items-start gap-3 rounded-xl border border-primary/20 bg-primary/5 p-4">
                    <Sparkles className="mt-0.5 h-4 w-4 shrink-0 text-primary" strokeWidth={1.5} />
                    <p className="font-body text-sm italic leading-relaxed text-ivory/55">
                      {blessings.intro}
                    </p>
                  </div>

                  <div className="space-y-6">
                    <div>
                      <FieldLabel htmlFor="blessings-name">Your Name</FieldLabel>
                      <input
                        id="blessings-name"
                        {...register("name")}
                        className={cn(
                          "font-body w-full rounded-xl border px-4 py-3 text-sm text-ivory outline-none transition-colors",
                          "border-primary/25 bg-twilight/70 placeholder:text-ivory/35",
                          "focus:border-primary/50 focus:ring-2 focus:ring-primary/15",
                          errors.name && "border-[#d4b483]/60"
                        )}
                        placeholder="How should we remember you?"
                        autoComplete="name"
                      />
                      <FieldError message={errors.name?.message} />
                    </div>

                    <div>
                      <FieldLabel htmlFor="blessings-message">Your Blessing</FieldLabel>
                      <textarea
                        id="blessings-message"
                        {...register("message")}
                        rows={4}
                        className={cn(
                          "font-body w-full resize-none rounded-xl border px-4 py-3 text-sm text-ivory outline-none transition-colors",
                          "border-primary/25 bg-twilight/70 placeholder:text-ivory/35",
                          "focus:border-primary/50 focus:ring-2 focus:ring-primary/15",
                          errors.message && "border-[#d4b483]/60"
                        )}
                        placeholder="A wish, a memory, or a few words of love..."
                      />
                      <FieldError message={errors.message?.message} />
                    </div>
                  </div>

                  <div className="mt-10 flex justify-center">
                    <motion.button
                      type="submit"
                      disabled={submitState === "loading"}
                      whileHover={{ scale: submitState === "loading" ? 1 : 1.03 }}
                      whileTap={{ scale: submitState === "loading" ? 1 : 0.97 }}
                      className="btn-gold-cinematic relative min-w-[220px] disabled:cursor-not-allowed disabled:opacity-70"
                    >
                      {submitState === "loading" ? (
                        <>
                          <Loader2 className="h-4 w-4 animate-spin" />
                          <span>Sending</span>
                        </>
                      ) : (
                        <>
                          <Heart className="h-4 w-4" strokeWidth={1.5} />
                          <span>Send Blessings</span>
                        </>
                      )}
                    </motion.button>
                  </div>
                </motion.form>
              )}
            </AnimatePresence>
          </div>

          <HeartConfetti active={showHearts} onComplete={() => setShowHearts(false)} />
        </div>
      </FadeIn>
    </SectionShell>
  );
}
