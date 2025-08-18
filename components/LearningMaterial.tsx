
import React from 'react';

const InfoCard: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
  <div className="bg-white p-6 rounded-lg shadow-md mb-6">
    <h2 className="text-xl font-bold text-indigo-700 mb-4 border-b-2 border-indigo-200 pb-2">{title}</h2>
    {children}
  </div>
);

const LearningMaterial: React.FC = () => {
  return (
    <div className="animate-fade-in">
      <InfoCard title="1. POA(Present On Admission) 정의 및 목적">
        <p className="text-slate-700 leading-relaxed">
          <strong>입원 시 상병(Present on Admission, POA)</strong> 정보는 환자가 입원 당시에 가지고 있었던 질환 또는 상태를 구분하는 정보입니다. 입원기간 중 발생한 질환의 현황을 정확히 모니터링하여 환자안전 중심의 의료 질 평가로 전환하기 위한 필수 정보입니다.
        </p>
      </InfoCard>

      <InfoCard title="2. POA 구분코드 정의">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr>
                <th className="border-b-2 border-slate-300 p-3 bg-slate-100 font-semibold text-slate-700">코드</th>
                <th className="border-b-2 border-slate-300 p-3 bg-slate-100 font-semibold text-slate-700">명칭 (의미)</th>
                <th className="border-b-2 border-slate-300 p-3 bg-slate-100 font-semibold text-slate-700">설명</th>
              </tr>
            </thead>
            <tbody>
              <tr className="hover:bg-slate-50">
                <td className="border-b border-slate-200 p-3 font-mono font-bold text-green-600">Y</td>
                <td className="border-b border-slate-200 p-3 font-semibold">Yes</td>
                <td className="border-b border-slate-200 p-3">해당 상병이 입원 당시에 존재함</td>
              </tr>
              <tr className="hover:bg-slate-50">
                <td className="border-b border-slate-200 p-3 font-mono font-bold text-red-600">N</td>
                <td className="border-b border-slate-200 p-3 font-semibold">No</td>
                <td className="border-b border-slate-200 p-3">해당 상병이 입원 당시에 존재하지 않음 (입원 후 발생)</td>
              </tr>
              <tr className="hover:bg-slate-50">
                <td className="border-b border-slate-200 p-3 font-mono font-bold text-yellow-600">U</td>
                <td className="border-b border-slate-200 p-3 font-semibold">Unknown</td>
                <td className="border-b border-slate-200 p-3">입원 시 존재 여부를 결정할 수 있는 기록이 불충분함</td>
              </tr>
              <tr className="hover:bg-slate-50">
                <td className="border-b border-slate-200 p-3 font-mono font-bold text-purple-600">W</td>
                <td className="border-b border-slate-200 p-3 font-semibold">Clinically Undetermined</td>
                <td className="border-b border-slate-200 p-3">의료제공자가 임상적으로 입원 시 존재 여부를 결정할 수 없음</td>
              </tr>
               <tr className="hover:bg-slate-50">
                <td className="border-b border-slate-200 p-3 font-mono font-bold text-slate-500">E</td>
                <td className="border-b border-slate-200 p-3 font-semibold">Exempt</td>
                <td className="border-b border-slate-200 p-3">POA 보고에서 제외되는 예외상병</td>
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
          <li>해당 상병이 <strong>진단된 시점</strong>이 아닌 <strong>발생 시점</strong>을 기준으로 작성해야 합니다.</li>
        </ul>
        <h3 className="text-lg font-semibold text-slate-800 mb-2">세부 원칙 및 주요 사례</h3>
        <ul className="list-disc list-inside space-y-3 text-slate-700">
            <li><strong className="text-green-700">[Y]</strong> 입원 전 외래/응급실에서 진단되었거나, 입원 당시 명확한 증상/징후가 있었던 경우. (예: 폐렴 증상으로 입원, 만성 고혈압)</li>
            <li><strong className="text-red-700">[N]</strong> 입원 후 발생한 모든 새로운 상병. (예: 수술 후 감염, 입원 중 낙상, 약물 부작용)</li>
            <li>복합 상병(예: 출혈을 동반한 위궤양)에서 한 가지라도 입원 후 발생했다면 <strong className="text-red-700">[N]</strong>으로 코딩합니다. (예: 입원 후 출혈 시작)</li>
            <li>감염 질환은 입원 시 감염 증상이 있었다면, 원인균이 나중에 밝혀져도 <strong className="text-green-700">[Y]</strong>로 코딩합니다.</li>
            <li>의사가 의무기록에 '임상적으로 판단 불가'라고 명시한 경우 <strong className="text-purple-700">[W]</strong>를 사용합니다.</li>
        </ul>
      </InfoCard>
    </div>
  );
};

export default LearningMaterial;
