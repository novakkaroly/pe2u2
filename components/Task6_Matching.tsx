import React, { useState } from 'react';
import { SectionWrapper } from './SectionWrapper';

const definitions = [
  { id: 1, text: "Wind that travels in a circle.", answer: "a" },
  { id: 2, text: "A huge wave of water.", answer: "f" },
  { id: 3, text: "Electricity in the sky.", answer: "e" },
  { id: 4, text: "Too much water.", answer: "c" },
  { id: 5, text: "Very strong wind.", answer: "g" },
  { id: 6, text: "Snow falling down a mountain.", answer: "b" },
];

const nouns = [
  { id: 'a', text: "tornado" },
  { id: 'b', text: "avalanche" },
  { id: 'c', text: "flood" },
  { id: 'd', text: "earthquake (Example)" },
  { id: 'e', text: "lightning" },
  { id: 'f', text: "tsunami" },
  { id: 'g', text: "hurricane" },
];

export const Task6_Matching: React.FC = () => {
  const [selections, setSelections] = useState<Record<number, string>>({});
  const [results, setResults] = useState<Record<number, boolean>>({});
  const [checked, setChecked] = useState(false);

  const handleSelect = (id: number, val: string) => {
    setSelections(prev => ({ ...prev, [id]: val }));
    setChecked(false);
  };

  const checkAnswers = () => {
    const newResults: Record<number, boolean> = {};
    definitions.forEach(q => {
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
      title="Task 6: Definitions" 
      subtitle="Match the definitions (1–6) with the correct nouns (a–g)."
      score={checked ? correctCount : undefined}
      total={definitions.length}
      onCheck={checkAnswers}
      onReset={reset}
    >
      <div className="grid md:grid-cols-3 gap-8">
        {/* Nouns List */}
        <div className="md:col-span-1 bg-violet-50 p-6 rounded-lg border border-violet-100 h-fit">
          <h4 className="font-bold text-violet-800 mb-4 uppercase text-sm tracking-wider">Vocabulary List</h4>
          <ul className="space-y-3">
            {nouns.map((n) => (
              <li key={n.id} className={`flex gap-3 text-gray-700 ${n.id === 'd' ? 'line-through opacity-50' : ''}`}>
                <span className="font-bold bg-white w-6 h-6 flex items-center justify-center rounded-full border border-violet-200 text-sm">{n.id}</span>
                <span>{n.text}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Matching Area */}
        <div className="md:col-span-2 space-y-3">
          <div className="bg-gray-50 p-3 rounded text-gray-500 text-sm italic border border-gray-100">
            Example: The earth moving and breaking. — <strong>earthquake (d)</strong>
          </div>

          {definitions.map((def) => (
            <div key={def.id} className="bg-white p-4 rounded-lg border border-gray-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex gap-3">
                 <span className="font-bold text-gray-400">{def.id}.</span>
                 <p className="text-gray-800 font-medium">{def.text}</p>
              </div>
              
              <div className="flex items-center gap-2">
                <select 
                  className={`w-full sm:w-40 p-2 rounded border cursor-pointer outline-none
                    ${checked 
                      ? (results[def.id] ? 'border-green-500 bg-green-50 text-green-700' : 'border-red-500 bg-red-50 text-red-700')
                      : 'border-gray-300 focus:border-primary'
                    }`}
                  value={selections[def.id] || ''}
                  onChange={(e) => handleSelect(def.id, e.target.value)}
                >
                  <option value="" disabled>Choose...</option>
                  {nouns.filter(n => n.id !== 'd').map(n => (
                    <option key={n.id} value={n.id}>{n.id} - {n.text}</option>
                  ))}
                </select>
                {checked && !results[def.id] && (
                   <span className="text-red-500 font-bold w-6 text-center">{def.answer}</span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
};