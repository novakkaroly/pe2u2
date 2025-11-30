import React, { useState } from 'react';
import { SectionWrapper } from './SectionWrapper';

const scenarios = [
  { id: 1, text: "He's here and he's angry.", answer: "Oh no!" },
  { id: 2, text: "The bus to the station was late and I missed my train.", answer: "That's a real shame." },
  { id: 3, text: "I am so sorry. I broke your cup.", answer: "It really doesn't matter." },
  { id: 4, text: "I failed the test.", answer: "Oh, bad luck!" },
  { id: 5, text: "I feel so sick. I can't come to the cinema.", answer: "Poor you." },
  { id: 6, text: "You didn't ask me before you took my jacket!", answer: "Sorry about that." },
];

const responses = [
  "Sorry about that.",
  "Poor you.",
  "It really doesn't matter.",
  "That's a real shame.",
  "Oh, bad luck!",
  "Oh no!",
  "Never mind. (Example)"
];

export const Task7_Responses: React.FC = () => {
  const [selections, setSelections] = useState<Record<number, string>>({});
  const [results, setResults] = useState<Record<number, boolean>>({});
  const [checked, setChecked] = useState(false);

  const handleSelect = (id: number, val: string) => {
    setSelections(prev => ({ ...prev, [id]: val }));
    setChecked(false);
  };

  const checkAnswers = () => {
    const newResults: Record<number, boolean> = {};
    scenarios.forEach(q => {
      newResults[q.id] = selections[q.id] === q.answer;
    });
    setResults(newResults);
    setChecked(true);
  };

  const reset = () => {
    setSelections({});
    setResults({});
    setChecked(false);
  };

  const correctCount = Object.values(results).filter(Boolean).length;

  return (
    <SectionWrapper 
      title="Task 7: Responses" 
      subtitle="Choose the correct response to match each statement or question."
      score={checked ? correctCount : undefined}
      total={scenarios.length}
      onCheck={checkAnswers}
      onReset={reset}
    >
      <div className="grid lg:grid-cols-4 gap-6">
        <div className="lg:col-span-3 space-y-6">
           {scenarios.map((s) => (
             <div key={s.id} className="bg-white p-5 rounded-lg border border-gray-200 shadow-sm">
               <div className="flex gap-2 mb-3">
                 <span className="font-bold text-gray-400">{s.id}.</span>
                 <p className="text-gray-800 font-serif text-lg">"{s.text}"</p>
               </div>
               
               <div className="ml-6 flex flex-col md:flex-row md:items-center gap-3">
                 <span className="text-gray-400 text-sm uppercase font-bold tracking-wide">Response:</span>
                 <select 
                   className={`flex-grow p-2.5 rounded border outline-none font-medium
                     ${checked 
                       ? (results[s.id] ? 'border-green-500 bg-green-50 text-green-700' : 'border-red-500 bg-red-50 text-red-700')
                       : 'border-gray-300 focus:border-secondary'
                     }`}
                   value={selections[s.id] || ''}
                   onChange={(e) => handleSelect(s.id, e.target.value)}
                 >
                   <option value="" disabled>Select a response...</option>
                   {responses.filter(r => !r.includes("Example")).map(r => (
                     <option key={r} value={r}>{r}</option>
                   ))}
                 </select>
               </div>
               {checked && !results[s.id] && (
                 <div className="ml-6 mt-2 text-red-500 text-sm font-bold">Correct: {s.answer}</div>
               )}
             </div>
           ))}
        </div>

        <div className="lg:col-span-1">
          <div className="bg-orange-50 p-4 rounded-lg border border-orange-100 sticky top-4">
             <h4 className="font-bold text-orange-800 mb-3 text-sm uppercase">Available Responses</h4>
             <ul className="space-y-2 text-sm text-gray-700">
               {responses.map((r, i) => (
                 <li key={i} className={`p-2 bg-white rounded border border-orange-100 ${r.includes("Example") ? "opacity-50 line-through" : ""}`}>
                   {r}
                 </li>
               ))}
             </ul>
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
};