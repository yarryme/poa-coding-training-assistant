import React, { useState } from 'react';
import { CheckBadgeIcon } from './Icons';

interface LoginScreenProps {
  onLogin: (employeeId: string) => void;
}

const LoginScreen: React.FC<LoginScreenProps> = ({ onLogin }) => {
  const [employeeId, setEmployeeId] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (employeeId.trim()) {
      onLogin(employeeId.trim());
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col justify-center items-center p-4">
       <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-2xl p-8 animate-fade-in-up">
            <div className="flex flex-col items-center mb-6">
                <CheckBadgeIcon className="w-16 h-16 text-blue-600" />
                <h1 className="mt-4 text-3xl font-bold text-slate-800 tracking-tight text-center">
                    PoA 분류 가이드
                </h1>
                <p className="mt-2 text-slate-500 text-center">
                    서울대학교병원 교육자료
                </p>
            </div>
          
            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <label htmlFor="employeeId" className="block text-sm font-medium text-slate-700 mb-1">
                        사번을 입력해주세요
                    </label>
                    <input
                        id="employeeId"
                        type="text"
                        value={employeeId}
                        onChange={(e) => setEmployeeId(e.target.value)}
                        placeholder="예: 123456"
                        required
                        className="w-full px-4 py-3 border border-slate-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out"
                        aria-label="사번 입력"
                    />
                </div>
                
                <button
                    type="submit"
                    disabled={!employeeId.trim()}
                    className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-base font-semibold text-white bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-transform transform hover:scale-105"
                >
                    학습 시작하기
                </button>
            </form>
        </div>
        <footer className="text-center py-6 text-slate-500 text-sm">
            <p>
            본 자료는 "입원 시 상병 코딩지침 및 사례집 (2024. 12.)"을 기반으로 제작되었습니다.
            </p>
        </footer>
       </div>
    </div>
  );
};

export default LoginScreen;
