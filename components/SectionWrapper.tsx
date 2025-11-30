import React from 'react';

interface SectionWrapperProps {
  title: string;
  subtitle: string;
  children: React.ReactNode;
  score?: number;
  total?: number;
  onCheck?: () => void;
  onReset?: () => void;
}

export const SectionWrapper: React.FC<SectionWrapperProps> = ({ 
  title, 
  subtitle, 
  children, 
  score, 
  total, 
  onCheck, 
  onReset 
}) => {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 max-w-4xl mx-auto my-6 animate-fade-in">
      <div className="bg-slate-50 p-6 border-b border-gray-100 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">{title}</h2>
          <p className="text-gray-500 mt-1">{subtitle}</p>
        </div>
        {(score !== undefined && total !== undefined) && (
          <div className="flex items-center gap-3">
             <div className="px-4 py-2 bg-indigo-50 text-indigo-700 rounded-lg font-bold text-lg">
               Score: {score} / {total}
             </div>
          </div>
        )}
      </div>
      
      <div className="p-6 md:p-8">
        {children}
      </div>

      <div className="bg-gray-50 p-6 border-t border-gray-100 flex justify-end gap-3 sticky bottom-0 z-10">
        {onReset && (
          <button 
            onClick={onReset}
            className="px-6 py-2.5 rounded-lg text-gray-600 font-medium hover:bg-gray-200 transition-colors"
          >
            Reset
          </button>
        )}
        {onCheck && (
          <button 
            onClick={onCheck}
            className="px-8 py-2.5 rounded-lg bg-primary text-white font-bold shadow-sm hover:bg-primary-dark hover:shadow transition-all transform active:scale-95"
          >
            Check Answers
          </button>
        )}
      </div>
    </div>
  );
};