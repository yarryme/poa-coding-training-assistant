import React from 'react';

const InfoCard: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
  <div className="bg-white p-6 rounded-lg shadow-md mb-6">
    <h2 className="text-xl font-bold text-indigo-700 mb-4 border-b-2 border-indigo-200 pb-2">{title}</h2>
    {children}
  </div>
);

const CaseStudy: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
    <div className="bg-slate-50 p-6 rounded-lg shadow-inner mb-8 border border-slate-200">
        <h3 className="text-lg font-bold text-slate-800 mb-4">{title}</h3>
        {children}
    </div>
);


const LearningMaterial: React.FC = () => {
  return (
    <div className="animate-fade-in">
      <InfoCard title="1. PoA(Present on Admission) 정의 및 목적">
        <p className="text-slate-700 leading-relaxed">
          <strong>입원 시 상병(Present on Admission, PoA)</strong> 정보는 환자가 입원 당시에 가지고 있었던 질환 또는 상태를 구분하는 정보입니다. 입원기간 중 발생한 질환의 현황을 정확히 모니터링하여 환자안전 중심의 의료 질 평가로 전환하기 위한 필수 정보입니다.
        </p>
      </InfoCard>

      <InfoCard title="2. 입원 시 상병 구분코드">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr>
                <th className="border-b-2 border-slate-300 p-3 bg-slate-100 font-semibold text-slate-700">코드</th>
                <th className="border-b-2 border-slate-300 p-3 bg-slate-100 font-semibold text-slate-700">설명</th>
              </tr>
            </thead>
            <tbody>
              <tr className="hover:bg-slate-50">
                <td className="border-b border-slate-200 p-3 font-mono font-bold text-green-600">Y(Yes)</td>
                <td className="border-b border-slate-200 p-3">해당 상병이 입원 당시에 존재함</td>
              </tr>
              <tr className="hover:bg-slate-50">
                <td className="border-b border-slate-200 p-3 font-mono font-bold text-red-600">N(No)</td>
                <td className="border-b border-slate-200 p-3">해당 상병이 입원 당시에 존재하지 않음 (입원 중 발생)</td>
              </tr>
              <tr className="hover:bg-slate-50">
                <td className="border-b border-slate-200 p-3 font-mono font-bold text-yellow-600">U(Unknown)</td>
                <td className="border-b border-slate-200 p-3">입원 시 존재 여부를 결정할 수 있는 기록이 불충분함</td>
              </tr>
              <tr className="hover:bg-slate-50">
                <td className="border-b border-slate-200 p-3 font-mono font-bold text-purple-600">W(Clinically Undetermined)</td>
                <td className="border-b border-slate-200 p-3">의료제공자가 임상적으로 입원 시 존재 여부를 결정할 수 없음</td>
              </tr>
               <tr className="hover:bg-slate-50">
                <td className="border-b border-slate-200 p-3 font-mono font-bold text-slate-500">E(Exempt)</td>
                <td className="border-b border-slate-200 p-3">예외상병</td>
              </tr>
            </tbody>
          </table>
        </div>
      </InfoCard>

      <InfoCard title="3. 입원 시 상병 코딩 핵심 원칙">
        <h3 className="text-lg font-semibold text-slate-800 mb-2">일반 원칙</h3>
        <ul className="list-disc list-inside space-y-2 mb-6 text-slate-700">
          <li>모든 상병명(상병분류기호)에 부여해야 합니다.</li>
          <li>의무기록지에 기록된 자료를 근거로 작성해야 합니다.</li>
          <li>해당 상병이 진단된 시점이 아닌 <strong>발생 시점</strong>을 기준으로 작성해야 합니다.</li>
        </ul>
        <h3 className="text-lg font-semibold text-slate-800 mb-2">세부 원칙</h3>
        <ol className="list-decimal list-inside space-y-3 text-slate-700">
            <li>
                입원 시점 또는 이전에 진단된 상병(외래/응급실 포함): ‘<strong className="text-green-700">Y</strong>’
            </li>
            <li>
                입원 중 진단되었으나, 입원 당시 관련 증상/징후가 있었던 경우: ‘<strong className="text-green-700">Y</strong>’
                <p className="ml-6 mt-1 text-sm text-slate-600">＊ 의무기록에 '의심', '배제' 등으로 기록된 경우도 포함</p>
            </li>
            <li>
                입원 중 진단된 만성질환: ‘<strong className="text-green-700">Y</strong>’
            </li>
            <li>
                입원 후에 새롭게 발생한 상병: ‘<strong className="text-red-700">N</strong>’
            </li>
            <li>
                기록이 불충분하여 입원 시 존재 여부 판단이 불가능한 경우: ‘<strong className="text-yellow-700">U</strong>’
                <p className="ml-6 mt-1 text-sm text-slate-600">＊ 의사 확인이 필요하며, 매우 제한적으로 사용</p>
            </li>
            <li>
                의사가 의무기록에 '임상적으로 판단 불가'라고 명시한 경우: ‘<strong className="text-purple-700">W</strong>’
            </li>
            <li>
                복합 상병(예: 만성질환의 급성악화)은 모든 요소가 입원 시 존재해야 ‘<strong className="text-green-700">Y</strong>’, 하나라도 아니면 ‘<strong className="text-red-700">N</strong>’
            </li>
            <li>
                감염증: 입원 시 관련 증상이나 검사가 있었다면 ‘<strong className="text-green-700">Y</strong>’ (원인균은 나중에 확진되어도 무관)
            </li>
            <li>
                산과 상병: 분만 여부와 무관하며, 해당 합병증이 입원 시 존재했다면 ‘<strong className="text-green-700">Y</strong>’, 아니면 ‘<strong className="text-red-700">N</strong>’
            </li>
            <li>
                신생아 상병: 출생 시점에 존재한 모든 상태는 ‘<strong className="text-green-700">Y</strong>’ (자궁 내, 분만 중 발생 포함)
            </li>
            <li>
                PoA 예외코드 목록에 해당하는 상병: ‘<strong className="text-slate-600">E</strong>’
            </li>
        </ol>
      </InfoCard>

      <InfoCard title="4. 입원 시 상병 코딩 사례">
        <CaseStudy title="사례 1: 응급 제왕절개술 분만">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                    <h4 className="font-semibold text-slate-700 mb-2">환자 정보</h4>
                    <p className="text-sm text-slate-600"><strong>성별/나이:</strong> 여/35세<br /><strong>입원일:</strong> 20.8.4.<br /><strong>주호소:</strong> IUP 38+6 with labor</p>
                </div>
                <div>
                    <h4 className="font-semibold text-slate-700 mb-2">입원경과요약</h4>
                    <p className="text-sm text-slate-600">38주 6일 초산모로 진통 있어 입원, 자연분만 시도 중 태아 하강 및 자궁경부 개대 정지 소견 보여 응급 제왕절개술 시행함.</p>
                </div>
            </div>
            <h4 className="font-semibold text-slate-700 mb-2">진단상병에 대한 PoA 적용 결과</h4>
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
                        <tr><td className="p-2 border-b border-slate-200">부</td><td className="p-2 border-b border-slate-200">Z35.5</td><td className="p-2 border-b border-slate-200">고령 초임녀 임신의 관리</td><td className="p-2 border-b border-slate-200 text-center font-bold text-slate-500">E</td></tr>
                        <tr><td className="p-2 border-b border-slate-200">부</td><td className="p-2 border-b border-slate-200">Z37.02</td><td className="p-2 border-b border-slate-200">단일생아, 임신 37주 이상</td><td className="p-2 border-b border-slate-200 text-center font-bold text-slate-500">E</td></tr>
                    </tbody>
                </table>
            </div>
            <div className="bg-white p-3 rounded border border-slate-200 text-sm">
                <p>‘<strong>O64.0</strong>’, ‘<strong>O62.0</strong>’, ‘<strong>O82.1</strong>’은 진통으로 입원 후 자연분만 시도 중 발생하거나 진단된 상병입니다. 이는 입원 시점에는 존재하지 않았던 상황이므로 <strong>‘세부 원칙 4’</strong>에 근거하여 <strong className="text-red-700">N</strong>을 부여합니다.</p>
                <p className="mt-2">‘<strong>Z35.5</strong>’, ‘<strong>Z37.02</strong>’는 환자의 상태를 설명하지만 질병이나 손상이 아니며, PoA 예외 코드 목록에 해당하므로 <strong>‘세부 원칙 11’</strong>에 근거하여 <strong className="text-slate-600">E</strong>를 부여합니다.</p>
            </div>
        </CaseStudy>

        <CaseStudy title="사례 2: 달리 분류되지 않은 처치에 따른 감염">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                    <h4 className="font-semibold text-slate-700 mb-2">환자 정보</h4>
                    <p className="text-sm text-slate-600"><strong>성별/나이:</strong> 남/68세<br /><strong>입원사유:</strong> 전립선 증식증 수술</p>
                </div>
                <div>
                    <h4 className="font-semibold text-slate-700 mb-2">입원경과요약</h4>
                    <p className="text-sm text-slate-600">전립선 증식증 수술을 위해 입원. 수술 후 2일째부터 39℃ 이상 고열 지속되어 수술 후 감염(의증) 진단 하에 항생제 치료함.</p>
                </div>
            </div>
            <h4 className="font-semibold text-slate-700 mb-2">진단상병에 대한 PoA 적용 결과</h4>
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
                        <tr><td className="p-2 border-b border-slate-200">주</td><td className="p-2 border-b border-slate-200">N40.0</td><td className="p-2 border-b border-slate-200">전립선 증식증</td><td className="p-2 border-b border-slate-200 text-center font-bold text-green-600">Y</td></tr>
                        <tr><td className="p-2 border-b border-slate-200">부</td><td className="p-2 border-b border-slate-200">T81.4</td><td className="p-2 border-b border-slate-200">달리 분류되지 않은 처치에 따른 감염</td><td className="p-2 border-b border-slate-200 text-center font-bold text-red-600">N</td></tr>
                        <tr><td className="p-2 border-b border-slate-200">부</td><td className="p-2 border-b border-slate-200">Y83.6</td><td className="p-2 border-b border-slate-200">기타 기관의 절제</td><td className="p-2 border-b border-slate-200 text-center font-bold text-slate-500">E</td></tr>
                    </tbody>
                </table>
            </div>
            <div className="bg-white p-3 rounded border border-slate-200 text-sm">
                <p>‘<strong>N40.0</strong>’은 입원 이전부터 진단받고 치료 중이던 상병으로 입원의 주된 원인이므로 <strong>‘세부 원칙 1’</strong>에 근거하여 <strong className="text-green-700">Y</strong>를 부여합니다.</p>
                <p className="mt-2">‘<strong>T81.4</strong>’는 입원 후 시행된 수술 이후에 발생한 합병증입니다. 수술 후 발열 기록을 통해 입원 시점에는 존재하지 않았음이 확인되므로 <strong>‘세부 원칙 4’</strong>에 근거하여 <strong className="text-red-700">N</strong>을 부여합니다.</p>
                <p className="mt-2">‘<strong>Y83.6</strong>’은 환자의 질병이 아닌 시행된 처치를 설명하는 코드로, PoA 예외 코드 목록에 해당하므로 <strong>‘세부 원칙 11’</strong>에 근거하여 <strong className="text-slate-600">E</strong>를 부여합니다.</p>
            </div>
        </CaseStudy>
      </InfoCard>

    </div>
  );
};

export default LearningMaterial;
