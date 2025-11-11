import { ArrowLeft, BookOpen } from 'lucide-react';
import { Experiment } from '../lib/supabase';
import { IndicatorSimulation } from './simulations/IndicatorSimulation';
import { TitrationSimulation } from './simulations/TitrationSimulation';
import { FlameSimulation } from './simulations/FlameSimulation';
import { ElectrolysisSimulation } from './simulations/ElectrolysisSimulation';

interface ExperimentDetailProps {
  experiment: Experiment;
  onBack: () => void;
}

export function ExperimentDetail({ experiment, onBack }: ExperimentDetailProps) {
  const renderSimulation = () => {
    switch (experiment.experiment_type) {
      case 'indicator':
        return <IndicatorSimulation />;
      case 'titration':
        return <TitrationSimulation />;
      case 'flame':
        return <FlameSimulation />;
      case 'electrolysis':
        return <ElectrolysisSimulation />;
      default:
        return <div className="text-center text-gray-500">シミュレーションが見つかりません</div>;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      <div className="container mx-auto px-4 py-8">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-blue-600 hover:text-blue-700 mb-6 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="font-medium">実験一覧に戻る</span>
        </button>

        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="p-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-4">
              {experiment.title}
            </h1>

            <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6">
              <div className="flex items-start">
                <BookOpen className="w-5 h-5 text-blue-600 mr-3 mt-0.5 flex-shrink-0" />
                <div>
                  <h2 className="font-semibold text-gray-800 mb-2">実験の解説</h2>
                  <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                    {experiment.full_description}
                  </p>
                </div>
              </div>
            </div>

            <div className="border-t pt-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                インタラクティブシミュレーション
              </h2>
              <div className="bg-gray-50 rounded-lg p-6">
                {renderSimulation()}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
