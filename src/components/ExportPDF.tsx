"use client";

import { motion } from "framer-motion";
import { Download } from "lucide-react";
import { FitnessPlan, UserDetails } from "@/types";
import jsPDF from "jspdf";

interface ExportPDFProps {
  plan: FitnessPlan;
  userDetails: UserDetails;
}

export default function ExportPDF({ plan, userDetails }: ExportPDFProps) {
  const generatePDF = () => {
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();
    let yPos = 20;

    // Title
    doc.setFontSize(22);
    doc.setFont("helvetica", "bold");
    doc.text("AI Fitness Coach - Your Personalized Plan", pageWidth / 2, yPos, {
      align: "center",
    });
    yPos += 15;

    // User Details
    doc.setFontSize(12);
    doc.setFont("helvetica", "normal");
    doc.text(`Name: ${userDetails.name}`, 20, yPos);
    yPos += 7;
    doc.text(
      `Age: ${userDetails.age} | Gender: ${userDetails.gender} | Height: ${userDetails.height}cm | Weight: ${userDetails.weight}kg`,
      20,
      yPos
    );
    yPos += 7;
    doc.text(
      `Goal: ${userDetails.fitnessGoal} | Level: ${userDetails.fitnessLevel} | Location: ${userDetails.workoutLocation}`,
      20,
      yPos
    );
    yPos += 15;

    // Workout Plan
    doc.setFontSize(16);
    doc.setFont("helvetica", "bold");
    doc.text("Workout Plan", 20, yPos);
    yPos += 10;

    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");

    plan.workoutPlan.forEach((day) => {
      if (yPos > 250) {
        doc.addPage();
        yPos = 20;
      }

      doc.setFont("helvetica", "bold");
      doc.text(day.day, 20, yPos);
      yPos += 6;
      doc.setFont("helvetica", "normal");

      day.exercises.forEach((exercise) => {
        if (yPos > 250) {
          doc.addPage();
          yPos = 20;
        }
        const text = `• ${exercise.name}: ${exercise.sets} sets x ${exercise.reps} reps, rest ${exercise.restTime}`;
        const lines = doc.splitTextToSize(text, pageWidth - 40);
        doc.text(lines, 25, yPos);
        yPos += lines.length * 5;
      });
      yPos += 5;
    });

    // Diet Plan
    if (yPos > 200) {
      doc.addPage();
      yPos = 20;
    }

    doc.setFontSize(16);
    doc.setFont("helvetica", "bold");
    doc.text("Diet Plan", 20, yPos);
    yPos += 10;

    doc.setFontSize(10);
    Object.entries(plan.dietPlan).forEach(([mealType, meal]) => {
      if (yPos > 250) {
        doc.addPage();
        yPos = 20;
      }

      doc.setFont("helvetica", "bold");
      doc.text(`${mealType.toUpperCase()}: ${meal.name}`, 20, yPos);
      yPos += 6;
      doc.setFont("helvetica", "normal");

      meal.items.forEach((item: string) => {
        if (yPos > 250) {
          doc.addPage();
          yPos = 20;
        }
        doc.text(`• ${item}`, 25, yPos);
        yPos += 5;
      });
      if (meal.calories || meal.protein) {
        doc.text(
          `Nutrition: ${meal.calories || "N/A"} | Protein: ${
            meal.protein || "N/A"
          }`,
          25,
          yPos
        );
        yPos += 5;
      }
      yPos += 5;
    });

    // Tips
    if (yPos > 200) {
      doc.addPage();
      yPos = 20;
    }

    doc.setFontSize(16);
    doc.setFont("helvetica", "bold");
    doc.text("Tips & Recommendations", 20, yPos);
    yPos += 10;

    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    plan.tips.forEach((tip) => {
      if (yPos > 250) {
        doc.addPage();
        yPos = 20;
      }
      const lines = doc.splitTextToSize(`• ${tip}`, pageWidth - 40);
      doc.text(lines, 20, yPos);
      yPos += lines.length * 5 + 2;
    });

    // Motivation
    yPos += 5;
    if (yPos > 240) {
      doc.addPage();
      yPos = 20;
    }
    doc.setFont("helvetica", "italic");
    const motivationLines = doc.splitTextToSize(
      `"${plan.motivation}"`,
      pageWidth - 40
    );
    doc.text(motivationLines, pageWidth / 2, yPos, { align: "center" });

    // Save
    doc.save(`${userDetails.name}_Fitness_Plan.pdf`);
  };

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={generatePDF}
      className="flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
    >
      <Download className="w-5 h-5" />
      Export as PDF
    </motion.button>
  );
}
