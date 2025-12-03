import React, { useState, useEffect, useRef } from 'react';
import LittleOrangeStar from './LittleOrangeStar';
import ReactMarkdown from 'react-markdown';
import { 
  Send, ArrowLeft, FileText, CheckCircle, AlertCircle, RefreshCw, 
  Mic, MicOff, Copy, Download, Check // ✨ 新增图标
} from 'lucide-react';

const ChatInterface = ({ targetRole, language, onBack }) => {
  
  // 1. 配置参数
  const API_KEY = "66d70ffd-e1e3-460c-9635-9cdfc5aa54b7"; 

  const API_URL = "https://ark.cn-beijing.volces.com/api/v3/chat/completions";
  const MODEL_ID = "deepseek-v3-250324"; 

  // 2. 动态生成 System Prompt
  const langPrompt = language === 'zh-CN' 
    ? `请务必使用中文回复。` 
    : `Please reply in English.`;

  const SYSTEM_PROMPT = `
    你是一个大厂级别的简历优化专家 "Little Orange Star"。
    你的核心目标是帮助用户将经历转化为符合【大厂 6 大原则】的简历 Bullet Points。
    ${langPrompt}

    【必须严格遵守的 6 大原则】：
    1. 结果导向 (Result First)：生成的简历内容必须【先写结果，再写过程】。
    2. 可量化 (Quantitative)：疯狂挖掘数字。
    3. 可验证 (Credible)：内容要真实合理。
    4. 岗位相关 (Relevant)：只保留与 "${targetRole}" 强相关的内容。
    5. 简洁 (Concise)：一句话表达一个点。
    6. 突出能力 (Skills-backed)：强调核心能力。

    【重要指令】：
    每次回复，你必须严格只输出一个标准的 JSON 对象，不要包含 Markdown 标记。
    JSON 格式：
    {
      "reply": "简短追问，语气专业。",
      "resumeMarkdown": "实时更新的简历内容 (Markdown格式)。",
      "progress": 0-100 (整数),
      "missingInfo": ["字符串数组", "列出缺失要素"]
    }
    
    当前上下文：用户目标岗位 "${targetRole}"。
  `;

  const [messages, setMessages] = useState([
    { 
      id: 1, 
      sender: 'ai', 
      text: language === 'zh-CN' 
        ? `你好！我是小橙星 🌟。\n\n我们要拿下 **${targetRole}** 这个岗位，简历必须【结果导向】且【数据化】。\n\n请告诉我您最近负责的一个核心项目。它最终产出了什么结果？（请尽量提供数据，如收益、效率提升等）`
        : `Hi! I'm Little Orange Star 🌟. \n\nTo land the **${targetRole}** role, we need a **Result-First** & **Data-Driven** resume.\n\nTell me about a core project. What was the ultimate OUTCOME? (Think metrics: Revenue, Efficiency, CTR).` 
    }
  ]);
  
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  
  const initialResume = language === 'zh-CN' 
    ? `# ${targetRole}\n\n## 核心成就 (Result First)\n*等待数据输入... (例如：实现营收增长 30%...)*` 
    : `# ${targetRole}\n\n## Key Achievements (Result First)\n*Waiting for metrics... (e.g., Increased revenue by 30%...)*`;

  const [resumeContent, setResumeContent] = useState(initialResume);
  const [progress, setProgress] = useState(5);
  const [missingInfo, setMissingInfo] = useState(language === 'zh-CN' 
    ? ['量化结果', '核心能力', '产出'] 
    : ['Quantifiable Results', 'Core Skills', 'Outcome']);
  
  // ✨ 新增：复制成功的状态
  const [isCopied, setIsCopied] = useState(false);

  const messagesEndRef = useRef(null);
  const [isListening, setIsListening] = useState(false);
  const recognitionRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  // --- 语音逻辑 (保持不变) ---
  const handleVoiceInput = () => {
     const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
     if (!SpeechRecognition) { alert("Browser not supported."); return; }
     if (isListening) { recognitionRef.current?.stop(); setIsListening(false); return; }
     const recognition = new SpeechRecognition();
     recognition.lang = language;
     recognition.interimResults = true;
     recognition.continuous = true;
     let finalTranscript = '';
     recognition.onstart = () => setIsListening(true);
     recognition.onresult = (e) => {
        let interimTranscript = '';
        for (let i = e.resultIndex; i < e.results.length; ++i) {
           if (e.results[i].isFinal) finalTranscript += e.results[i][0].transcript;
           else interimTranscript += e.results[i][0].transcript;
        }
        setInput(prev => finalTranscript + interimTranscript);
     };
     recognition.onerror = (e) => { console.error(e); setIsListening(false); };
     recognition.onend = () => setIsListening(false);
     recognitionRef.current = recognition;
     recognition.start();
  };

  // --- AI 发送逻辑 (保持不变) ---
const handleSend = async () => {
    if (!input.trim()) return;

    // ✨ 修复 BUG 的关键点 ✨
    // 使用 abort() 而不是 stop()。
    // stop() 会尝试返回最后的结果，导致清空后的输入框又被填满。
    // abort() 会立即切断连接，不触发任何后续的 onresult。
    if (isListening) {
      recognitionRef.current?.abort(); 
      setIsListening(false);
    }

    const userText = input;
    const userMsg = { id: Date.now(), sender: 'user', text: userText };
    setMessages(prev => [...prev, userMsg]);
    
    // 立即清空，因为 abort() 保证了不会有回马枪
    setInput('');
    setIsTyping(true);

    try {
      const apiMessages = [
        { role: "system", content: SYSTEM_PROMPT },
        ...messages.slice(-6).map(m => ({ 
          role: m.sender === 'ai' ? 'assistant' : 'user', 
          content: m.text 
        })),
        { role: "user", content: userText }
      ];

      const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json", "Authorization": `Bearer ${API_KEY}` },
        body: JSON.stringify({
          model: MODEL_ID,
          messages: apiMessages,
          temperature: 0.7,
          response_format: { type: "json_object" } 
        })
      });

      const data = await response.json();
      if (!data.choices || !data.choices[0]) throw new Error("API Error");

      const aiRawContent = data.choices[0].message.content;
      const cleanJsonString = aiRawContent.replace(/```json/g, "").replace(/```/g, "").trim();

      let parsedData;
      try {
        parsedData = JSON.parse(cleanJsonString);
      } catch (e) {
        parsedData = {
          reply: aiRawContent,
          resumeMarkdown: resumeContent,
          progress: progress,
          missingInfo: missingInfo
        };
      }

      setMessages(prev => [...prev, { id: Date.now() + 1, sender: 'ai', text: parsedData.reply }]);
      if (parsedData.resumeMarkdown) setResumeContent(parsedData.resumeMarkdown);
      if (parsedData.progress !== undefined) setProgress(parsedData.progress);
      if (parsedData.missingInfo) setMissingInfo(parsedData.missingInfo);

    } catch (error) {
      console.error("API Error:", error);
      setMessages(prev => [...prev, { id: Date.now() + 1, sender: 'ai', text: "⚠️ Network Error." }]);
    } finally {
      setIsTyping(false);
    }
  };

  // ✨ 新增：处理复制 ✨
  const handleCopy = () => {
    navigator.clipboard.writeText(resumeContent).then(() => {
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000); // 2秒后恢复图标
    });
  };

  // ✨ 新增：处理下载 ✨
  const handleDownload = () => {
    // 创建一个 Blob 对象
    const blob = new Blob([resumeContent], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    // 创建一个临时下载链接
    const a = document.createElement('a');
    a.href = url;
    // 文件名：岗位_Resume.md (例如: Senior_Product_Manager_Resume.md)
    a.download = `${targetRole.replace(/\s+/g, '_')}_Resume.md`;
    document.body.appendChild(a);
    a.click();
    // 清理
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="flex h-screen bg-cream font-mono overflow-hidden">
      
      {/* Left Chat Area */}
      <div className="flex-1 flex flex-col border-r border-gray-200 h-full max-w-3xl">
        <div className="bg-white border-b border-gray-200 p-4 flex items-center justify-between shadow-sm z-10">
          <button onClick={onBack} className="text-gray-500 hover:text-orange-500 flex items-center gap-1">
            <ArrowLeft size={16} /> <span className="text-xs font-bold">EXIT</span>
          </button>
          <div className="flex flex-col items-center">
               <span className="text-[10px] text-gray-400 uppercase tracking-widest">Target Role</span>
               <span className="font-bold text-sm text-orange-500">{targetRole}</span>
          </div>
          <div className="flex items-center gap-1 bg-gray-100 px-2 py-1 rounded text-xs text-gray-500">
             <Mic size={12}/> {language === 'zh-CN' ? 'CN' : 'EN'}
          </div>
        </div>

        <div className="flex-grow overflow-y-auto p-4 space-y-6 bg-[#F9F7F3]">
          {messages.map((msg) => (
            <div key={msg.id} className={`flex w-full ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`flex max-w-[90%] gap-3 ${msg.sender === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                <div className="flex-shrink-0 mt-1">
                  {msg.sender === 'ai' ? <LittleOrangeStar size="sm" /> : <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center text-xs font-bold text-gray-600">ME</div>}
                </div>
                <div className={`p-4 rounded-lg text-sm leading-relaxed whitespace-pre-wrap shadow-sm 
                  ${msg.sender === 'user' ? 'bg-white border border-gray-200' : 'bg-orange-50 border border-orange-100'}`}>
                  <ReactMarkdown>{msg.text}</ReactMarkdown>
                </div>
              </div>
            </div>
          ))}
          {isTyping && <div className="flex w-full justify-start pl-12"><span className="text-xs text-orange-400 animate-pulse">Little Orange Star is analyzing metrics...</span></div>}
          <div ref={messagesEndRef} />
        </div>

        <div className="bg-white p-4 border-t border-gray-200">
          <div className="relative flex items-center gap-2">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSend(); }}}
              placeholder={isListening ? "Listening..." : "Type details..."}
              className={`w-full bg-gray-50 border rounded p-3 pl-4 pr-24 resize-none focus:outline-none h-14 text-sm transition-all duration-300 ${isListening ? 'border-orange-500 ring-2 ring-orange-100 bg-orange-50' : 'border-gray-200 focus:border-orange-500'}`}
            />
            <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-2">
              <button onClick={handleVoiceInput} className={`p-2 rounded-full transition-all duration-300 ${isListening ? 'bg-red-500 text-white animate-pulse shadow-lg scale-110' : 'bg-gray-100 text-gray-500 hover:text-gray-700'}`}>
                {isListening ? <MicOff size={18} /> : <Mic size={18} />}
              </button>
              <button onClick={handleSend} disabled={!input.trim() || isTyping} className="p-2 rounded-full bg-orange-50 text-orange-500 hover:bg-orange-500 hover:text-white disabled:opacity-30 transition-all"><Send size={18} /></button>
            </div>
          </div>
        </div>
      </div>

      {/* Right: Resume Preview Area */}
      <div className="w-[450px] bg-white flex flex-col border-l border-gray-200 shadow-xl hidden md:flex">
        
        {/* Progress Header */}
        <div className="p-6 border-b border-gray-100 bg-gray-50">
          <div className="flex justify-between items-end mb-2">
            <h3 className="text-sm font-bold text-gray-600 flex items-center gap-2"><RefreshCw size={14}/> {language === 'zh-CN' ? '完成度' : 'Progress'}</h3>
            <span className="text-2xl font-black text-orange-500">{progress}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4"><div className="bg-orange-500 h-2.5 rounded-full transition-all duration-700 ease-out" style={{ width: `${progress}%` }}></div></div>
          {missingInfo.length > 0 ? (
            <div><p className="text-[10px] text-gray-400 uppercase tracking-wider mb-2">{language === 'zh-CN' ? '缺失要素' : 'Missing Info'}</p><div className="flex flex-wrap gap-2">{missingInfo.map((tag, idx) => (<span key={idx} className="flex items-center gap-1 px-2 py-1 bg-red-50 text-red-500 text-xs rounded border border-red-100"><AlertCircle size={10} /> {tag}</span>))}</div></div>
          ) : (<div className="flex items-center gap-2 text-green-600 text-xs font-bold p-2 bg-green-50 rounded"><CheckCircle size={14} /> Ready</div>)}
        </div>

        {/* ✨ 简历预览主体 & 按钮栏 ✨ */}
        <div className="flex-grow overflow-y-auto p-6 bg-[#F2F2F2]">
          <div className="bg-white min-h-[500px] p-8 shadow-sm text-gray-800 text-sm leading-relaxed border border-gray-200 relative">
            
            {/* 标题栏与按钮 */}
            <div className="flex items-center justify-between border-b border-gray-100 pb-2 mb-4">
               <div className="flex items-center gap-2">
                 <FileText size={14} className="text-gray-400"/>
                 <span className="font-bold text-xs text-gray-400 uppercase">Live Preview</span>
               </div>
               
               {/* ✨ 复制和下载按钮组 ✨ */}
               <div className="flex items-center gap-1">
                 <button 
                   onClick={handleCopy} 
                   className="p-1.5 text-gray-400 hover:text-orange-500 hover:bg-orange-50 rounded transition-colors"
                   title="Copy Markdown"
                 >
                   {isCopied ? <Check size={14} className="text-green-500"/> : <Copy size={14}/>}
                 </button>
                 <button 
                   onClick={handleDownload} 
                   className="p-1.5 text-gray-400 hover:text-orange-500 hover:bg-orange-50 rounded transition-colors"
                   title="Download .md File"
                 >
                   <Download size={14}/>
                 </button>
               </div>
            </div>

            {/* 内容渲染 */}
            <div className="prose prose-sm prose-orange max-w-none">
              <ReactMarkdown>{resumeContent}</ReactMarkdown>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default ChatInterface;