import React, { useState } from 'react';
import LearningMaterial from './components/LearningMaterial';
import Quiz from './components/Quiz';
import LoginScreen from './components/LoginScreen';
import { BookOpenIcon, PencilSquareIcon, CheckBadgeIcon } from './components/Icons';

// Add type definition for gtag to the global window object
declare global {
  interface Window {
    gtag?: (command: 'event', action: string, params: { [key: string]: any }) => void;
  }
}

type View = 'learn' | 'quiz';

// Watermark Component
// This component displays a fixed, semi-transparent watermark centered on the screen.
// It is designed to be unobtrusive and not interfere with user interactions.
const Watermark: React.FC = () => {
  const watermarkStyle: React.CSSProperties = {
    position: 'fixed',
    top: '50%',
    left: '50%',
    // Center the element and rotate it
    transform: 'translate(-50%, -50%) rotate(-30deg)',
    // Subtle color to not obstruct content
    color: 'rgba(0, 0, 0, 0.05)',
    // Responsive font size
    fontSize: 'clamp(6rem, 15vw, 12rem)',
    fontWeight: 'bold',
    // Allow clicks to pass through to the content underneath
    pointerEvents: 'none',
    // Prevent the watermark text from being selected
    userSelect: 'none',
    // Ensure it's on top of other content
    zIndex: 1000,
    // Prevent text from wrapping
    whiteSpace: 'nowrap',
  };

  return (
    <div style={watermarkStyle} aria-hidden="true">
      서울대학교병원
    </div>
  );
};

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [view, setView] = useState<View>('learn');

  const handleLogin = (employeeId: string) => {
    const scriptUrl = 'https://script.google.com/macros/s/AKfycbwxqJVAlOJ95tIUMLKhmfsJQYIk-FRDzbBGQG2PspN5HJ28tnGQMmAfqJuBbRR91a61KA/exec';

    const formData = new FormData();
    formData.append('employeeId', employeeId);
    formData.append('timestamp', new Date().toISOString());

    // Fire-and-forget POST request
    fetch(scriptUrl, {
      method: 'POST',
      body: formData,
      mode: 'no-cors',
    }).catch(error => {
      // Log errors for debugging but don't block the user
      console.error('Error submitting employee ID:', error);
    });

    setIsAuthenticated(true);
  };


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

  const NavButton = ({ activeView, targetView, icon, text }: { activeView: View, targetView: View, icon: React.ReactNode, text: string }) => {
    const handleClick = () => {
      setView(targetView);
      if (targetView === 'quiz' && typeof window.gtag === 'function') {
        window.gtag('event', 'select_content', {
          content_type: 'tab_navigation',
          item_id: 'quiz'
        });
      }
    };

    return (
      <button
        onClick={handleClick}
        className={`flex items-center justify-center w-full sm:w-auto px-6 py-3 text-base font-semibold rounded-lg transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
          activeView === targetView
            ? 'bg-blue-600 text-white shadow-lg transform scale-105'
            : 'bg-white text-slate-700 hover:bg-slate-200'
        }`}
      >
        {icon}
        <span className="ml-3">{text}</span>
      </button>
    );
  };

  if (!isAuthenticated) {
    return <LoginScreen onLogin={handleLogin} />;
  }

  return (
    <div className="min-h-screen bg-white font-sans text-slate-800">
      <Watermark />
      <header className="bg-white shadow-md">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col sm:flex-row justify-between items-center">
          <div className="flex items-center mb-4 sm:mb-0">
            <CheckBadgeIcon className="w-10 h-10 text-blue-600" />
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
        <div className="bg-white rounded-2xl shadow-lg p-6">
          {renderView()}
        </div>
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