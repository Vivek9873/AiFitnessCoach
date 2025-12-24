# 🏋️ AI Fitness Coach

AI-powered fitness assistant that generates personalized workout and diet plans using Google Gemini AI.

## Deployment
https://ai-fitness-coach-bice.vercel.app/

## ✨ Features

- 🎯 Personalized 7-day workout plans
- 🥗 Custom diet plans with nutritional info
- 🔊 Voice narration (Text-to-Speech)
- 🖼️ Exercise/meal image visualization
- 📄 PDF export functionality
- 💾 Local storage for plan persistence
- 💪 Daily AI-generated motivation quotes
- 🌑 Dark theme UI

## 🛠️ Tech Stack

- **Framework:** Next.js
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **AI:** Google Gemini API
- **Animations:** Framer Motion
- **Icons:** Lucide React
- **PDF:** jsPDF

## 🚀 Installation

```bash
# Clone the repository
git clone <your-repo-url>
cd ai-fitness-coach

# Install dependencies
npm install

# Example .env file
"GEMINI_API_KEY=your_gemini_api_key_here"

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
src/
├── app/
│   ├── api/
│   │   ├── generate-plan/route.ts
│   │   └── motivation-quote/route.ts
│   ├── layout.tsx
│   ├── page.tsx
│   └── globals.css
├── components/
│   ├── UserForm.tsx
│   ├── PlanDisplay.tsx
│   ├── VoiceReader.tsx
│   ├── ImageModal.tsx
│   ├── ExportPDF.tsx
│   └── MotivationQuote.tsx
├── lib/
│   ├── gemini.ts
│   ├── storage.ts
│   └── utils.ts
└── types/
    └── index.ts
```

## 🎯 Usage

1. Fill in your personal details and fitness goals
2. Click "Generate My Fitness Plan"
3. View your personalized workout and diet plans
4. Use voice narration to listen to plans
5. Click on exercises/meals to see images
6. Export your plan as PDF
7. Plans are auto-saved in local storage

## 📝 License

MIT License - Feel free to use this project!

## 👨‍💻 Author

Built with ❤️ using Next.js and Google Gemini AI

---

⭐ Star this repo if you found it helpful!
