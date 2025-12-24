"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Volume2, VolumeX } from "lucide-react";
import { FitnessPlan } from "@/types";

interface VoiceReaderProps {
  plan: FitnessPlan;
}

export default function VoiceReader({ plan }: VoiceReaderProps) {
  const [isReading, setIsReading] = useState(false);
  const [selectedSection, setSelectedSection] = useState<
    "workout" | "diet" | null
  >(null);

  const speakText = (text: string) => {
    if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel(); // Stop any ongoing speech

      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.9;
      utterance.pitch = 1;
      utterance.volume = 1;

      utterance.onstart = () => setIsReading(true);
      utterance.onend = () => setIsReading(false);
      utterance.onerror = () => setIsReading(false);

      window.speechSynthesis.speak(utterance);
    } else {
      alert("Text-to-speech is not supported in your browser");
    }
  };

  const stopSpeaking = () => {
    if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel();
      setIsReading(false);
    }
  };

  const generateWorkoutText = () => {
    let text = "Your workout plan for the week. ";
    plan.workoutPlan.forEach((day) => {
      text += `${day.day}. `;
      day.exercises.forEach((ex) => {
        text += `${ex.name}, ${ex.sets} sets of ${ex.reps} reps, rest for ${ex.restTime}. `;
      });
    });
    return text;
  };

  const generateDietText = () => {
    let text = "Your diet plan. ";
    Object.entries(plan.dietPlan).forEach(([meal, details]) => {
      text += `${meal}. ${details.name}. It includes `;
      text += details.items.join(", ") + ". ";
      if (details.calories) text += `Approximately ${details.calories}. `;
    });
    return text;
  };

  const handleRead = (section: "workout" | "diet") => {
    if (isReading) {
      stopSpeaking();
      return;
    }

    setSelectedSection(section);
    const text =
      section === "workout" ? generateWorkoutText() : generateDietText();
    speakText(text);
  };

  return (
    <div className="flex gap-3">
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => handleRead("workout")}
        className={`flex items-center gap-2 px-6 py-3 rounded-lg transition-colors ${
          isReading && selectedSection === "workout"
            ? "bg-red-600 text-white hover:bg-red-700"
            : "bg-green-600 text-white hover:bg-green-700"
        }`}
      >
        {isReading && selectedSection === "workout" ? (
          <>
            <VolumeX className="w-5 h-5" />
            Stop Workout
          </>
        ) : (
          <>
            <Volume2 className="w-5 h-5" />
            Read Workout
          </>
        )}
      </motion.button>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => handleRead("diet")}
        className={`flex items-center gap-2 px-6 py-3 rounded-lg transition-colors ${
          isReading && selectedSection === "diet"
            ? "bg-red-600 text-white hover:bg-red-700"
            : "bg-purple-600 text-white hover:bg-purple-700"
        }`}
      >
        {isReading && selectedSection === "diet" ? (
          <>
            <VolumeX className="w-5 h-5" />
            Stop Diet
          </>
        ) : (
          <>
            <Volume2 className="w-5 h-5" />
            Read Diet
          </>
        )}
      </motion.button>
    </div>
  );
}
