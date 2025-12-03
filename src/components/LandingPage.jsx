import React, { useState } from 'react';
import LittleOrangeStar from './LittleOrangeStar';
import { Sparkles, MessageCircleHeart, Feather } from 'lucide-react'; // 更换为更柔和、人文的图标

const LandingPage = ({ onStart, initialLang }) => {
  const [targetRole, setTargetRole] = useState('');
  const [selectedLang, setSelectedLang] = useState(initialLang || 'zh-CN');

  const handleStart = () => {
    if (targetRole.trim()) {
      onStart(targetRole, selectedLang);
    } else {
      alert(selectedLang === 'zh-CN' ? "请先告诉我想申请什么岗位" : "Please define your target role first.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center p-6 md:p-12 font-mono text-gray-800">
      
      {/* Header */}
      <header className="w-full max-w-6xl flex justify-between items-center py-4">
        <div className="flex items-center gap-2">
          <LittleOrangeStar size="sm" />
          <span className="text-xl font-bold tracking-tighter">DeepInterview.ai</span>
        </div>
        <button className="text-sm text-gray-400 hover:text-orange-500 transition-colors">Login</button>
      </header>

      {/* Hero Section */}
      <main className="flex flex-col items-center justify-center flex-grow text-center max-w-4xl mt-12 md:mt-20">
        
        {/* H1: 更加人文、邀请式的标题 */}
        <h1 className="text-4xl md:text-6xl font-black mb-6 leading-tight tracking-tight">
          {selectedLang === 'zh-CN' ? '讲出你的故事，' : "Tell Me Your Story."}<br />
          <span className="text-orange-500">
            {selectedLang === 'zh-CN' ? '我来挖掘它的价值。' : "I'll Find Your Impact."}
          </span>
        </h1>
        
        {/* Subtitle: 智慧且简约 */}
        <p className="text-lg md:text-xl text-gray-500 mb-10 max-w-2xl leading-relaxed font-light">
          {selectedLang === 'zh-CN' 
            ? "别让才华被流水账埋没。作为你的 AI 伙伴，我会倾听你的经历，帮你从琐碎日常中提炼出闪光的“结果”与“数据”，让每一行文字都掷地有声。"
            : "Don't let your talent get lost in a list of duties. I am your creative partner. I listen to your experiences and uncover the hidden 'Results' & 'Data'—turning your daily work into a compelling narrative."}
        </p>

        {/* Input Area: 更加柔和的容器设计 */}
        <div className="w-full max-w-md bg-white p-2 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-gray-100 flex flex-col items-center gap-4 mb-16 relative">
            
            {/* Language Switcher */}
            <div className="absolute top-3 right-3 flex bg-gray-50 rounded-lg p-1">
              <button onClick={() => setSelectedLang('zh-CN')} className={`px-3 py-1 text-[10px] font-bold rounded-md transition-all ${selectedLang === 'zh-CN' ? 'bg-white text-orange-500 shadow-sm' : 'text-gray-400 hover:text-gray-600'}`}>CN</button>
              <button onClick={() => setSelectedLang('en-US')} className={`px-3 py-1 text-[10px] font-bold rounded-md transition-all ${selectedLang === 'en-US' ? 'bg-white text-orange-500 shadow-sm' : 'text-gray-400 hover:text-gray-600'}`}>EN</button>
            </div>

            <div className="pt-8 pb-2">
                <LittleOrangeStar size="lg" />
            </div>
            
            <div className="w-full px-6">
                <label className="block text-[10px] font-bold text-gray-400 uppercase mb-2 text-left tracking-widest">
                  {selectedLang === 'zh-CN' ? '你想申请什么角色？' : 'What is your dream role?'}
                </label>
                <input 
                    type="text" 
                    placeholder={selectedLang === 'zh-CN' ? "例如：字节跳动 高级产品经理" : "e.g. Senior Product Manager"}
                    className="w-full bg-transparent border-b border-gray-200 p-2 focus:outline-none focus:border-orange-500 transition-colors text-lg text-center placeholder-gray-300"
                    value={targetRole}
                    onChange={(e) => setTargetRole(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleStart()}
                />
            </div>

            <button 
                onClick={handleStart} 
                className="w-full mt-2 bg-orange-500 hover:bg-orange-600 text-white font-bold py-4 rounded-xl transition-all active:scale-95 shadow-orange-200 shadow-lg flex items-center justify-center gap-2"
            >
                {selectedLang === 'zh-CN' ? '开启深度对话' : 'Start Conversation'} <span>→</span>
            </button>
        </div>
      </main>

      {/* Feature Cards: 简约智慧的表达 */}
      <section className="w-full max-w-5xl py-12 border-t border-gray-100">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          
          {/* Card 1: 结果导向 -> 价值发现 */}
          <FeatureCard 
            icon={<Sparkles className="text-orange-500 w-6 h-6"/>}
            title={selectedLang === 'zh-CN' ? "看见结果" : "Discover Value"}
            desc={selectedLang === 'zh-CN' 
              ? "不仅仅是列举做了什么，更是呈现解决了什么。我们透过现象看本质，用数据证明你的不可替代性。" 
              : "It's not about what you did, but what you solved. We look beyond the tasks to prove your irreplaceable impact with data."}
          />
          
          {/* Card 2: 岗位相关 -> 深度共鸣 */}
          <FeatureCard 
            icon={<MessageCircleHeart className="text-gray-400 w-6 h-6"/>}
            title={selectedLang === 'zh-CN' ? "建立共鸣" : "Resonate"}
            desc={selectedLang === 'zh-CN' 
              ? "摒弃无效噪音。每一个字都应是为了让未来的团队感受到：“这就是我们一直在找的人”" 
              : "Filter out the noise. Every word is crafted to make your future team feel: 'This is exactly who we've been looking for.'"}
          />
          
          {/* Card 3: 简洁 -> 极简有力 */}
          <FeatureCard 
            icon={<Feather className="text-orange-500 w-6 h-6"/>}
            title={selectedLang === 'zh-CN' ? "极简有力" : "Simple & Strong"}
            desc={selectedLang === 'zh-CN' 
              ? "复杂留给思考，表达回归简单。用最凝练的语言，勾勒最扎实的能力图谱。" 
              : "Leave complexity to thinking; keep expression simple. We build a solid skills profile with the most concise language."}
          />

        </div>
      </section>
    </div>
  );
};

// 更简约的卡片样式
const FeatureCard = ({ icon, title, desc }) => (
  <div className="flex flex-col items-center text-center group">
    <div className="mb-4 p-3 bg-orange-50 rounded-full text-orange-500 group-hover:bg-orange-100 transition-colors">
        {icon}
    </div>
    <h3 className="text-lg font-bold mb-3 text-gray-800">{title}</h3>
    <p className="text-sm text-gray-500 leading-relaxed max-w-xs">{desc}</p>
  </div>
);

export default LandingPage;