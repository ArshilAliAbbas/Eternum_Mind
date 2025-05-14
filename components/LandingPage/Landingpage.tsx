import React from "react";
import {
  ArrowRight,
  Sparkles,
  Brain,
  Lock,
  Database,
  Code,
  MessageSquareQuote,
  Globe,
  Heart,
  Leaf,
  BarChart,
} from "lucide-react";

import { Button } from "../ui/Button"; // Update path if needed

const LandingPage = () => {
  return (
    <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-[#050d1d] px-4 text-white">
      {/* Background with Scattered Blue Dots */}
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
        {/* Random Scattered Blue Dots */}
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
                className="absolute rounded-full bg-blue-500"
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
            icon: Heart,
            title: "Track Your Mood",
            desc: "Log and visualize your emotional patterns over time.",
            color:
              "bg-red-500/80 text-white border-2 border-amber-400 shadow-lg shadow-amber-300/30",
          },
          {
            icon: Leaf,
            title: "Journal Thoughts",
            desc: "Express yourself freely in a private, secure space.",
            color:
              "bg-green-500/80 text-white border-2 border-amber-400 shadow-lg shadow-amber-300/30",
          },
          {
            icon: Brain,
            title: "SoulPrint Analysis",
            desc: "Gain deeper insights into your mental patterns.",
            color:
              "bg-purple-500/80 text-white border-2 border-amber-400 shadow-lg shadow-amber-300/30",
          },
          {
            icon: BarChart,
            title: "Progress Analytics",
            desc: "Visualize your growth and improvements over time.",
            color:
              "bg-blue-500/80 text-white border-2 border-amber-400 shadow-lg shadow-amber-300/30",
          },
        ].map(({ icon: Icon, title, desc, color }, index) => (
          <div
            key={index}
            className="group h-[350px] w-full rounded-xl border border-blue-500/20 bg-[#151f38] p-8 text-center shadow-lg backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:shadow-blue-500/30 md:h-[350px]"
          >
            {/* Icon with Circular Background */}
            <div
              className={`absolute left-4 top-4 flex size-16 items-center justify-center rounded-full ${color} transition-all duration-300`}
            >
              <Icon className="size-8 text-white" />
            </div>
            {/* Title */}
            <h3 className="mt-20 text-2xl font-semibold">{title}</h3>
            {/* Description */}
            <p className="mt-4 text-base text-gray-400">{desc}</p>
          </div>
        ))}
      </div>
      {/* Technology Section - Darker Translucent Blue Background */}
      <div className="relative z-10 mt-32 w-full bg-[#142038]/85 py-20 backdrop-blur-sm">
        {/* Background overlay for translucency */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0c1526]/50 to-[#142038]/70 backdrop-blur-sm"></div>
        <div className="relative z-10 mx-auto max-w-6xl px-4">
          {/* Section Title */}
          <h2 className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-center text-5xl font-bold text-transparent">
            Next-Gen Technology
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-center text-lg font-medium text-gray-300">
            Powered by cutting-edge AI and blockchain technology for secure
            mental wellness journaling.
          </p>
          {/* Technology Features */}
          <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-3">
            {/* Neural Analysis */}
            <div className="flex h-[280px] flex-col rounded-xl border-2 border-purple-500/30 bg-[#192340]/90 p-8 backdrop-blur-md transition-all duration-300 hover:scale-105 hover:shadow-purple-500/30 md:h-[300px]">
              <div className="mb-6 flex size-16 items-center justify-center rounded-full bg-purple-600">
                <Brain className="size-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white">Neural Analysis</h3>
              <p className="mt-3 text-lg text-gray-300">
                Our AI analyzes your journal entries to identify emotional
                patterns and provide actionable insights.
              </p>
            </div>
            {/* Web3 Security */}
            <div className="flex h-[280px] flex-col rounded-xl border-2 border-blue-500/30 bg-[#192340]/90 p-8 backdrop-blur-md transition-all duration-300 hover:scale-105 hover:shadow-blue-500/30 md:h-[300px]">
              <div className="mb-6 flex size-16 items-center justify-center rounded-full bg-blue-600">
                <Lock className="size-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white">Web3 Security</h3>
              <p className="mt-3 text-lg text-gray-300">
                Your data is encrypted and stored on IPFS with blockchain
                verification for maximum privacy.
              </p>
            </div>
            {/* Memory Crystals */}
            <div className="flex h-[280px] flex-col rounded-xl border-2 border-purple-500/30 bg-[#192340]/90 p-8 backdrop-blur-md transition-all duration-300 hover:scale-105 hover:shadow-purple-500/30 md:h-[300px]">
              <div className="mb-6 flex size-16 items-center justify-center rounded-full bg-purple-600">
                <Database className="size-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white">Memory Crystals</h3>
              <p className="mt-3 text-lg text-gray-300">
                Store your most important memories as NFTs in our SoulBound
                Memory Crystal system.
              </p>
            </div>
          </div>
          {/* Explore Button */}
          <div className="mt-16 flex justify-center">
            <Button
              variant="outline"
              className="group flex items-center gap-3 rounded-md border-2 border-blue-500 px-8 py-4 text-xl font-bold text-white transition-all duration-300 hover:bg-blue-500/20"
            >
              <Code className="size-6" />
              Explore the Technology
            </Button>
          </div>
        </div>
      </div>
      {/* Testimonials Section - Even Darker and More Translucent */}
      <div className="relative z-10 mt-20 w-full bg-[#0c1526]/75 py-24 backdrop-blur-md">
        {/* Background overlay for enhanced translucency */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#081020]/60 to-[#0c1526]/80 backdrop-blur-md"></div>
        <div className="relative z-10 mx-auto max-w-6xl px-4">
          {/* Section Title */}
          <h2 className="text-center text-5xl font-bold text-white">
            What Our Users Say
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-center text-lg text-gray-300">
            Discover how NeuroSphere has helped people on their mental wellness
            journey.
          </p>
          {/* Testimonials */}
          <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-3">
            {/* Testimonial 1 */}
            <div className="rounded-xl border border-blue-500/20 bg-[#101830]/70 p-8 backdrop-blur-lg transition-all duration-300 hover:scale-105 hover:shadow-blue-500/20">
              <div className="flex items-center">
                <div className="flex size-12 items-center justify-center rounded-full bg-indigo-700 text-xl font-bold text-white">
                  AJ
                </div>
                <div className="ml-4">
                  <h3 className="text-xl font-semibold text-white">
                    Alex Johnson
                  </h3>
                  <p className="text-sm text-gray-400">
                    Mindfulness Practitioner
                  </p>
                </div>
              </div>
              <p className="mt-6 italic text-gray-300">
                NeuroSphere has transformed my self-awareness. The mood tracking
                feature helps me recognize patterns I never noticed before.
              </p>
            </div>
            {/* Testimonial 2 */}
            <div className="rounded-xl border border-purple-500/20 bg-[#101830]/70 p-8 backdrop-blur-lg transition-all duration-300 hover:scale-105 hover:shadow-purple-500/20">
              <div className="flex items-center">
                <div className="flex size-12 items-center justify-center rounded-full bg-purple-700 text-xl font-bold text-white">
                  SC
                </div>
                <div className="ml-4">
                  <h3 className="text-xl font-semibold text-white">
                    Sarah Chen
                  </h3>
                  <p className="text-sm text-gray-400">
                    Mental Health Advocate
                  </p>
                </div>
              </div>
              <p className="mt-6 italic text-gray-300">
                The journaling prompts are thoughtful and insightful. I've had
                breakthroughs I wouldn't have experienced otherwise.
              </p>
            </div>
            {/* Testimonial 3 */}
            <div className="rounded-xl border border-blue-500/20 bg-[#101830]/70 p-8 backdrop-blur-lg transition-all duration-300 hover:scale-105 hover:shadow-blue-500/20">
              <div className="flex items-center">
                <div className="flex size-12 items-center justify-center rounded-full bg-indigo-700 text-xl font-bold text-white">
                  MT
                </div>
                <div className="ml-4">
                  <h3 className="text-xl font-semibold text-white">
                    Marcus Taylor
                  </h3>
                  <p className="text-sm text-gray-400">Psychology Student</p>
                </div>
              </div>
              <p className="mt-6 italic text-gray-300">
                As someone studying psychology, I appreciate the science-backed
                approach. The SoulPrint analysis is particularly impressive.
              </p>
            </div>
          </div>
          {/* View More Button */}
          <div className="mt-12 flex justify-center">
            <Button
              variant="outline"
              className="group flex items-center gap-3 rounded-md border-2 border-purple-500/50 px-8 py-3 text-lg font-bold text-white transition-all duration-300 hover:bg-purple-500/10"
            >
              <MessageSquareQuote className="size-5" />
              Read More Stories
            </Button>
          </div>
        </div>
      </div>
      {/* Ready to Start Your Journey Section */}
      <div className="relative z-10 w-full bg-[#050d1d] py-24">
        {" "}
        {/* Increased vertical padding */}
        {/* Background with Scattered Blue Dots */}
        <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
          {/* Random Scattered Blue Dots */}
          <div className="absolute inset-0">
            {Array.from({ length: 50 }).map((_, index) => {
              {
                /* Increased number of dots */
              }
              const top = `${Math.random() * 100}%`;
              const left = `${Math.random() * 100}%`;
              const size = Math.random() * 3 + 1; // Random size between 1-4px
              const opacity = Math.random() * 0.3 + 0.1; // Random opacity between 0.1-0.4

              return (
                <div
                  key={index}
                  className="absolute rounded-full bg-blue-500"
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
        <div className="relative z-10 mx-auto max-w-5xl rounded-2xl bg-gradient-to-br from-[#162a4a]/90 via-[#1a2d4d]/85 to-[#0f1b36]/90 p-16 shadow-2xl backdrop-blur-md transition-all duration-300 hover:scale-105">
          {" "}
          {/* Using scale effect on hover */}
          {/* Cool background elements inside the box */}
          <div className="absolute inset-0 overflow-hidden rounded-2xl">
            {/* Abstract shapes */}
            <div className="absolute -right-20 -top-20 size-64 rounded-full bg-blue-500/10 blur-3xl"></div>
            <div className="absolute -bottom-20 -left-20 size-64 rounded-full bg-purple-500/10 blur-3xl"></div>
            {/* Inner dots */}
            {Array.from({ length: 20 }).map((_, index) => {
              const top = `${Math.random() * 100}%`;
              const left = `${Math.random() * 100}%`;
              const size = Math.random() * 2 + 1;
              const opacity = Math.random() * 0.15 + 0.05;

              return (
                <div
                  key={`inner-${index}`}
                  className="absolute rounded-full bg-blue-400"
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
          <h2 className="relative z-10 text-center text-5xl font-bold text-white">
            Ready to Start Your Journey?
          </h2>
          <p className="relative z-10 mx-auto mt-6 max-w-2xl text-center text-xl text-gray-300">
            Join thousands of others who are discovering new insights about
            themselves and improving their mental wellbeing.
          </p>
          <div className="relative z-10 mt-10 flex flex-wrap justify-center gap-8">
            {" "}
            {/* Increased spacing */}
            <Button className="group relative inline-flex items-center overflow-hidden rounded-md border-2 border-purple-600 bg-purple-500 px-10 py-4 text-xl font-medium text-white transition-all duration-300 hover:bg-purple-600 hover:shadow-lg hover:shadow-purple-500/30">
              {" "}
              {/* Enhanced button */}
              <Sparkles className="mr-3 size-6" />
              <span className="relative z-10">
                Begin Your NeuroSphere Experience
              </span>
            </Button>
            <Button
              variant="outline"
              className="group rounded-xl border-2 border-blue-500 px-10 py-4 text-xl text-white transition-all duration-300 hover:bg-blue-500/20 hover:shadow-lg hover:shadow-blue-500/20"
            >
              <Globe className="mr-3 size-6" />
              Try Demo Mode
            </Button>
          </div>
        </div>
      </div>
      {/* Footer */}
      <footer className="w-full bg-[#030812] py-10 text-center text-white">
        <div className="mx-auto max-w-6xl px-4">
          <div className="mb-6 flex items-center justify-center">
            <div className="flex items-center">
              <div className="mr-2 size-6 rounded-full bg-blue-600"></div>
              <span className="text-xl font-bold">NeuroSphere</span>
            </div>
          </div>
          <div className="mb-6 flex flex-wrap justify-center gap-8">
            <a href="#" className="text-gray-400 hover:text-white">
              About
            </a>
            <a href="#" className="text-gray-400 hover:text-white">
              Features
            </a>
            <a href="#" className="text-gray-400 hover:text-white">
              Privacy
            </a>
            <a href="#" className="text-gray-400 hover:text-white">
              Terms
            </a>
            <a href="#" className="text-gray-400 hover:text-white">
              Contact
            </a>
          </div>
          <div className="text-sm text-gray-500">
            &copy; 2025 NeuroSphere. All rights reserved.
          </div>
        </div>
      </footer>
    </section>
  );
};

export default LandingPage;
