import React, { useState } from 'react';
import { SectionWrapper } from './SectionWrapper';
import { Check, X } from 'lucide-react';

const questions = [
  { id: 1, prompt: "I slept in a tent.", hint: "Where?", answer: "Where did you sleep?" },
  { id: 2, prompt: "I went by car.", hint: "How?", answer: "How did you go?" },
  { id: 3, prompt: "I saw my friend.", hint: "Who?", answer: "Who did you see?" },
  { id: 4, prompt: "I ate pizza.", hint: "What?", answer: "What did you eat?" },
  { id: 5, prompt: "I was tired because I went to bed late.", hint: "Why?", answer: "Why were you tired?" },
  { id: 6, prompt: "I walked for two hours.", hint: "How long?", answer: "How long did you walk for?" },
];

export const Task4_Questions: React.FC = () => {
  const [inputs, setInputs] = useState<Record<number, string>>({});
  const [results, setResults] = useState<Record<number, boolean>>({});
  const [checked, setChecked] = useState(false);

  const handleChange = (id: number, val: string) => {
    setInputs(prev => ({ ...prev, [id]: val }));
    setChecked(false);
  };

  const normalize = (str: string) => str.trim().toLowerCase().replace(/[.!?]$/, '').replace(/\s+/g, ' ');

  const checkAnswers = () => {
    const newResults: Record<number, boolean> = {};
    questions.forEach(q => {
      const userNorm = normalize(inputs[q.id] || '');
      const answerNorm = normalize(q.answer);
      // Flexible matching for question 6 (with or without 'for' at end sometimes confusing for students, keeping strict to key)
      newResults[q.id] = userNorm === answerNorm;
    });
    setResults(newResults);
    setChecked(true);
  };

  const reset = () => {
    setInputs({});
    setResults({});
    setChecked(false);
  };

  const correctCount = Object.values(results).filter(Boolean).length;

  return (
    <SectionWrapper 
      title="Task 4: Writing Questions" 
      subtitle="Write questions for the answers supplied using the word in brackets."
      score={checked ? correctCount : undefined}
      total={questions.length}
      onCheck={checkAnswers}
      onReset={reset}
    >
      <div className="space-y-6">
        <div className="bg-sky-50 p-4 rounded-md border border-sky-100 text-sky-900 mb-6">
           <p className="text-sm font-semibold">Example:</p>
           <p>I stayed on the mountain for a week. (How long?)</p>
           <p className="font-medium mt-1">→ <span className="underline decoration-sky-400">How long did you stay on the mountain?</span></p>
        </div>

        {questions.map((q) => (
          <div key={q.id} className="bg-white p-5 rounded-lg border border-gray-200 shadow-sm">
             <div className="flex flex-wrap items-baseline gap-2 mb-3">
               <span className="font-bold text-gray-400 mr-2">{q.id}.</span>
               <span className="font-semibold text-secondary bg-purple-50 px-2 py-0.5 rounded text-sm">({q.hint})</span>
               <span className="text-gray-600 italic">"{q.prompt}"</span>
             </div>
             
             <div className="relative">
               <input 
                  type="text" 
                  className={`w-full p-3 rounded border-2 outline-none transition-colors 
                    ${checked 
                      ? (results[q.id] ? 'border-green-500 bg-green-50' : 'border-red-400 bg-red-50') 
                      : 'border-gray-200 focus:border-secondary focus:bg-purple-50'
                    }`}
                  placeholder={`Write a question with "${q.hint}"...`}
                  value={inputs[q.id] || ''}
                  onChange={(e) => handleChange(q.id, e.target.value)}
               />
               {checked && (
                 <div className="absolute right-3 top-3">
                   {results[q.id] ? <Check className="text-green-600" /> : <X className="text-red-500" />}
                 </div>
               )}
             </div>
             
             {checked && !results[q.id] && (
               <div className="mt-2 text-sm text-red-600 font-medium">
                  Ans: {q.answer}
               </div>
             )}
          </div>
        ))}
      </div>
    </SectionWrapper>
  );
};