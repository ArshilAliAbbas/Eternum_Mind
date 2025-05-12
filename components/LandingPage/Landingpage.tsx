import React from "react";
import { ArrowRight, Sparkles } from "lucide-react";

import { Button } from "../ui/Button"; // Update path if needed

const LandingPage = () => {
  return (
    <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-[#050d1d] px-4 text-white">
      {/* Background with Scattered Golden Dots */}
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
        {/* Random Scattered Golden Dots */}
        <div className="absolute inset-0">
          {/* Using individual dots instead of a pattern for more randomness */}
          {Array.from({ length: 50 }).map((_, index) => {
            const top = `${Math.random() * 100}%`;
            const left = `${Math.random() * 100}%`;
            const size = Math.random() * 2 + 1; // Random size between 1-3px
            const opacity = Math.random() * 0.2 + 0.1; // Random opacity between 0.1-0.3

            return (
              <div
                key={index}
                className="absolute rounded-full bg-[#FFD700]"
                style={{
                  top,
                  left,
                  width: `${size}px`,
                  height: `${size}px`,
                  opacity,
                }}
              />
            );
          })}
        </div>
      </div>
      {/* Title */}
      <h1
        className="glow-text bg-gradient-to-r from-blue-600 via-blue-600 to-blue-500 bg-clip-text text-6xl font-extrabold tracking-tight text-transparent"
        style={{
          marginTop: "12rem",
          textShadow: "0 0 5px rgba(59, 130, 246, 0.5)",
          fontWeight: 900,
        }}
      >
        Your Journey to Mental Wellbeing
      </h1>
      {/* Subtitle */}
      <p className="z-10 mt-6 max-w-3xl text-center text-lg text-gray-300 md:text-xl">
        Track your moods, journal your thoughts, and discover deeper insights
        about yourself with NeuroSphere's comprehensive mental wellness tools.
      </p>
      {/* CTA Buttons */}
      <div className="z-10 mt-8 flex flex-wrap justify-center gap-6">
        <Button className="group relative inline-flex items-center overflow-hidden rounded-md border-2 border-blue-600 bg-blue-500 px-8 py-5 text-xl font-medium text-white">
          <span className="relative z-10">Start Your Journey</span>
          <ArrowRight className="ml-3 size-6 transition-transform duration-300 group-hover:translate-x-5" />
        </Button>
        <Button
          variant="outline"
          className="group rounded-xl border border-purple-500 px-10 py-5 text-xl text-white transition hover:bg-purple-500/10"
        >
          Try Demo Mode{" "}
          <Sparkles className="ml-3 size-6 transition-transform duration-500 group-hover:rotate-[360deg]" />
        </Button>
      </div>
      {/* Down Arrow */}
      <div className="z-10 mt-12 animate-bounce text-3xl">↓</div>
      {/* Features Grid */}
      <div className="z-10 mt-20 grid w-full max-w-6xl grid-cols-1 gap-8 px-4 md:grid-cols-4">
        {[
          {
            emoji: "❤️",
            title: "Track Your Mood",
            desc: "Log and visualize your emotional patterns over time.",
            color: "bg-red-500 text-red-400",
          },
          {
            emoji: "🍃",
            title: "Journal Thoughts",
            desc: "Express yourself freely in a private, secure space.",
            color: "bg-green-500 text-green-400",
          },
          {
            emoji: "🧠",
            title: "SoulPrint Analysis",
            desc: "Gain deeper insights into your mental patterns.",
            color: "bg-purple-500 text-purple-400",
          },
          {
            emoji: "📊",
            title: "Progress Analytics",
            desc: "Visualize your growth and improvements over time.",
            color: "bg-blue-500 text-blue-400",
          },
        ].map(({ emoji, title, desc, color }, index) => (
          <div
            key={index}
            className="group h-[300px] w-full rounded-lg border border-blue-500/20 bg-transparent p-8 text-center shadow-lg backdrop-blur-sm transition-all hover:scale-105 hover:shadow-blue-500/30 md:h-[300px]"
          >
            {/* Emoji with Circular Background */}
            <div
              className={`absolute left-4 top-4 flex size-16 items-center justify-center rounded-full ${color} transition-all duration-300 group-hover:translate-y-3`}
            >
              <span className="text-3xl">{emoji}</span>
            </div>
            {/* Title */}
            <h3 className="mt-20 text-2xl font-semibold">{title}</h3>
            {/* Description */}
            <p className="mt-4 text-base text-gray-400">{desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default LandingPage;
