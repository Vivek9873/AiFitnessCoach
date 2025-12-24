"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { FitnessPlan, UserDetails } from "@/types";
import VoiceReader from "./VoiceReader";
import ImageModal from "./ImageModal";
import ExportPDF from "./ExportPDF";
import {
  Dumbbell,
  Utensils,
  Lightbulb,
  Heart,
  RotateCw,
  Trash2,
} from "lucide-react";
import { calculateBMI } from "@/lib/utils";

interface PlanDisplayProps {
  plan: FitnessPlan;
  userDetails: UserDetails;
  onRegenerate: () => void;
  onReset: () => void;
}

export default function PlanDisplay({
  plan,
  userDetails,
  onRegenerate,
  onReset,
}: PlanDisplayProps) {
  const [activeTab, setActiveTab] = useState<"workout" | "diet">("workout");
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const bmi = calculateBMI(userDetails.weight, userDetails.height);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8 max-w-6xl mx-auto"
    >
      {/* Header with User Info */}
      <div className="mb-8 pb-6 border-b border-gray-200 dark:border-gray-700">
        <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-4">
          Your Personalized Fitness Plan
        </h2>
        <div className="grid md:grid-cols-4 gap-4 text-sm">
          <div className="bg-indigo-50 dark:bg-indigo-900/30 p-4 rounded-lg">
            <p className="text-gray-600 dark:text-gray-400">Name</p>
            <p className="font-semibold text-gray-800 dark:text-white">
              {userDetails.name}
            </p>
          </div>
          <div className="bg-green-50 dark:bg-green-900/30 p-4 rounded-lg">
            <p className="text-gray-600 dark:text-gray-400">BMI</p>
            <p className="font-semibold text-gray-800 dark:text-white">{bmi}</p>
          </div>
          <div className="bg-purple-50 dark:bg-purple-900/30 p-4 rounded-lg">
            <p className="text-gray-600 dark:text-gray-400">Goal</p>
            <p className="font-semibold text-gray-800 dark:text-white capitalize">
              {userDetails.fitnessGoal.replace("-", " ")}
            </p>
          </div>
          <div className="bg-orange-50 dark:bg-orange-900/30 p-4 rounded-lg">
            <p className="text-gray-600 dark:text-gray-400">Level</p>
            <p className="font-semibold text-gray-800 dark:text-white capitalize">
              {userDetails.fitnessLevel}
            </p>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap gap-4 mb-6">
        <VoiceReader plan={plan} />
        <ExportPDF plan={plan} userDetails={userDetails} />
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onRegenerate}
          className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <RotateCw className="w-5 h-5" />
          Regenerate Plan
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onReset}
          className="flex items-center gap-2 px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
        >
          <Trash2 className="w-5 h-5" />
          Reset
        </motion.button>
      </div>

      {/* Tabs */}
      <div className="flex gap-4 mb-6 border-b border-gray-200 dark:border-gray-700">
        <button
          onClick={() => setActiveTab("workout")}
          className={`flex items-center gap-2 pb-3 px-4 font-semibold transition-all ${
            activeTab === "workout"
              ? "text-indigo-600 dark:text-indigo-400 border-b-2 border-indigo-600"
              : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
          }`}
        >
          <Dumbbell className="w-5 h-5" />
          Workout Plan
        </button>
        <button
          onClick={() => setActiveTab("diet")}
          className={`flex items-center gap-2 pb-3 px-4 font-semibold transition-all ${
            activeTab === "diet"
              ? "text-indigo-600 dark:text-indigo-400 border-b-2 border-indigo-600"
              : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
          }`}
        >
          <Utensils className="w-5 h-5" />
          Diet Plan
        </button>
      </div>

      {/* Content */}
      <div className="min-h-100">
        {activeTab === "workout" ? (
          <div className="space-y-6">
            {plan.workoutPlan.map((day, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-linear-to-r from-indigo-50 to-purple-50 dark:from-gray-700 dark:to-gray-600 p-6 rounded-xl"
              >
                <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4">
                  {day.day}
                </h3>
                <div className="space-y-3">
                  {day.exercises.map((exercise, exIndex) => (
                    <div
                      key={exIndex}
                      className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow hover:shadow-md transition-shadow cursor-pointer"
                      onClick={() => setSelectedImage(exercise.name)}
                    >
                      <h4 className="font-semibold text-gray-800 dark:text-white mb-2">
                        {exercise.name}
                      </h4>
                      <div className="grid grid-cols-3 gap-2 text-sm text-gray-600 dark:text-gray-400">
                        <div>
                          <span className="font-medium">Sets:</span>{" "}
                          {exercise.sets}
                        </div>
                        <div>
                          <span className="font-medium">Reps:</span>{" "}
                          {exercise.reps}
                        </div>
                        <div>
                          <span className="font-medium">Rest:</span>{" "}
                          {exercise.restTime}
                        </div>
                      </div>
                      {exercise.notes && (
                        <p className="mt-2 text-sm text-gray-500 dark:text-gray-400 italic">
                          {exercise.notes}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="space-y-6">
            {Object.entries(plan.dietPlan).map(([mealType, meal], index) => (
              <motion.div
                key={mealType}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-linear-to-r from-green-50 to-emerald-50 dark:from-gray-700 dark:to-gray-600 p-6 rounded-xl cursor-pointer hover:shadow-lg transition-shadow"
                onClick={() => setSelectedImage(meal.name)}
              >
                <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-3 capitalize">
                  {mealType}
                </h3>
                <p className="font-semibold text-gray-700 dark:text-gray-200 mb-2">
                  {meal.name}
                </p>
                <ul className="list-disc list-inside space-y-1 text-gray-600 dark:text-gray-400 mb-3">
                  {meal.items.map((item: string, i: number) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
                <div className="flex gap-4 text-sm text-gray-500 dark:text-gray-400">
                  {meal.calories && <span>📊 {meal.calories}</span>}
                  {meal.protein && <span>💪 {meal.protein}</span>}
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* Tips & Motivation */}
      <div className="mt-8 space-y-6">
        <div className="bg-yellow-50 dark:bg-yellow-900/20 p-6 rounded-xl">
          <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4 flex items-center gap-2">
            <Lightbulb className="w-6 h-6 text-yellow-600" />
            Tips & Recommendations
          </h3>
          <ul className="space-y-2">
            {plan.tips.map((tip, index) => (
              <li
                key={index}
                className="flex items-start gap-2 text-gray-700 dark:text-gray-300"
              >
                <span className="text-yellow-600 mt-1">✓</span>
                <span>{tip}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-linear-to-r from-pink-100 to-red-100 dark:from-pink-900/30 dark:to-red-900/30 p-6 rounded-xl text-center">
          <Heart className="w-8 h-8 text-red-600 mx-auto mb-3" />
          <p className="text-lg font-semibold text-gray-800 dark:text-white italic">
            &quot;{plan.motivation}&quot;
          </p>
        </div>
      </div>

      {/* Image Modal */}
      {selectedImage && (
        <ImageModal
          prompt={selectedImage}
          onClose={() => setSelectedImage(null)}
        />
      )}
    </motion.div>
  );
}
