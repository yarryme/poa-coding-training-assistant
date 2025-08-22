
import React, { useState } from 'react';
import LearningMaterial from './components/LearningMaterial';
import Quiz from './components/Quiz';
import { BookOpenIcon, PencilSquareIcon, CheckBadgeIcon } from './components/Icons';

type View = 'learn' | 'quiz';

const App: React.FC = () => {
  const [view, setView] = useState<View>('learn');

  const renderView = () => {
    switch (view) {
      case 'learn':
        return <LearningMaterial />;
      case 'quiz':
        return <Quiz />;
      default:
        return <LearningMaterial />;
    }
  };

  const NavButton = ({ activeView, targetView, icon, text }: { activeView: View, targetView: View, icon: React.ReactNode, text: string }) => (
    <button
      onClick={() => setView(targetView)}
      className={`flex items-center justify-center w-full sm:w-auto px-6 py-3 text-base font-semibold rounded-lg transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${
        activeView === targetView
          ? 'bg-indigo-600 text-white shadow-lg transform scale-105'
          : 'bg-white text-slate-700 hover:bg-slate-200'
      }`}
    >
      {icon}
      <span className="ml-3">{text}</span>
    </button>
  );

  return (
    <div className="min-h-screen bg-slate-100 font-sans text-slate-800">
      <header className="bg-white shadow-md">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col sm:flex-row justify-between items-center">
          <div className="flex items-center mb-4 sm:mb-0">
            <CheckBadgeIcon className="w-10 h-10 text-indigo-600" />
            <h1 className="ml-3 text-2xl font-bold text-slate-800 tracking-tight">
              PoA 분류 가이드
            </h1>
          </div>
          <nav className="flex w-full sm:w-auto space-x-2 sm:space-x-4">
            <NavButton activeView={view} targetView='learn' icon={<BookOpenIcon />} text="학습 자료" />
            <NavButton activeView={view} targetView='quiz' icon={<PencilSquareIcon />} text="실전 퀴즈" />
          </nav>
        </div>
      </header>
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {renderView()}
      </main>
      <footer className="text-center py-4 text-slate-500 text-sm">
        <p>
          본 자료는 "입원 시 상병 코딩지침 및 사례집 (2024. 12.)"을 기반으로 제작되었습니다.
        </p>
      </footer>
    </div>
  );
};

export default App;
