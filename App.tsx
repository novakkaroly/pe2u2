import React, { useState } from 'react';
import { BookOpen, PenTool, MessageCircle, FileText, CheckCircle2 } from 'lucide-react';
import { TabType } from './types';
import { Task1_GrannyDoris } from './components/Task1_GrannyDoris';
import { Task2_Helicopter } from './components/Task2_Helicopter';
import { Task3_GrammarNegative } from './components/Task3_GrammarNegative';
import { Task4_Questions } from './components/Task4_Questions';
import { Task5_GapFill } from './components/Task5_GapFill';
import { Task6_Matching } from './components/Task6_Matching';
import { Task7_Responses } from './components/Task7_Responses';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>('story1');

  const tabs = [
    { id: 'story1', label: '1. Granny Doris', icon: <BookOpen size={18} /> },
    { id: 'story2', label: '2. Helicopter', icon: <FileText size={18} /> },
    { id: 'grammar', label: '3-4. Grammar', icon: <PenTool size={18} /> },
    { id: 'vocab', label: '5-6. Vocabulary', icon: <CheckCircle2 size={18} /> },
    { id: 'communication', label: '7. Responses', icon: <MessageCircle size={18} /> },
  ];

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 pb-20">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-30 shadow-sm">
        <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center text-white font-bold">
              PE
            </div>
            <h1 className="text-xl font-bold tracking-tight text-gray-800 hidden sm:block">
              Project Explore 2
              <span className="ml-2 text-gray-500 font-normal text-sm">Unit 2 Practice</span>
            </h1>
          </div>
        </div>
        
        {/* Navigation Tabs */}
        <div className="max-w-5xl mx-auto px-4 overflow-x-auto no-scrollbar">
          <nav className="flex gap-6 min-w-max">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as TabType)}
                className={`
                  flex items-center gap-2 py-4 text-sm font-medium border-b-2 transition-all
                  ${activeTab === tab.id 
                    ? 'border-primary text-primary' 
                    : 'border-transparent text-gray-500 hover:text-gray-800 hover:border-gray-300'
                  }
                `}
              >
                {tab.icon}
                {tab.label}
              </button>
            ))}
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 py-6">
        {activeTab === 'story1' && (
          <div className="animate-fade-in">
            <Task1_GrannyDoris />
          </div>
        )}

        {activeTab === 'story2' && (
          <div className="animate-fade-in">
            <Task2_Helicopter />
          </div>
        )}

        {activeTab === 'grammar' && (
          <div className="space-y-8 animate-fade-in">
            <Task3_GrammarNegative />
            <Task4_Questions />
          </div>
        )}

        {activeTab === 'vocab' && (
          <div className="space-y-8 animate-fade-in">
            <Task5_GapFill />
            <Task6_Matching />
          </div>
        )}

        {activeTab === 'communication' && (
          <div className="animate-fade-in">
            <Task7_Responses />
          </div>
        )}
      </main>

      <footer className="max-w-4xl mx-auto text-center text-gray-400 text-sm py-8 border-t border-gray-200 mt-8">
        <p>© Practice Material based on Project Explore 2. For educational purposes only.</p>
      </footer>
    </div>
  );
};

export default App;