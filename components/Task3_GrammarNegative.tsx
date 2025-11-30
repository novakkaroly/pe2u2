import React, { useState } from 'react';
import { SectionWrapper } from './SectionWrapper';
import { Check, X, RefreshCcw } from 'lucide-react';

const sentences = [
  { id: 1, original: "Trees blew down in the tornado.", answer: "Trees didn't blow down in the tornado" },
  { id: 2, original: "It was a hot day yesterday.", answer: "It wasn't a hot day yesterday" },
  { id: 3, original: "She enjoyed the rain.", answer: "She didn't enjoy the rain" },
  { id: 4, original: "There were storms every day.", answer: "There weren't storms every day" },
  { id: 5, original: "The boy learned to take photos.", answer: "The boy didn't learn to take photos" },
  { id: 6, original: "We needed rain for the garden.", answer: "We didn't need rain for the garden" },
];

export const Task3_GrammarNegative: React.FC = () => {
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
    sentences.forEach(s => {
      const userNorm = normalize(inputs[s.id] || '');
      const answerNorm = normalize(s.answer);
      // Allow full form as well
      const altAnswerNorm = answerNorm.replace("didn't", "did not").replace("wasn't", "was not").replace("weren't", "were not");
      
      newResults[s.id] = userNorm === answerNorm || userNorm === altAnswerNorm;
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
      title="Task 3: Past Simple Negatives" 
      subtitle="Write the sentences in the negative form. Use contractions (e.g. didn't)."
      score={checked ? correctCount : undefined}
      total={sentences.length}
      onCheck={checkAnswers}
      onReset={reset}
    >
      <div className="space-y-6">
        <div className="bg-amber-50 p-4 rounded-md border border-amber-100 text-amber-900 mb-6">
           <p className="text-sm font-semibold">Example:</p>
           <p>There was a rainbow after the storm.</p>
           <p className="font-medium mt-1">→ <span className="underline decoration-amber-400">There wasn't a rainbow after the storm.</span></p>
        </div>

        {sentences.map((s) => (
          <div key={s.id} className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm transition-all hover:border-gray-300">
             <div className="flex gap-3 mb-2">
                <span className="font-bold text-gray-400 w-4 pt-1">{s.id}</span>
                <p className="text-lg text-gray-700">{s.original}</p>
             </div>
             <div className="pl-7">
               <div className="relative">
                 <input 
                    type="text" 
                    className={`w-full p-3 rounded border-2 outline-none transition-colors 
                      ${checked 
                        ? (results[s.id] ? 'border-green-500 bg-green-50' : 'border-red-400 bg-red-50') 
                        : 'border-gray-200 focus:border-primary focus:bg-sky-50'
                      }`}
                    placeholder="Type negative sentence..."
                    value={inputs[s.id] || ''}
                    onChange={(e) => handleChange(s.id, e.target.value)}
                    autoComplete="off"
                    autoCorrect="off"
                 />
                 {checked && (
                   <div className="absolute right-3 top-3">
                     {results[s.id] ? <Check className="text-green-600" /> : <X className="text-red-500" />}
                   </div>
                 )}
               </div>
               
               {checked && !results[s.id] && (
                 <div className="mt-2 text-sm text-red-600 flex items-start gap-2 animate-fade-in">
                    <span className="font-bold">Answer:</span> {s.answer}.
                 </div>
               )}
             </div>
          </div>
        ))}
      </div>
    </SectionWrapper>
  );
};