import { useState } from 'react';
import { Plus, RotateCcw } from 'lucide-react';

export function TitrationSimulation() {
  const [volume, setVolume] = useState(0);
  const neutralizationPoint = 25;

  const getColor = () => {
    if (volume < neutralizationPoint - 2) return 'bg-red-300';
    if (volume < neutralizationPoint) return 'bg-orange-300';
    if (volume < neutralizationPoint + 2) return 'bg-pink-200';
    return 'bg-pink-400';
  };

  const addDrops = (amount: number) => {
    setVolume((prev) => Math.min(prev + amount, 50));
  };

  const reset = () => {
    setVolume(0);
  };

  const fillHeight = (volume / 50) * 100;

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row items-center justify-center gap-8">
        <div className="flex flex-col items-center">
          <div className="relative w-24 h-64 bg-gradient-to-b from-blue-200 to-blue-300 rounded-t-lg border-4 border-gray-700">
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-2 h-8 bg-gray-700" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <p className="text-xs font-medium">NaOH</p>
                <p className="text-xs">{50 - volume} mL</p>
              </div>
            </div>
          </div>
          <p className="text-sm text-gray-600 mt-2">ビュレット</p>
        </div>

        <div className="flex flex-col items-center">
          <div className="relative w-40 h-64 bg-white border-4 border-gray-300 rounded-full overflow-hidden">
            <div
              className={`absolute bottom-0 left-0 right-0 transition-all duration-500 ${getColor()}`}
              style={{ height: `${Math.max(fillHeight, 15)}%` }}
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <p className="text-sm font-medium">HCl</p>
                <p className="text-xs text-gray-600">{volume} mL 滴下</p>
              </div>
            </div>
          </div>
          <p className="text-sm text-gray-600 mt-2">フラスコ</p>
        </div>
      </div>

      <div className="flex flex-col items-center space-y-4">
        <div className="flex gap-3">
          <button
            onClick={() => addDrops(1)}
            disabled={volume >= 50}
            className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 disabled:bg-gray-400 transition-colors"
          >
            <Plus className="w-4 h-4" />
            1mL 滴下
          </button>
          <button
            onClick={() => addDrops(5)}
            disabled={volume >= 50}
            className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 disabled:bg-gray-400 transition-colors"
          >
            <Plus className="w-4 h-4" />
            5mL 滴下
          </button>
          <button
            onClick={reset}
            className="flex items-center gap-2 bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors"
          >
            <RotateCcw className="w-4 h-4" />
            リセット
          </button>
        </div>

        {volume >= neutralizationPoint - 2 && volume <= neutralizationPoint + 2 && (
          <div className="bg-green-50 border border-green-200 p-4 rounded-lg max-w-md">
            <p className="text-sm text-green-800 font-medium">
              中和点付近です！指示薬の色が変化しました
            </p>
            {volume === neutralizationPoint && (
              <p className="text-xs text-green-700 mt-1">
                完全中和点: {neutralizationPoint} mL
              </p>
            )}
          </div>
        )}

        {volume > neutralizationPoint + 2 && (
          <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg max-w-md">
            <p className="text-sm text-blue-800">
              塩基性になりました。中和点を過ぎています
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
