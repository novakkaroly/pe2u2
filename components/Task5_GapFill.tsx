import React, { useState } from 'react';
import { SectionWrapper } from './SectionWrapper';
import { MistakeItem } from '../types';

const words = ["cloudy", "wet", "windy", "snowing", "stormy", "sunny", "hailing"];
const questions = [
  { id: 1, text: "The land is so white when it's ____.", answer: "snowing" },
  { id: 2, text: "It's ____! The pieces of ice are so big – it hurts!", answer: "hailing" },
  { id: 3, text: "It was so ____ my hat flew off.", answer: "windy" },
  { id: 4, text: "It was ____ and muddy after the rain.", answer: "wet" },
  { id: 5, text: "On holiday, we had a few ____ nights with lightning and thunder.", answer: "stormy" },
  { id: 6, text: "On ____ days we went swimming.", answer: "sunny" },
];

export const Task5_GapFill: React.FC = () => {
  const [selections, setSelections] = useState<Record<number, string>>({});
  const [results, setResults] = useState<Record<number, boolean>>({});
  const [mistakes, setMistakes] = useState<MistakeItem[]>([]);
  const [checked, setChecked] = useState(false);

  const handleSelect = (id: number, val: string) => {
    setSelections(prev => ({ ...prev, [id]: val }));
    setChecked(false);
  };

  const checkAnswers = () => {
    const newResults: Record<number, boolean> = {};
    const newMistakes: MistakeItem[] = [];

    questions.forEach(q => {
      const isCorrect = selections[q.id] === q.answer;
      newResults[q.id] = isCorrect;
      
      if (!isCorrect) {
        newMistakes.push({
          question: q.text,
          userAnswer: selections[q.id] || '(empty)',
          correctAnswer: q.answer,
          context: "Topic: Weather Vocabulary"
        });
      }
    });

    setResults(newResults);
    setMistakes(newMistakes);
    setChecked(true);
  };

  const reset = () => {
    setSelections({});
    setResults({});
    setMistakes([]);
    setChecked(false);
  };

  const correctCount = Object.values(results).filter(Boolean).length;

  return (
    <SectionWrapper 
      title="Task 5: Weather Vocabulary" 
      subtitle="Complete the sentences with one of the words from the box."
      score={checked ? correctCount : undefined}
      total={questions.length}
      mistakes={mistakes}
      onCheck={checkAnswers}
      onReset={reset}
    >
      <div className="flex flex-wrap gap-2 justify-center mb-8 bg-gray-100 p-4 rounded-lg border-2 border-dashed border-gray-300">
        {words.map((w, i) => (
          <span key={i} className={`px-3 py-1 rounded-full bg-white border border-gray-200 text-gray-700 shadow-sm font-medium ${w === 'cloudy' ? 'line-through text-gray-400' : ''}`}>
            {w}
          </span>
        ))}
      </div>

      <div className="space-y-4">
        {questions.map((q) => {
          const parts = q.text.split('____');
          return (
            <div key={q.id} className="bg-white p-4 rounded-lg border border-gray-200 flex items-center gap-3">
              <span className="font-bold text-gray-400">{q.id}.</span>
              <div className="flex-grow flex flex-wrap items-center gap-2 leading-8 text-lg text-gray-800">
                <span>{parts[0]}</span>
                <select 
                  className={`border-b-2 outline-none py-1 px-2 text-primary font-bold bg-transparent cursor-pointer
                    ${checked 
                      ? (results[q.id] ? 'border-green-500 text-green-600' : 'border-red-500 text-red-500')
                      : 'border-gray-300 focus:border-primary'
                    }`}
                  value={selections[q.id] || ''}
                  onChange={(e) => handleSelect(q.id, e.target.value)}
                >
                  <option value="" disabled>select...</option>
                  {words.filter(w => w !== 'cloudy').map(w => (
                    <option key={w} value={w}>{w}</option>
                  ))}
                </select>
                <span>{parts[1]}</span>
                
                {checked && !results[q.id] && (
                  <span className="text-xs text-red-500 font-bold ml-2">({q.answer})</span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </SectionWrapper>
  );
};