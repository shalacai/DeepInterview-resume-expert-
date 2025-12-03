import React from 'react';

const LittleOrangeStar = ({ size = "md", isThinking = false }) => {
  const dimension = size === "lg" ? "w-32 h-32" : "w-12 h-12";
  
  return (
    <div className={`${dimension} relative flex items-center justify-center transition-all duration-500`}>
      {/* 简单的星形 SVG */}
      <svg 
        viewBox="0 0 100 100" 
        className={`w-full h-full text-orange-500 fill-current ${isThinking ? 'animate-pulse' : ''}`}
        style={{ filter: 'drop-shadow(2px 4px 6px rgba(255, 107, 53, 0.3))' }}
      >
        <path d="M50 0 L61 35 L98 35 L68 57 L79 91 L50 70 L21 91 L32 57 L2 35 L39 35 Z" />
      </svg>
      
      {/* 眼睛 (极简风格) */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-full flex justify-center items-center pb-2">
         {/* 左眼 */}
         <div className="w-[10%] h-[10%] bg-white rounded-full mx-1 relative">
            <div className={`w-[40%] h-[40%] bg-black rounded-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 ${isThinking ? 'translate-y-[-2px]' : ''}`}></div>
         </div>
         {/* 右眼 */}
         <div className="w-[10%] h-[10%] bg-white rounded-full mx-1 relative">
             <div className={`w-[40%] h-[40%] bg-black rounded-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 ${isThinking ? 'translate-y-[-2px]' : ''}`}></div>
         </div>
      </div>
    </div>
  );
};

export default LittleOrangeStar;