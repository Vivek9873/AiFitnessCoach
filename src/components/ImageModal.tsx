"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Loader2 } from "lucide-react";
import Image from "next/image";

interface ImageModalProps {
  prompt: string;
  onClose: () => void;
}

export default function ImageModal({ prompt, onClose }: ImageModalProps) {
  const [imageUrl, setImageUrl] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchImage = async () => {
      try {
        setLoading(true);
        setError(false);

        // Using Unsplash API for free images based on search term
        const searchTerm = encodeURIComponent(prompt);
        const unsplashUrl = `https://source.unsplash.com/800x600/?${searchTerm},fitness,food`;

        setImageUrl(unsplashUrl);
        setLoading(false);
      } catch (err) {
        console.error("Error loading image:", err);
        setError(true);
        setLoading(false);
      }
    };

    fetchImage();
  }, [prompt]);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="bg-white dark:bg-gray-800 rounded-2xl p-6 max-w-2xl w-full relative"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
            {prompt}
          </h3>

          <div className="relative w-full h-96 bg-gray-100 dark:bg-gray-700 rounded-xl overflow-hidden">
            {loading ? (
              <div className="absolute inset-0 flex items-center justify-center">
                <Loader2 className="w-12 h-12 animate-spin text-indigo-600" />
                <p className="ml-3 text-gray-600 dark:text-gray-400">
                  Loading image...
                </p>
              </div>
            ) : error ? (
              <div className="absolute inset-0 flex items-center justify-center">
                <p className="text-gray-600 dark:text-gray-400">
                  Failed to load image
                </p>
              </div>
            ) : (
              <Image
                src={imageUrl}
                alt={prompt}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 800px"
              />
            )}
          </div>

          <p className="mt-4 text-sm text-gray-500 dark:text-gray-400 text-center">
            Click anywhere outside to close
          </p>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
