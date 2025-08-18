
import React, { useState, useEffect } from 'react';
import { quizData } from '../constants/quizData';
import { POACode, QuizQuestion } from '../types';
import { CheckCircleIcon, XCircleIcon, ChevronLeftIcon, ChevronRightIcon, LightBulbIcon } from './Icons';

const Quiz: React.FC = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, POACode | null>>({});
  const [showExplanation, setShowExplanation] = useState<Record<number, boolean>>({});

  const currentQuestion: QuizQuestion = quizData[currentQuestionIndex];
  const selectedAnswer = selectedAnswers[currentQuestion.id] || null;
  const isAnswered = selectedAnswer !== null;

  const handleSelectAnswer = (option: POACode) => {
    if (!isAnswered) {
      setSelectedAnswers(prev => ({ ...prev, [currentQuestion.id]: option }));
      setShowExplanation(prev => ({ ...prev, [currentQuestion.id]: true }));
    }
  };

  const handleNext = () => {
    if (currentQuestionIndex < quizData.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    }
  };
  
  useEffect(() => {
    // Reset state if quizData changes (though it's constant here)
    setSelectedAnswers({});
    setShowExplanation({});
    setCurrentQuestionIndex(0);
  }, []);

  const getOptionClasses = (option: POACode) => {
    if (!isAnswered) {
      return 'bg-white hover:bg-indigo-100 text-slate-700 border-slate-300';
    }
    const isCorrect = option === currentQuestion.answer;
    const isSelected = option === selectedAnswer;

    if (isCorrect) {
      return 'bg-green-100 text-green-800 border-green-400 ring-2 ring-green-500';
    }
    if (isSelected && !isCorrect) {
      return 'bg-red-100 text-red-800 border-red-400 ring-2 ring-red-500';
    }
    return 'bg-slate-100 text-slate-500 border-slate-200 cursor-not-allowed';
  };
  
  const getDifficultyClass = (difficulty: string) => {
    switch(difficulty) {
        case '기초': return 'bg-blue-100 text-blue-800';
        case '중급': return 'bg-yellow-100 text-yellow-800';
        case '심화': return 'bg-red-100 text-red-800';
        default: return 'bg-gray-100 text-gray-800';
    }
  }


  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white p-6 sm:p-8 rounded-xl shadow-lg animate-fade-in-up">
        <div className="flex justify-between items-center mb-4">
            <span className={`px-3 py-1 text-sm font-semibold rounded-full ${getDifficultyClass(currentQuestion.difficulty)}`}>
                난이도: {currentQuestion.difficulty}
            </span>
            <span className="text-sm font-semibold text-slate-500">
                문제 {currentQuestionIndex + 1} / {quizData.length}
            </span>
        </div>
        
        {/* Patient Case */}
        <div className="mb-6 p-4 border border-slate-200 rounded-lg bg-slate-50">
            <h3 className="text-lg font-bold text-slate-800 mb-2">{currentQuestion.case.title}</h3>
            <p className="text-slate-600 leading-relaxed whitespace-pre-wrap">{currentQuestion.case.details}</p>
            <div className="mt-4 pt-3 border-t border-slate-200">
              <p className="text-sm text-slate-500">
                <strong>진단명:</strong> {currentQuestion.diagnoses.primary}
                {currentQuestion.diagnoses.secondary && `, ${currentQuestion.diagnoses.secondary}`}
              </p>
            </div>
        </div>

        {/* Question */}
        <h2 className="text-xl font-bold text-center mb-6 text-indigo-800">
          {currentQuestion.question}
        </h2>

        {/* Options */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 mb-6">
          {currentQuestion.options.map(option => (
            <button
              key={option}
              onClick={() => handleSelectAnswer(option)}
              disabled={isAnswered}
              className={`flex items-center justify-center p-4 rounded-lg border font-bold text-lg transition-all duration-200 ${getOptionClasses(option)}`}
            >
              {option}
              {isAnswered && option === currentQuestion.answer && <CheckCircleIcon className="w-5 h-5 ml-2" />}
              {isAnswered && selectedAnswer === option && option !== currentQuestion.answer && <XCircleIcon className="w-5 h-5 ml-2" />}
            </button>
          ))}
        </div>
        
        {/* Explanation */}
        {showExplanation[currentQuestion.id] && (
           <div className="p-4 mt-6 border rounded-lg animate-fade-in bg-slate-50 border-slate-200">
             <div className="flex items-start">
               <LightBulbIcon className="w-8 h-8 text-yellow-500 mr-3 flex-shrink-0" />
               <div>
                 <h4 className="font-bold text-lg mb-2 text-slate-800">해설</h4>
                 <p className="text-slate-600 mb-3 text-sm">{currentQuestion.explanation.general}</p>
                 <div className={`p-3 rounded-md ${selectedAnswer === currentQuestion.answer ? 'bg-green-100' : 'bg-red-100'}`}>
                   <p className="font-semibold text-base">
                     {selectedAnswer === currentQuestion.answer 
                       ? <span className="text-green-800">정답입니다!</span> 
                       : <span className="text-red-800">오답입니다. 정답은 '{currentQuestion.answer}' 입니다.</span>
                     }
                   </p>
                   <p className="mt-1 text-sm text-slate-700">{currentQuestion.explanation[selectedAnswer!]}</p>
                 </div>
               </div>
             </div>
           </div>
        )}

        {/* Navigation */}
        <div className="flex justify-between mt-8 pt-6 border-t border-slate-200">
          <button
            onClick={handlePrev}
            disabled={currentQuestionIndex === 0}
            className="flex items-center px-4 py-2 bg-slate-200 text-slate-700 rounded-lg hover:bg-slate-300 disabled:bg-slate-100 disabled:text-slate-400 disabled:cursor-not-allowed transition-colors"
          >
            <ChevronLeftIcon />
            이전
          </button>
          <button
            onClick={handleNext}
            disabled={currentQuestionIndex === quizData.length - 1}
            className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:bg-indigo-300 disabled:cursor-not-allowed transition-colors"
          >
            다음
            <ChevronRightIcon />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Quiz;
