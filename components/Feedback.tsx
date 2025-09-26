
import React, { useState } from 'react';
import { CheckCircleIcon, ArrowPathIcon } from './Icons';

type SubmissionStatus = 'idle' | 'loading' | 'success' | 'error';

interface FeedbackProps {
  employeeId: string;
}

const Feedback: React.FC<FeedbackProps> = ({ employeeId }) => {
    const [satisfaction, setSatisfaction] = useState<string>('');
    const [comment, setComment] = useState<string>('');
    const [status, setStatus] = useState<SubmissionStatus>('idle');
    const [error, setError] = useState<string>('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!satisfaction) {
            setError('만족도를 선택해주세요.');
            return;
        }
        setError('');
        setStatus('loading');

        // --- Google Form Details ---
        const formUrl = 'https://docs.google.com/forms/d/e/1FAIpQLSdhnok0BD_Mv5JCqQQ-XCmcaWMEpI1LbVwHm_RrcPeu98o_Vw/formResponse';
        const satisfactionField = 'entry.1328914577';
        const commentField = 'entry.2101381953';
        const employeeIdField = 'entry.904125217';

        const formData = new FormData();
        formData.append(satisfactionField, satisfaction);
        formData.append(commentField, comment);
        formData.append(employeeIdField, employeeId);

        try {
            await fetch(formUrl, {
                method: 'POST',
                body: formData,
                mode: 'no-cors' // CORS 오류를 방지하기 위해 필수
            });
            setStatus('success');
            // 성공 메시지를 보여준 후 3초 뒤에 양식을 초기화합니다.
            setTimeout(() => {
                setSatisfaction('');
                setComment('');
                setStatus('idle');
            }, 3000);
        } catch (err) {
            console.error('Feedback submission error:', err);
            setStatus('error');
            setError('의견 제출에 실패했습니다. 잠시 후 다시 시도해주세요.');
        }
    };

    if (status === 'success') {
        return (
            <div className="text-center p-8 animate-fade-in">
                <CheckCircleIcon className="w-16 h-16 mx-auto text-green-500" />
                <h2 className="mt-4 text-2xl font-bold text-slate-800">의견이 제출되었습니다!</h2>
                <p className="mt-2 text-slate-600">소중한 의견 감사합니다.</p>
            </div>
        );
    }

    return (
        <div className="max-w-2xl mx-auto animate-fade-in-up">
            <h2 className="text-2xl font-bold text-sky-800 mb-2">사용자 의견</h2>
            <p className="text-slate-600 mb-6">
                본 교육 자료를 개선하는 데 도움이 되는 소중한 의견을 남겨주세요.
            </p>
            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <label className="block text-base font-semibold text-slate-700 mb-3">
                        1. 본 자료가 PoA 개념 학습에 얼마나 도움이 되었나요??
                    </label>
                    <div className="flex justify-center space-x-2 sm:space-x-4">
                        {['1', '2', '3', '4', '5'].map((value) => (
                            <label key={value} className="cursor-pointer">
                                <input
                                    type="radio"
                                    name="satisfaction"
                                    value={value}
                                    checked={satisfaction === value}
                                    onChange={(e) => setSatisfaction(e.target.value)}
                                    className="sr-only"
                                    aria-label={`만족도 ${value}점`}
                                />
                                <div className={`w-12 h-12 sm:w-14 sm:h-14 rounded-full flex flex-col items-center justify-center border-2 transition-all ${
                                    satisfaction === value
                                        ? 'bg-blue-600 border-blue-600 text-white shadow-md'
                                        : 'bg-white border-slate-300 text-slate-600 hover:border-blue-500'
                                }`}>
                                    <span className="font-bold text-lg">{value}</span>
                                </div>
                            </label>
                        ))}
                    </div>
                    <div className="flex justify-between max-w-sm mx-auto mt-2 text-sm text-slate-500 px-2">
                        <span>도움이 되지 않음</span>
                        <span>매우 도움이 됨</span>
                    </div>
                </div>

                <div>
                    <label htmlFor="comment" className="block text-base font-semibold text-slate-700 mb-2">
                        2. 본 자료에 대한 추가 의견이나 개선점을 알려주세요. (선택)
                    </label>
                    <textarea
                        id="comment"
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        rows={5}
                        placeholder="예: 퀴즈 문제가 더 다양했으면 좋겠습니다."
                        className="w-full px-4 py-3 border border-slate-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out"
                    />
                </div>

                {error && <p className="text-red-600 text-sm text-center">{error}</p>}
                
                <div className="text-center pt-4">
                    <button
                        type="submit"
                        disabled={status === 'loading'}
                        className="w-full max-w-xs py-3 px-4 border border-transparent rounded-lg shadow-sm text-base font-semibold text-white bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-transform transform hover:scale-105 flex items-center justify-center mx-auto"
                    >
                        {status === 'loading' ? (
                            <>
                                <ArrowPathIcon className="w-5 h-5 mr-2 animate-spin" />
                                제출 중...
                            </>
                        ) : '의견 제출하기'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default Feedback;
