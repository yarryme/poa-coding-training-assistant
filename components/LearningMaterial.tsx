import React, { useState, useRef } from 'react';

const PoaCodeCard: React.FC<{
  code: string;
  title: string;
  description: string;
  bgClass: string;
  textClass: string;
  titleClass: string;
}> = ({ code, title, description, bgClass, textClass, titleClass }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      className={`cursor-pointer p-4 rounded-lg text-center transition-shadow hover:shadow-md ${bgClass}`}
      onClick={() => setIsOpen(!isOpen)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && setIsOpen(!isOpen)}
      aria-expanded={isOpen}
    >
      <h3 className={`font-bold text-2xl ${textClass}`}>{code}</h3>
      <p className={`font-semibold ${titleClass}`}>{title}</p>
      <p className={`poa-code-desc mt-2 text-sm ${textClass} ${isOpen ? '' : 'hidden'}`}>{description}</p>
    </div>
  );
};

const AccordionItem: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  const idSuffix = title.replace(/\s+/g, '-').toLowerCase();
  const contentId = `accordion-content-${idSuffix}`;
  const buttonId = `accordion-button-${idSuffix}`;

  return (
    <div className="border border-gray-200 rounded-lg">
      <button
        id={buttonId}
        className="w-full p-4 text-left font-semibold bg-gray-50 hover:bg-gray-100 flex justify-between items-center focus:outline-none focus:ring-2 focus:ring-sky-500 rounded-lg"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-controls={contentId}
      >
        {title}
        <span className={`transform transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} aria-hidden="true">▼</span>
      </button>
      <div
        id={contentId}
        ref={contentRef}
        role="region"
        aria-labelledby={buttonId}
        style={{ maxHeight: isOpen ? `${contentRef.current?.scrollHeight}px` : '0' }}
        className="overflow-hidden transition-all duration-300 ease-out"
      >
        <div className="bg-white">
          {children}
        </div>
      </div>
    </div>
  );
};

const LearningMaterial: React.FC = () => {
  return (
    <div className="animate-fade-in space-y-8">
      <div>
        <h2 className="text-2xl font-bold mb-4 text-sky-800">1. PoA 개념 및 목적</h2>
        <p className="text-base leading-relaxed bg-sky-50 p-4 rounded-lg text-slate-700">
          <strong>PoA(Present on Admission, 입원 시 상병)</strong>는 환자가 병원에 <strong className="text-sky-700">입원할 당시 이미 존재했던</strong> 질환이나 상태를 의미합니다. 질환이 진단된 시점이 아닌 <strong className="text-sky-700">발병 시점</strong>이 기준이며, 병원 내에서 발생한 상병(Hospital-Acquired Condition)과 구별하는 데 중요합니다. 정확한 PoA 분류는 환자 안전과 의료 질을 평가하는 데 필수적인 요소입니다.
        </p>
      </div>

      <div>
        <h2 className="text-2xl font-bold mb-4 text-sky-800">2. PoA 분류 코드</h2>
        <p className="mb-4 text-slate-700">각 카드를 클릭하여 설명을 확인하세요.</p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-lg mx-auto">
          <PoaCodeCard
            code="Y"
            title="Yes"
            description="입원 당시 존재한 상병"
            bgClass="bg-green-100"
            textClass="text-green-800"
            titleClass="text-green-700"
          />
          <PoaCodeCard
            code="N"
            title="No"
            description="입원 기간 중 발생한 상병"
            bgClass="bg-red-100"
            textClass="text-red-800"
            titleClass="text-red-700"
          />
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-bold mb-4 text-sky-800">3. PoA 코딩 원칙</h2>
        <div className="space-y-2">
          <AccordionItem title="일반 원칙">
            <ul className="list-disc list-inside p-4 text-gray-700">
                <li>모든 상병명에 부여합니다.</li>
                <li>의무기록을 근거로 부여합니다.</li>
                <li>진단 시점이 아닌, <strong>발생 시점</strong>을 기준으로 판단합니다.</li>
            </ul>
          </AccordionItem>
          <AccordionItem title="세부 원칙">
            <ol className="list-decimal list-inside p-4 text-gray-700 space-y-2">
                <li><strong>입원 시 또는 입원 이전</strong>에 진단받은 상병은 <strong className="text-green-700">'Y'</strong></li>
                <li>입원 중 진단되었더라도 입원 시 존재가 <strong>명확</strong>한 상병은 <strong className="text-green-700">'Y'</strong></li>
                <li>입원 중 진단된 <strong>만성질환</strong>은 입원 시 존재 여부가 확인되지 않아도 <strong className="text-green-700">'Y'</strong></li>
                <li><strong>입원 시 존재하지 않은</strong> 상병은 <strong className="text-red-700">'N'</strong> (예: 낙상, 약물 부작용, 수술 후 감염)</li>
                <li><strong>복합 상병</strong>은 한 부분이라도 입원 시 존재하지 않으면 <strong className="text-red-700">'N'</strong></li>
                <li><strong>감염원</strong>이 입원 후 밝혀졌더라도 입원 시 관련 증상/검사가 있었다면 <strong className="text-green-700">'Y'</strong></li>
                <li><strong>임신/출산 관련</strong> 상병은 분만 시점을 기준으로 판단하지 않습니다.</li>
                <li><strong>신생아</strong>의 출생 시 또는 자궁 내에서 발생한 병태는 <strong className="text-green-700">'Y'</strong></li>
            </ol>
          </AccordionItem>
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-bold mb-6 text-sky-800">4. 코딩 사례</h2>
        <div className="space-y-6">
            <div className="border border-gray-200 rounded-lg p-6">
                <h3 className="text-xl font-semibold mb-2 text-slate-900">Case 1: 달리 분류되지 않은 수술 상처의 파열(T81.3)</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                        <h4 className="font-semibold text-slate-700 mb-2">환자 정보</h4>
                        <p className="text-sm text-slate-600"><strong>- 성별/나이:</strong> 여/52세<br /><strong>- 입원일:</strong> 2025-07-15<br /><strong>- 주호소:</strong> 수술 부위 상처 파열</p>
                    </div>
                    <div>
                        <h4 className="font-semibold text-slate-700 mb-2">입원경과요약</h4>
                        <p className="text-sm text-slate-600">양쪽 무릎관절증으로 TKRA 수술 후 외래 추적 관찰 중 수술 부위 상처 파열이 의심되어 입원하여 상처 재건술을 시행 받음.</p>
                    </div>
                </div>
                <h4 className="font-semibold text-slate-700 mb-2">진단상병에 대한 PoA 분류</h4>
                <div className="overflow-x-auto mb-4">
                    <table className="w-full text-sm text-left border-collapse">
                        <thead className="bg-slate-200">
                            <tr>
                                <th className="p-2 border-b border-slate-300">진단구분</th>
                                <th className="p-2 border-b border-slate-300">진단코드</th>
                                <th className="p-2 border-b border-slate-300">진단명</th>
                                <th className="p-2 border-b border-slate-300 text-center">POA</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr><td className="p-2 border-b border-slate-200">주</td><td className="p-2 border-b border-slate-200">T81.3</td><td className="p-2 border-b border-slate-200">달리 분류되지 않은 수술 상처의 파열</td><td className="p-2 border-b border-slate-200 text-center font-bold text-green-600">Y</td></tr>
                            <tr><td className="p-2 border-b border-slate-200">부</td><td className="p-2 border-b border-slate-200">M17.0</td><td className="p-2 border-b border-slate-200">양쪽 원발성 무릎관절증</td><td className="p-2 border-b border-slate-200 text-center font-bold text-green-600">Y</td></tr>
                        </tbody>
                    </table>
                </div>
                <div className="bg-amber-50 p-3 rounded border border-amber-200 text-sm text-slate-700">
                    <p>‘<strong>M17.0</strong>’는 TKRA 수술의 원인이 된 기저질환으로 입원 시점에 당연히 존재하므로 <strong className="text-green-700">Y</strong>를 부여합니다.</p>
                    <p className="mt-2">‘<strong>T81.3</strong>’은 입원의 주된 원인이 된 상병입니다. 입원 전 외래에서 경과 관찰 중 확인되었으므로, <strong className="text-green-700">Y</strong>를 부여합니다.</p>
                    <p className="mt-3 p-2 bg-sky-100 border border-sky-300 rounded-md font-semibold text-sky-800">
                        ※ 'T81.3'은 수술 후 합병증을 나타내므로 수술 후 재원 중 발생하는 경우에는 'N'을 부여하나, 입원 전 외래에서 확인되었거나 타 병원에서 진단 후 전원된 경우에는 'Y'를 부여합니다.
                    </p>
                </div>
            </div>
            <div className="border border-gray-200 rounded-lg p-6">
                <h3 className="text-xl font-semibold mb-2 text-slate-900">Case 2: 달리 분류되지 않은 처치에 따른 감염(T81.4)</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                        <h4 className="font-semibold text-slate-700 mb-2">환자 정보</h4>
                        <p className="text-sm text-slate-600"><strong>- 성별/나이:</strong> 남/68세<br /><strong>- 입원일:</strong> 2025-09-01<br /><strong>- 주호소:</strong> nocturia</p>
                    </div>
                    <div>
                        <h4 className="font-semibold text-slate-700 mb-2">입원경과요약</h4>
                        <p className="text-sm text-slate-600">TURP 위해 입원. 수술 후 2일째부터 39℃ 이상 고열 지속되어 수술 후 감염(의증) 진단 하에 항생제 치료함.</p>
                    </div>
                </div>
                <h4 className="font-semibold text-slate-700 mb-2">진단상병에 대한 PoA 분류</h4>
                <div className="overflow-x-auto mb-4">
                    <table className="w-full text-sm text-left border-collapse">
                        <thead className="bg-slate-200">
                            <tr>
                                <th className="p-2 border-b border-slate-300">진단구분</th>
                                <th className="p-2 border-b border-slate-300">진단코드</th>
                                <th className="p-2 border-b border-slate-300">진단명</th>
                                <th className="p-2 border-b border-slate-300 text-center">POA</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr><td className="p-2 border-b border-slate-200">주</td><td className="p-2 border-b border-slate-200">N40.0</td><td className="p-2 border-b border-slate-200">합병증을 동반하지 않은 전립선증식증</td><td className="p-2 border-b border-slate-200 text-center font-bold text-green-600">Y</td></tr>
                            <tr><td className="p-2 border-b border-slate-200">부</td><td className="p-2 border-b border-slate-200">T81.4</td><td className="p-2 border-b border-slate-200">달리 분류되지 않은 처치에 따른 감염</td><td className="p-2 border-b border-slate-200 text-center font-bold text-red-600">N</td></tr>
                        </tbody>
                    </table>
                </div>
                <div className="bg-amber-50 p-3 rounded border border-amber-200 text-sm text-slate-700">
                    <p>‘<strong>N40.0</strong>’은 입원 이전부터 진단받고 치료 중이던 상병으로 입원의 주된 원인이므로 <strong>‘세부 원칙 1’</strong>에 근거하여 <strong className="text-green-700">Y</strong>를 부여합니다.</p>
                    <p className="mt-2">‘<strong>T81.4</strong>’는 입원 후 시행된 수술 이후에 발생한 합병증입니다. 수술 후 발열 기록을 통해 입원 시점에는 존재하지 않았음이 확인되므로 <strong>‘세부 원칙 4’</strong>에 근거하여 <strong className="text-red-700">N</strong>을 부여합니다.</p>
                </div>
            </div>
            <div className="border border-gray-200 rounded-lg p-6">
                <h3 className="text-xl font-semibold mb-2 text-slate-900">Case 3: 응급제왕절개에 의한 분만(O82.1)</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                        <h4 className="font-semibold text-slate-700 mb-2">환자 정보</h4>
                        <p className="text-sm text-slate-600"><strong>- 성별/나이:</strong> 여/35세<br /><strong>- 입원일:</strong> 2025-08-04<br /><strong>- 주호소:</strong> IUP 38+6 with labor</p>
                    </div>
                    <div>
                        <h4 className="font-semibold text-slate-700 mb-2">입원경과요약</h4>
                        <p className="text-sm text-slate-600">38주 6일 초산모로 진통 있어 입원하였음(입원초진 치료계획: NVD). NSVD 분만 시도 중 arrested descent & dilatition relater P position으로 응급
제왕절개술(2025-08-05) 시행 후 통증조절 및 상처소독 후 퇴원함.</p>
                    </div>
                </div>
                <h4 className="font-semibold text-slate-700 mb-2">진단상병에 대한 PoA 분류</h4>
                <div className="overflow-x-auto mb-4">
                    <table className="w-full text-sm text-left border-collapse">
                        <thead className="bg-slate-200">
                            <tr>
                                <th className="p-2 border-b border-slate-300">진단구분</th>
                                <th className="p-2 border-b border-slate-300">진단코드</th>
                                <th className="p-2 border-b border-slate-300">진단명</th>
                                <th className="p-2 border-b border-slate-300 text-center">POA</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr><td className="p-2 border-b border-slate-200">주</td><td className="p-2 border-b border-slate-200">O64.0</td><td className="p-2 border-b border-slate-200">태아머리의 불완전회전으로 인한 난산</td><td className="p-2 border-b border-slate-200 text-center font-bold text-red-600">N</td></tr>
                            <tr><td className="p-2 border-b border-slate-200">부</td><td className="p-2 border-b border-slate-200">O62.0</td><td className="p-2 border-b border-slate-200">원발성 부적절수축</td><td className="p-2 border-b border-slate-200 text-center font-bold text-red-600">N</td></tr>
                            <tr><td className="p-2 border-b border-slate-200">부</td><td className="p-2 border-b border-slate-200">O82.1</td><td className="p-2 border-b border-slate-200">응급제왕절개에 의한 분만</td><td className="p-2 border-b border-slate-200 text-center font-bold text-red-600">N</td></tr>
                        </tbody>
                    </table>
                </div>
                <div className="bg-amber-50 p-3 rounded border border-amber-200 text-sm text-slate-700">
                    <p>‘<strong>O64.0</strong>’, ‘<strong>O62.0</strong>’, ‘<strong>O82.1</strong>’은 진통으로 입원 후 자연분만 시도 중 발생한 상병입니다. 이는 입원 시점에는 존재하지 않았던 상황이므로 <strong>‘세부 원칙 4’</strong>에 근거하여 <strong className="text-red-700">N</strong>을 부여합니다.</p>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default LearningMaterial;