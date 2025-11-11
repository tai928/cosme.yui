import { useState } from 'react';
import { Flame } from 'lucide-react';

type Metal = {
  name: string;
  symbol: string;
  color: string;
  flameColor: string;
};

const metals: Metal[] = [
  { name: 'ナトリウム', symbol: 'Na', color: 'bg-gray-300', flameColor: 'bg-yellow-400' },
  { name: 'カリウム', symbol: 'K', color: 'bg-gray-300', flameColor: 'bg-purple-500' },
  { name: '銅', symbol: 'Cu', color: 'bg-orange-400', flameColor: 'bg-cyan-400' },
  { name: 'カルシウム', symbol: 'Ca', color: 'bg-gray-200', flameColor: 'bg-orange-500' },
  { name: 'リチウム', symbol: 'Li', color: 'bg-gray-300', flameColor: 'bg-red-500' },
  { name: 'バリウム', symbol: 'Ba', color: 'bg-gray-300', flameColor: 'bg-green-400' },
];

export function FlameSimulation() {
  const [selectedMetal, setSelectedMetal] = useState<Metal | null>(null);
  const [isHeating, setIsHeating] = useState(false);

  const handleHeat = () => {
    if (selectedMetal) {
      setIsHeating(true);
      setTimeout(() => setIsHeating(false), 3000);
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">
          金属を選択してください
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          {metals.map((metal) => (
            <button
              key={metal.symbol}
              onClick={() => {
                setSelectedMetal(metal);
                setIsHeating(false);
              }}
              className={`p-4 rounded-lg border-2 transition-all ${
                selectedMetal?.symbol === metal.symbol
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-300 hover:border-blue-300'
              }`}
            >
              <div className={`w-12 h-12 rounded-full ${metal.color} mx-auto mb-2 border-2 border-gray-400`} />
              <p className="font-medium text-sm">{metal.name}</p>
              <p className="text-xs text-gray-500">{metal.symbol}</p>
            </button>
          ))}
        </div>
      </div>

      {selectedMetal && (
        <div className="flex flex-col items-center space-y-6">
          <div className="relative">
            <div className="w-64 h-64 flex items-end justify-center">
              {isHeating ? (
                <div className={`relative w-32 h-48 ${selectedMetal.flameColor} rounded-t-full opacity-90 animate-pulse`}>
                  <Flame className="absolute top-4 left-1/2 transform -translate-x-1/2 w-16 h-16 text-white" />
                  <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-2 h-12 bg-gray-700" />
                </div>
              ) : (
                <div className="relative">
                  <div className="w-32 h-32 bg-gradient-to-t from-orange-500 via-orange-400 to-yellow-300 rounded-t-full opacity-80">
                    <Flame className="absolute top-4 left-1/2 transform -translate-x-1/2 w-12 h-12 text-white" />
                  </div>
                  <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 w-2 h-12 bg-gray-700" />
                </div>
              )}
            </div>
            <div className="text-center mt-4">
              <div className="inline-block bg-gray-800 text-white px-4 py-2 rounded-full">
                バーナー
              </div>
            </div>
          </div>

          <button
            onClick={handleHeat}
            disabled={isHeating}
            className="flex items-center gap-2 bg-orange-600 text-white px-6 py-3 rounded-lg hover:bg-orange-700 disabled:bg-gray-400 transition-colors"
          >
            <Flame className="w-5 h-5" />
            {isHeating ? '加熱中...' : `${selectedMetal.name}を炎に入れる`}
          </button>

          {isHeating && (
            <div className="bg-white p-4 rounded-lg border border-gray-200 max-w-md">
              <p className="text-sm text-gray-700 font-medium">
                {selectedMetal.name}({selectedMetal.symbol})の炎色反応:
              </p>
              <p className="text-sm text-gray-600 mt-1">
                炎が
                <span className="font-semibold">
                  {selectedMetal.name === 'ナトリウム' && '黄色'}
                  {selectedMetal.name === 'カリウム' && '紫色'}
                  {selectedMetal.name === '銅' && '青緑色'}
                  {selectedMetal.name === 'カルシウム' && '橙赤色'}
                  {selectedMetal.name === 'リチウム' && '赤色'}
                  {selectedMetal.name === 'バリウム' && '緑色'}
                </span>
                に変化しました！
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
