import { useState } from 'react';
import { Droplet } from 'lucide-react';

type Solution = {
  name: string;
  ph: number;
  color: string;
};

const solutions: Solution[] = [
  { name: '塩酸', ph: 1, color: 'bg-red-100' },
  { name: '酢酸', ph: 3, color: 'bg-orange-100' },
  { name: '水', ph: 7, color: 'bg-gray-100' },
  { name: '石鹸水', ph: 10, color: 'bg-blue-100' },
  { name: '水酸化ナトリウム', ph: 14, color: 'bg-purple-100' },
];

export function IndicatorSimulation() {
  const [selectedSolution, setSelectedSolution] = useState<Solution | null>(null);
  const [indicatorAdded, setIndicatorAdded] = useState(false);

  const getIndicatorColor = (ph: number) => {
    if (ph < 7) return 'bg-yellow-200';
    if (ph === 7) return 'bg-green-200';
    return 'bg-pink-400';
  };

  const handleAddIndicator = () => {
    if (selectedSolution) {
      setIndicatorAdded(true);
    }
  };

  const handleReset = () => {
    setIndicatorAdded(false);
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">
          溶液を選択してください
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
          {solutions.map((solution) => (
            <button
              key={solution.name}
              onClick={() => {
                setSelectedSolution(solution);
                setIndicatorAdded(false);
              }}
              className={`p-4 rounded-lg border-2 transition-all ${
                selectedSolution?.name === solution.name
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-300 hover:border-blue-300'
              }`}
            >
              <div className={`w-12 h-12 rounded-full ${solution.color} mx-auto mb-2`} />
              <p className="font-medium text-sm">{solution.name}</p>
              <p className="text-xs text-gray-500">pH {solution.ph}</p>
            </button>
          ))}
        </div>
      </div>

      {selectedSolution && (
        <div className="flex flex-col items-center space-y-4">
          <div className="relative">
            <div
              className={`w-32 h-48 rounded-lg border-4 border-gray-300 ${
                indicatorAdded ? getIndicatorColor(selectedSolution.ph) : selectedSolution.color
              } transition-colors duration-1000 flex items-end justify-center pb-4`}
            >
              <p className="text-sm font-medium text-gray-700">
                {selectedSolution.name}
              </p>
            </div>
          </div>

          <div className="flex gap-3">
            {!indicatorAdded ? (
              <button
                onClick={handleAddIndicator}
                className="flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Droplet className="w-5 h-5" />
                指示薬を加える
              </button>
            ) : (
              <button
                onClick={handleReset}
                className="bg-gray-600 text-white px-6 py-3 rounded-lg hover:bg-gray-700 transition-colors"
              >
                リセット
              </button>
            )}
          </div>

          {indicatorAdded && (
            <div className="bg-white p-4 rounded-lg border border-gray-200 max-w-md">
              <p className="text-sm text-gray-700">
                <strong>結果:</strong>{' '}
                {selectedSolution.ph < 7 && '酸性を示し、黄色になりました'}
                {selectedSolution.ph === 7 && '中性を示し、緑色になりました'}
                {selectedSolution.ph > 7 && '塩基性を示し、ピンク色になりました'}
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
