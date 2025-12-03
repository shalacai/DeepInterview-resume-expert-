import React, { useState } from 'react';
import LandingPage from './components/LandingPage';
import ChatInterface from './components/ChatInterface';

function App() {
  const [currentView, setCurrentView] = useState('landing');
  const [targetRole, setTargetRole] = useState('');
  
  // ✨ 修改这里：将默认值 'zh-CN' 改为 'en-US'
  const [language, setLanguage] = useState('en-US');

  const handleStartInterview = (role, selectedLang) => {
    setTargetRole(role);
    setLanguage(selectedLang); // 保存用户在首页选择的语言
    setCurrentView('chat');
  };

  const handleBack = () => {
    setCurrentView('landing');
    setTargetRole('');
  };

  return (
    <div className="min-h-screen bg-cream">
      {currentView === 'landing' ? (
        <LandingPage onStart={handleStartInterview} initialLang={language} />
      ) : (
        <ChatInterface 
          targetRole={targetRole} 
          language={language} 
          onBack={handleBack} 
        />
      )}
    </div>
  );
}

export default App;