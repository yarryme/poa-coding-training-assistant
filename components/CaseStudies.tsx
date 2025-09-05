import React from 'react';

const CaseStudies: React.FC = () => {
    return (
        <section className="animate-fade-in">
            <h2 className="text-2xl font-bold mb-6 text-sky-800">코딩 사례 연구</h2>
            <div className="space-y-6">
                <div className="border border-gray-200 rounded-lg p-6">
                    <h3 className="text-xl font-semibold mb-2 text-slate-900">사례 1: T81.4 (후처치에 따른 출혈 및 혈종)</h3>
                    <div className="grid md:grid-cols-2 gap-4">
                        <div>
                            <p className="font-semibold text-slate-700">환자 정보:</p>
                            <p className="text-slate-600 mb-2">65세 여성, 만성 위궤양으로 내시경 수술 위해 입원</p>
                            <p className="font-semibold text-slate-700">경과:</p>
                            <p className="text-slate-600">수술은 성공적이었으나, 수술 후 회복실에서 하혈이 발생하여 입원 기간 연장</p>
                        </div>
                        <div className="bg-amber-50 p-4 rounded-md">
                            <p className="font-semibold text-slate-800">진단:</p>
                            <ul className="list-disc list-inside ml-2 text-slate-700">
                                <li>K25.9 상세불명의 위궤양 (<span className="font-bold text-green-600">Y</span>)</li>
                                <li>T81.4 후처치에 따른 출혈 및 혈종 (<span className="font-bold text-red-600">N</span>)</li>
                            </ul>
                            <p className="mt-2 font-semibold text-slate-800">POA 적용:</p>
                            <p className="text-sm text-slate-700">위궤양은 입원 시 존재했으므로 Y. 출혈은 입원 기간 중 <strong>수술 후 발생</strong>했으므로 원칙 4에 따라 <strong className="text-red-600">N</strong>을 부여합니다.</p>
                        </div>
                    </div>
                </div>
                <div className="border border-gray-200 rounded-lg p-6">
                    <h3 className="text-xl font-semibold mb-2 text-slate-900">사례 2: O82.1 (응급 제왕절개 분만)</h3>
                    <div className="grid md:grid-cols-2 gap-4">
                        <div>
                            <p className="font-semibold text-slate-700">환자 정보:</p>
                            <p className="text-slate-600 mb-2">임신 37주 임산부</p>
                            <p className="font-semibold text-slate-700">경과:</p>
                            <p className="text-slate-600">전신 근육통과 발열로 내원, 융모양막염 의심되어 응급 제왕절개 수술 시행</p>
                        </div>
                        <div className="bg-amber-50 p-4 rounded-md">
                            <p className="font-semibold text-slate-800">진단:</p>
                             <ul className="list-disc list-inside ml-2 text-slate-700">
                                <li>O82.1 응급 제왕절개 분만 (<span className="font-bold text-green-600">Y</span>)</li>
                             </ul>
                             <p className="mt-2 font-semibold text-slate-800">POA 적용:</p>
                            <p className="text-sm text-slate-700">응급 제왕절개는 입원 중 발생한 행위이지만, 이는 입원 시 존재했던 <strong>융모양막염 의심</strong>이라는 병태에 따른 것이므로 <strong className="text-green-600">Y</strong>를 부여합니다.</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default CaseStudies;
