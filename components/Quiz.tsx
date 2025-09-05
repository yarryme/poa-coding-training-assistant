import React, { useState, useEffect } from 'react';
import { quizData } from '../constants/quizData';
import { POACode, QuizQuestion } from '../types';
import { CheckCircleIcon, XCircleIcon, ChevronLeftIcon, ChevronRightIcon, LightBulbIcon, ArrowPathIcon, CheckBadgeIcon } from './Icons';

const ResultsScreen = ({ score, total, onRetry }: { score: number; total: number; onRetry: () => void; }) => {
  const percentage = total > 0 ? Math.round((score / total) * 100) : 0;

  const getFeedback = () => {
    if (percentage >= 90) {
      return {
        message: "훌륭합니다! POA 코딩 전문가시네요.",
        color: "text-green-600",
        icon: <CheckBadgeIcon className="w-16 h-16 mx-auto text-green-500" />
      };
    }
    if (percentage >= 70) {
      return {
        message: "잘하셨습니다! 조금만 더 학습하면 완벽해질 거예요.",
        color: "text-blue-600",
        icon: <CheckBadgeIcon className="w-16 h-16 mx-auto text-blue-500" />
      };
    }
    if (percentage >= 50) {
      return {
        message: "좋은 시도입니다! 학습 자료를 다시 살펴보세요.",
        color: "text-yellow-600",
        icon: <LightBulbIcon className="w-16 h-16 mx-auto text-yellow-500" />
      };
    }
    return {
      message: "연습이 더 필요해요. 포기하지 마세요!",
      color: "text-red-600",
      icon: <ArrowPathIcon className="w-16 h-16 mx-auto text-red-500" />
    };
  };

  const feedback = getFeedback();

  return (
    <div className="max-w-4xl mx-auto animate-fade-in">
      <div className="bg-white p-8 rounded-xl shadow-lg text-center">
        <h2 className="text-3xl font-bold text-indigo-800 mb-4">퀴즈 결과</h2>
        
        <div className="my-8">
          {feedback.icon}
        </div>

        <p className="text-lg text-slate-600 mb-2">총 {total}문제 중</p>
        <p className="text-6xl font-bold text-indigo-600 mb-4">{score}문제</p>
        <p className="text-2xl font-semibold text-slate-700 mb-6">정답!</p>
        
        <div className="w-full bg-slate-200 rounded-full h-4 mb-4">
            <div className="bg-indigo-500 h-4 rounded-full transition-all duration-1000 ease-out" style={{ width: `${percentage}%` }}></div>
        </div>
        <p className="text-slate-600 font-bold text-xl mb-6">{percentage}%</p>
        
        <p className={`mt-6 text-xl font-semibold ${feedback.color}`}>{feedback.message}</p>
        
        <button
          onClick={onRetry}
          className="mt-10 flex items-center justify-center w-full sm:w-auto mx-auto px-8 py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-transform transform hover:scale-105"
        >
          <ArrowPathIcon className="w-5 h-5 mr-2" />
          퀴즈 다시 풀기
        </button>
      </div>
    </div>
  );
};


const Quiz: React.FC = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, POACode | null>>({});
  const [showExplanation, setShowExplanation] = useState<Record<number, boolean>>({});
  const [quizCompleted, setQuizCompleted] = useState(false);

  const resetQuiz = () => {
    setCurrentQuestionIndex(0);
    setSelectedAnswers({});
    setShowExplanation({});
    setQuizCompleted(false);
  };

  useEffect(() => {
    resetQuiz();
  }, []);

  if (quizCompleted) {
    const score = quizData.reduce((acc, question) => {
      if (selectedAnswers[question.id] === question.answer) {
        return acc + 1;
      }
      return acc;
    }, 0);
    
    return <ResultsScreen score={score} total={quizData.length} onRetry={resetQuiz} />;
  }

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


  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white p-6 sm:p-8 rounded-xl shadow-lg animate-fade-in-up">
        <div className="flex justify-end items-center mb-4">
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
        <div className="grid grid-cols-2 gap-4 max-w-xs mx-auto mb-6">
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
          {currentQuestionIndex === quizData.length - 1 ? (
            <button
              onClick={() => setQuizCompleted(true)}
              disabled={!isAnswered}
              className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 disabled:bg-green-300 disabled:cursor-not-allowed transition-colors"
            >
              결과보기
            </button>
          ) : (
            <button
              onClick={handleNext}
              className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:bg-indigo-300 disabled:cursor-not-allowed transition-colors"
            >
              다음
              <ChevronRightIcon />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Quiz;