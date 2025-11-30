import React, { useState, useEffect } from 'react';
import { GoogleGenAI, Type } from "@google/genai";
import { Sparkles, Trophy, Brain, Award, Loader2 } from 'lucide-react';
import { MistakeItem } from '../types';

interface AICoachProps {
  taskName: string;
  mistakes: MistakeItem[];
  score: number;
  total: number;
}

interface AIResponse {
  badgeName: string;
  badgeEmoji: string;
  xpEarned: number;
  feedbackTitle: string;
  feedbackMessage: string;
  keyTip: string;
}

export const AICoach: React.FC<AICoachProps> = ({ taskName, mistakes, score, total }) => {
  const [response, setResponse] = useState<AIResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Trigger AI analysis when component mounts or props change
  useEffect(() => {
    // Reset state when props change significantly
    setResponse(null);
    setError(null);
  }, [taskName, score, total]);

  const getAIFeedback = async () => {
    setLoading(true);
    setError(null);

    try {
      if (!process.env.API_KEY) {
        throw new Error("API Key not found");
      }

      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      
      const isPerfect = mistakes.length === 0;
      const promptContext = isPerfect 
        ? "The student got a perfect score! Celebrate their achievement." 
        : `The student made ${mistakes.length} mistakes. Here they are: ${JSON.stringify(mistakes)}.`;

      const resp = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: `
          Task: ${taskName}
          Score: ${score}/${total}
          Context: ${promptContext}
          
          Generate a gamified feedback response for an ESL student (A2 level). 
          Include a creative 'Badge' name, an Emoji for the badge, a hypothetical 'XP' amount (100-500), 
          a short encouraging feedback message, and one specific grammar/vocab tip if there were mistakes.
        `,
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              badgeName: { type: Type.STRING },
              badgeEmoji: { type: Type.STRING },
              xpEarned: { type: Type.INTEGER },
              feedbackTitle: { type: Type.STRING },
              feedbackMessage: { type: Type.STRING },
              keyTip: { type: Type.STRING },
            },
            required: ["badgeName", "badgeEmoji", "xpEarned", "feedbackTitle", "feedbackMessage", "keyTip"]
          }
        }
      });

      if (resp.text) {
        setResponse(JSON.parse(resp.text));
      }
    } catch (err) {
      console.error(err);
      setError("AI Coach is taking a nap. Try again later!");
    } finally {
      setLoading(false);
    }
  };

  if (!response && !loading && !error) {
    return (
      <button 
        onClick={getAIFeedback}
        className="w-full mt-6 bg-gradient-to-r from-violet-600 to-indigo-600 text-white p-4 rounded-xl shadow-lg flex items-center justify-center gap-3 hover:from-violet-700 hover:to-indigo-700 transition-all transform hover:scale-[1.01]"
      >
        <Sparkles className="animate-pulse" />
        <span className="font-bold text-lg">Analyze with AI Coach & Claim XP</span>
      </button>
    );
  }

  return (
    <div className="mt-6 animate-fade-in">
      {loading && (
        <div className="bg-white p-8 rounded-xl border border-indigo-100 shadow-lg text-center flex flex-col items-center justify-center gap-4">
          <Loader2 className="animate-spin text-indigo-500" size={32} />
          <p className="text-gray-500 font-medium">Consulting the English Wizard...</p>
        </div>
      )}

      {error && (
        <div className="bg-red-50 p-4 rounded-xl text-red-600 border border-red-100 text-center">
          {error}
        </div>
      )}

      {response && (
        <div className="bg-white rounded-xl overflow-hidden shadow-xl border-2 border-indigo-100">
          {/* Header / Badge Section */}
          <div className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 p-6 text-white text-center relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full bg-white opacity-10 blur-xl transform -skew-y-12 scale-150"></div>
            
            <div className="relative z-10">
              <div className="text-6xl mb-2 filter drop-shadow-md">{response.badgeEmoji}</div>
              <h3 className="text-2xl font-extrabold uppercase tracking-wider mb-1 text-transparent bg-clip-text bg-gradient-to-b from-white to-indigo-100 drop-shadow-sm">
                {response.badgeName}
              </h3>
              <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-1 rounded-full text-sm font-bold border border-white/30">
                <Trophy size={14} className="text-yellow-300" />
                +{response.xpEarned} XP Earned
              </div>
            </div>
          </div>

          {/* Feedback Content */}
          <div className="p-6">
            <h4 className="text-xl font-bold text-gray-800 mb-2 flex items-center gap-2">
              <Award className="text-indigo-500" />
              {response.feedbackTitle}
            </h4>
            <p className="text-gray-600 leading-relaxed mb-4">
              {response.feedbackMessage}
            </p>

            {mistakes.length > 0 && (
              <div className="bg-amber-50 rounded-lg p-4 border border-amber-100 flex gap-3 items-start">
                <Brain className="text-amber-600 shrink-0 mt-1" size={20} />
                <div>
                  <h5 className="font-bold text-amber-800 text-sm uppercase tracking-wide mb-1">Coach's Secret Tip</h5>
                  <p className="text-amber-900 text-sm font-medium italic">"{response.keyTip}"</p>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};