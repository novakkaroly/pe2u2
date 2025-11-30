import React, { useState } from 'react';
import { SectionWrapper } from './SectionWrapper';
import { Check, X } from 'lucide-react';

const questions = [
  { 
    id: 1, 
    question: "How many times had Joe been in a helicopter before?",
    options: [
      { id: 'A', text: "It was Joe's second time in a helicopter." },
      { id: 'B', text: "It was Joe's mother's second time in a helicopter." }
    ],
    answer: 'B' 
  },
  { 
    id: 2, 
    question: "What was the weather like when they started?",
    options: [
      { id: 'A', text: "There were some clouds in the sky when they left." },
      { id: 'B', text: "There weren't any clouds in the sky when they left." }
    ],
    answer: 'A' 
  },
  { 
    id: 3, 
    question: "How did Joe feel at the start?",
    options: [
      { id: 'A', text: "Joe felt frightened at the beginning of the helicopter ride." },
      { id: 'B', text: "Joe didn't feel frightened at the beginning of the helicopter ride." }
    ],
    answer: 'B' 
  },
  { 
    id: 4, 
    question: "How long did the bad weather last?",
    options: [
      { id: 'A', text: "The storm lasted for a day." },
      { id: 'B', text: "The storm lasted for a while." }
    ],
    answer: 'B' 
  },
  { 
    id: 5, 
    question: "What happened after the storm?",
    options: [
      { id: 'A', text: "They went back up in the helicopter after the storm." },
      { id: 'B', text: "They went back up in the helicopter the next day." }
    ],
    answer: 'A' 
  },
];

export const Task2_Helicopter: React.FC = () => {
  const [results, setResults] = useState<Record<number, boolean>>({});
  const [selections, setSelections] = useState<Record<number, string>>({});
  const [checked, setChecked] = useState(false);

  const handleSelect = (id: number, value: string) => {
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
      title="Task 2: My Adventure in a Helicopter" 
      subtitle="Read about Joe's adventure and choose the correct option (A or B)."
      score={checked ? correctCount : undefined}
      total={questions.length}
      onCheck={checkAnswers}
      onReset={reset}
    >
      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-sky-50 p-6 rounded-lg border border-sky-100 text-gray-800 leading-relaxed shadow-sm">
           <h3 className="font-bold text-sky-800 mb-3 border-b border-sky-200 pb-2 text-xl">My Adventure in a Helicopter!</h3>
           <p className="mb-4">
             Last Sunday, I went in a helicopter for the first time. I went with my mother and the pilot. My mother went in a helicopter with her father once when she was a child and really liked it. The helicopter ride was a birthday present for me and I was very excited.
           </p>
           <p className="mb-4">
             We left the house to go for the helicopter ride. It was a sunny day, but there were a few clouds. My mother was worried about the clouds. The helicopter pilot said the weather was OK though and so I didn't worry.
           </p>
           <p className="mb-4">
             It was amazing to be so high in the sky. I loved it. I looked out of the window and down at the land below. It was beautiful up in the sky. The sound of the helicopter was quite loud, but I liked it. After about half an hour, it became very cloudy. The clouds became very dark. Then I heard the sound of thunder and I felt very frightened. We saw lightning twice. We decided to go back down to land. The storm got louder and louder and the rain made it difficult to see. My mum didn't look happy.
           </p>
           <p>
             The pilot was very good. He got us down to the ground. We ran through the rain into a building and drank some hot chocolate. The storm lasted for a while, but then the sun came out. The pilot took us back up into the sky and we had a wonderful helicopter ride. I was a very happy birthday boy!
           </p>
        </div>

        <div className="space-y-6">
          <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
             <p className="text-gray-500 italic mb-2">Example:</p>
             <div className="space-y-2 text-gray-400">
               <div className="flex gap-2"><span className="font-bold">A</span> <span className="line-through">Joe went in a helicopter last Sunday.</span></div>
               <div className="flex gap-2 text-green-600"><span className="font-bold">B</span> <span>Joe went in a helicopter last Saturday.</span></div>
             </div>
          </div>

          {questions.map((q) => (
            <div key={q.id} className="bg-white p-5 rounded-lg border border-gray-200 shadow-sm">
              <div className="flex gap-2 mb-3">
                 <span className="font-bold text-gray-400">{q.id}.</span>
                 <p className="font-medium text-gray-800">{q.question}</p>
              </div>
              
              <div className="space-y-3 pl-6">
                {q.options.map((opt) => (
                  <div 
                    key={opt.id}
                    onClick={() => handleSelect(q.id, opt.id)}
                    className={`
                      relative p-3 rounded-lg border-2 cursor-pointer transition-all flex items-center justify-between
                      ${selections[q.id] === opt.id ? 'border-primary bg-sky-50' : 'border-gray-100 hover:border-gray-300'}
                      ${checked && q.answer === opt.id ? 'border-green-500 bg-green-50' : ''}
                      ${checked && selections[q.id] === opt.id && q.answer !== opt.id ? 'border-red-400 bg-red-50' : ''}
                    `}
                  >
                    <div className="flex gap-3 items-center">
                       <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${selections[q.id] === opt.id ? 'bg-primary text-white' : 'bg-gray-200 text-gray-600'}`}>
                         {opt.id}
                       </span>
                       <span className="text-sm md:text-base text-gray-700">{opt.text}</span>
                    </div>

                    {checked && q.answer === opt.id && <Check className="text-green-600" size={20} />}
                    {checked && selections[q.id] === opt.id && q.answer !== opt.id && <X className="text-red-500" size={20} />}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
};