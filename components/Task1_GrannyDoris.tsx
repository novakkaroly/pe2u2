import React, { useState } from 'react';
import { SectionWrapper } from './SectionWrapper';
import { QuestionResult } from '../types';
import { Check, X } from 'lucide-react';

const questions = [
  { id: 1, text: "Doris' parents told the children not to go into the forest.", answer: true },
  { id: 2, text: "They ate their food by some plants.", answer: false },
  { id: 3, text: "There was a thunderstorm but no lightning.", answer: false },
  { id: 4, text: "Their parents found them.", answer: false },
  { id: 5, text: "Doris still wanted to be an explorer, but Marty didn't.", answer: true },
];

export const Task1_GrannyDoris: React.FC = () => {
  const [results, setResults] = useState<Record<number, boolean | null>>({});
  const [selections, setSelections] = useState<Record<number, boolean | null>>({});
  const [checked, setChecked] = useState(false);

  const handleSelect = (id: number, value: boolean) => {
    setSelections(prev => ({ ...prev, [id]: value }));
    setChecked(false);
  };

  const checkAnswers = () => {
    const newResults: Record<number, boolean> = {};
    questions.forEach(q => {
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
      title="Task 1: Granny Doris's Story" 
      subtitle="Read the transcript and decide if the sentences are True (T) or False (F)."
      score={checked ? correctCount : undefined}
      total={questions.length}
      onCheck={checkAnswers}
      onReset={reset}
    >
      <div className="grid md:grid-cols-2 gap-8">
        {/* Reading Text */}
        <div className="bg-amber-50 p-6 rounded-lg border border-amber-100 text-gray-800 leading-relaxed font-serif text-lg shadow-sm">
          <h3 className="font-bold text-amber-800 mb-3 border-b border-amber-200 pb-2">Audio Script</h3>
          <p className="mb-4">
            My granny, Doris, told me a very interesting story. When she was twelve years old, she and her brother, Marty, who was ten, wanted to be explorers. They decided to go into the forest near their home. They didn't tell their parents because their parents always told them not to go into the forest. They said that it was big and dangerous.
          </p>
          <p className="mb-4">
            They took some food and ran into the forest. Their parents were both very busy and they didn't see the children go. At first, my granny says it was exciting and they saw lots of different animals and plants. They stopped and ate their food by a river when they got hungry. They had a lot of fun. Time went very fast and it got dark. My granny said she felt worried when it got dark because they couldn't find the way home. Then, there was a thunderstorm. Granny's brother was frightened of the lightning, but Granny liked it. They got very wet. They walked for a long time. There was a lot of mud. They climbed up a big tree because it was difficult to walk in the mud. It was dry in the tree because it had a lot of leaves, but they were cold.
          </p>
          <p>
            Then they heard their names. It was their father's voice. He found them alive and well, and they went home. Her brother said he didn't want to be an explorer anymore, but my granny said she liked the excitement and wanted more adventures!
          </p>
        </div>

        {/* Questions */}
        <div className="space-y-6">
          <div className="bg-blue-50 p-4 rounded-md border border-blue-100 text-sm text-blue-800 mb-4">
            <strong>Example:</strong> Marty was twelve years old when the story happened. 
            <span className="font-bold ml-2 text-red-600">False</span> (He was ten).
          </div>
          
          {questions.map((q) => (
            <div key={q.id} className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
              <div className="flex justify-between items-start gap-4">
                <span className="font-bold text-gray-400 w-6 shrink-0">{q.id}.</span>
                <p className="flex-grow font-medium text-gray-800">{q.text}</p>
              </div>
              
              <div className="flex items-center gap-6 mt-3 ml-10">
                <label className={`flex items-center gap-2 cursor-pointer p-2 rounded hover:bg-gray-50 transition-colors ${selections[q.id] === true ? 'bg-blue-50 ring-1 ring-blue-200' : ''}`}>
                  <input 
                    type="radio" 
                    name={`q-${q.id}`} 
                    className="w-4 h-4 text-primary"
                    checked={selections[q.id] === true}
                    onChange={() => handleSelect(q.id, true)}
                  />
                  <span className="font-semibold text-gray-700">True</span>
                </label>

                <label className={`flex items-center gap-2 cursor-pointer p-2 rounded hover:bg-gray-50 transition-colors ${selections[q.id] === false ? 'bg-blue-50 ring-1 ring-blue-200' : ''}`}>
                  <input 
                    type="radio" 
                    name={`q-${q.id}`} 
                    className="w-4 h-4 text-primary"
                    checked={selections[q.id] === false}
                    onChange={() => handleSelect(q.id, false)}
                  />
                  <span className="font-semibold text-gray-700">False</span>
                </label>

                {checked && (
                  <div className="ml-auto">
                    {results[q.id] ? (
                      <span className="flex items-center gap-1 text-green-600 font-bold bg-green-50 px-2 py-1 rounded">
                        <Check size={16} /> Correct
                      </span>
                    ) : (
                      <span className="flex items-center gap-1 text-red-500 font-bold bg-red-50 px-2 py-1 rounded">
                        <X size={16} /> {q.answer ? "True" : "False"}
                      </span>
                    )}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
};