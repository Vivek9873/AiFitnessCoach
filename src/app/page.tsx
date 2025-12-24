"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import UserForm from "@/components/UserForm";
import PlanDisplay from "@/components/PlanDisplay";
import MotivationQuote from "@/components/MotivationQuote";
import { FitnessPlan, UserDetails } from "@/types";
import { storage } from "@/lib/storage";
import { Dumbbell } from "lucide-react";

export default function Home() {
  const [plan, setPlan] = useState<FitnessPlan | null>(null);
  const [userDetails, setUserDetails] = useState<UserDetails | null>(null);
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(true);

  useEffect(() => {
    // Load saved plan on mount
    const savedPlan = storage.loadPlan();
    const savedUser = storage.loadUserDetails();
    if (savedPlan && savedUser) {
      setPlan(savedPlan);
      setUserDetails(savedUser);
      setShowForm(false);
    }
  }, []);

  const handleGeneratePlan = async (details: UserDetails) => {
    setLoading(true);
    try {
      const response = await fetch("/api/generate-plan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(details),
      });

      if (!response.ok) throw new Error("Failed to generate plan");

      const data = await response.json();
      setPlan(data);
      setUserDetails(details);
      storage.savePlan(data);
      storage.saveUserDetails(details);
      setShowForm(false);
    } catch (error) {
      console.error("Error generating plan:", error);
      alert("Failed to generate plan. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleRegenerate = () => {
    setShowForm(true);
    setPlan(null);
  };

  const handleReset = () => {
    storage.clearAll();
    setPlan(null);
    setUserDetails(null);
    setShowForm(true);
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-900 to-gray-800">
      <main className="container mx-auto px-4 py-8 max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <Dumbbell className="w-12 h-12 text-indigo-600 dark:text-indigo-400" />
            <h1 className="text-5xl font-bold text-gray-800 dark:text-white">
              AI Fitness Coach
            </h1>
          </div>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Your personalized AI-powered fitness companion
          </p>
        </motion.div>

        <MotivationQuote />

        {loading ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center justify-center py-20"
          >
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-indigo-600 mb-4"></div>
            <p className="text-xl text-gray-700 dark:text-gray-300">
              Generating your personalized fitness plan...
            </p>
          </motion.div>
        ) : showForm ? (
          <UserForm onSubmit={handleGeneratePlan} initialData={userDetails} />
        ) : plan ? (
          <PlanDisplay
            plan={plan}
            userDetails={userDetails!}
            onRegenerate={handleRegenerate}
            onReset={handleReset}
          />
        ) : null}
      </main>

      <footer className="text-center py-8 text-gray-600 dark:text-gray-400">
        <p>© 2025 AI Fitness Coach. Powered by Google Gemini AI</p>
      </footer>
    </div>
  );
}
