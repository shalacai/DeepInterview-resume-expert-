# 🌟 DeepInterview.ai | Resume Expert by Conversation

![React](https://img.shields.io/badge/React-18-blue?logo=react)
![Vite](https://img.shields.io/badge/Vite-5.0-purple?logo=vite)
![TailwindCSS](https://img.shields.io/badge/Tailwind-3.4-cyan?logo=tailwindcss)
![DeepSeek](https://img.shields.io/badge/AI-DeepSeek%20V3-blue)

> **"Don't Just List Duties. Lead with Results & Data."**
> 
> Your Personal AI Interviewer. Digging Quantifiable Results, Real-time.
<img width="2834" height="1450" alt="image" src="https://github.com/user-attachments/assets/1d571878-c046-458d-8bba-4b76b62d151b" />

> DeepInterview.ai is a minimalist, AI-powered React application designed to help job seekers transform vague experience descriptions into **Result-Oriented**, **Data-Driven** resume bullet points.
<img width="2706" height="1496" alt="image" src="https://github.com/user-attachments/assets/fc481dfa-60d4-46f6-9dd7-c5365c520341" />





---

## ✨ Key Features (核心功能)

### 🧠 AI-Driven Dialogue (AI 深度对话)
- **Powered by DeepSeek V3**: Utilizes advanced LLM capabilities to understand context and ask probing questions.
- **STAR Method Guidance**: automatically guides users through Situation, Task, Action, and Result.
- **6-Principle Optimization**: Enforces "Result First", "Quantitative", and "Credible" standards.

### 🎙️ Voice & Natural Interaction (语音交互)
- **Web Speech API**: Built-in voice recognition supports continuous dictation.
- **Real-time Feedback**: "Little Orange Star" mascot reacts to your input with animations.
- **Bilingual Support**: Seamless switching between **English (EN)** and **Chinese (CN)** modes.

### 📄 Live Preview & Export (实时预览与导出)
- **Markdown Rendering**: Watch your resume being built in real-time on the right panel.
- **Progress Tracking**: Visual progress bar indicating resume completeness.
- **One-Click Export**: Copy to clipboard or download as a `.md` file instantly.

### 🎨 Minimalist UI (极简设计)
- **Typewriter Aesthetic**: Clean, distraction-free interface using Monospace fonts.
- **Responsive Design**: Mobile-friendly layout with split-screen view on desktop.
- **Tailwind CSS**: Rapid, utility-first styling.

---

## 🛠️ Tech Stack (技术栈)

- **Frontend**: React (Hooks), Vite
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Markdown**: react-markdown
- **AI Integration**: DeepSeek V3 (via Volcengine API)
- **Speech**: Native Web Speech API

---

## 🚀 Getting Started (快速开始)

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn
- An API Key for DeepSeek (Volcengine)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/sarahcaiii/resume-expert.git
   cd resume-expert
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure API Key**
   Open `src/components/ChatInterface.jsx` and locate the configuration section:
   ```javascript
   // Replace with your actual API Key
   const API_KEY = "sk-xxxxxxxxxxxxxxxxxxxxxxxx"; 
   ```
   *(Note: For production, it is recommended to use Environment Variables `.env`)*

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open in Browser**
   Visit `http://localhost:5173` to start your interview.

---

## 💡 The Philosophy (设计哲学)

This tool is built around the **"Result First"** principle for top-tier tech resumes:

1.  **Result First**: Start with the outcome.
2.  **Quantitative**: Dig for numbers (CTR, CVR, ROI, Efficiency).
3.  **Credible**: Realistic details, no fluff.
4.  **Relevant**: Tailored strictly to the target role.
5.  **Concise**: One bullet, one point.
6.  **Skills-Backed**: Highlight capabilities (Strategy, Analysis) over tasks.

---

## 📂 Project Structure

```bash
src/
├── components/
│   ├── LandingPage.jsx       # Initial role selection & philosophy intro
│   ├── ChatInterface.jsx     # Core AI chat, voice logic, and resume preview
│   └── LittleOrangeStar.jsx  # Animated SVG Mascot component
├── App.jsx                   # Main Router & State Management
├── index.css                 # Global Styles & Tailwind Directives
└── main.jsx                  # Entry Point
```

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.

---

<div align="center">
  <p>Made with ❤️ by <a href="https://github.com/sarahcaiii">shalacai</a></p>
  <p><i>"Stop Listing Duties. Start Structuring Achievements."</i></p>
</div>
```
