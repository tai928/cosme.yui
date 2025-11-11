import { useState, useEffect } from 'react';
import { Zap, RotateCcw } from 'lucide-react';

export function ElectrolysisSimulation() {
  const [voltage, setVoltage] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [hydrogenVolume, setHydrogenVolume] = useState(0);
  const [oxygenVolume, setOxygenVolume] = useState(0);
  const [time, setTime] = useState(0);

  useEffect(() => {
    let interval: number | undefined;
    if (isRunning && voltage > 0) {
      interval = setInterval(() => {
        setTime((t) => t + 1);
        const rate = voltage / 10;
        setHydrogenVolume((v) => Math.min(v + rate * 2, 100));
        setOxygenVolume((v) => Math.min(v + rate, 50));
      }, 100);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isRunning, voltage]);

  const handleStart = () => {
    if (voltage > 0) {
      setIsRunning(true);
    }
  };

  const handleStop = () => {
    setIsRunning(false);
  };

  const handleReset = () => {
    setIsRunning(false);
    setVoltage(0);
    setHydrogenVolume(0);
    setOxygenVolume(0);
    setTime(0);
  };

  return (
    <div className="space-y-6">
      <div className="bg-white p-4 rounded-lg border border-gray-200">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          電圧: {voltage}V
        </label>
        <input
          type="range"
          min="0"
          max="12"
          step="1"
          value={voltage}
          onChange={(e) => setVoltage(Number(e.target.value))}
          disabled={isRunning}
          className="w-full"
        />
        <div className="flex justify-between text-xs text-gray-500 mt-1">
          <span>0V</span>
          <span>12V</span>
        </div>
      </div>

      <div className="flex items-end justify-center gap-8">
        <div className="flex flex-col items-center">
          <div className="relative w-16 h-64 bg-gradient-to-b from-transparent to-blue-100 border-2 border-gray-400 rounded-lg overflow-hidden">
            <div
              className="absolute bottom-0 left-0 right-0 bg-blue-300 transition-all duration-300"
              style={{ height: `${hydrogenVolume}%` }}
            />
            <div className="absolute top-2 left-0 right-0 text-center">
              <Zap className="w-6 h-6 mx-auto text-yellow-500" />
            </div>
          </div>
          <div className="mt-2 text-center">
            <p className="text-sm font-medium text-gray-700">陰極 (-)</p>
            <p className="text-xs text-gray-500">水素 H₂</p>
            <p className="text-xs font-semibold text-blue-600">
              {hydrogenVolume.toFixed(1)} mL
            </p>
          </div>
        </div>

        <div className="flex flex-col items-center mb-8">
          <div className="w-32 h-32 bg-blue-200 rounded-lg border-4 border-gray-400 flex items-center justify-center">
            <div className="text-center">
              <p className="text-sm font-medium">H₂O</p>
              <p className="text-xs text-gray-600">水溶液</p>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center">
          <div className="relative w-16 h-64 bg-gradient-to-b from-transparent to-red-100 border-2 border-gray-400 rounded-lg overflow-hidden">
            <div
              className="absolute bottom-0 left-0 right-0 bg-red-300 transition-all duration-300"
              style={{ height: `${oxygenVolume * 2}%` }}
            />
            <div className="absolute top-2 left-0 right-0 text-center">
              <Zap className="w-6 h-6 mx-auto text-red-500" />
            </div>
          </div>
          <div className="mt-2 text-center">
            <p className="text-sm font-medium text-gray-700">陽極 (+)</p>
            <p className="text-xs text-gray-500">酸素 O₂</p>
            <p className="text-xs font-semibold text-red-600">
              {oxygenVolume.toFixed(1)} mL
            </p>
          </div>
        </div>
      </div>

      <div className="flex flex-col items-center space-y-4">
        <div className="flex gap-3">
          {!isRunning ? (
            <button
              onClick={handleStart}
              disabled={voltage === 0}
              className="flex items-center gap-2 bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 disabled:bg-gray-400 transition-colors"
            >
              <Zap className="w-5 h-5" />
              電気分解開始
            </button>
          ) : (
            <button
              onClick={handleStop}
              className="flex items-center gap-2 bg-yellow-600 text-white px-6 py-3 rounded-lg hover:bg-yellow-700 transition-colors"
            >
              停止
            </button>
          )}
          <button
            onClick={handleReset}
            className="flex items-center gap-2 bg-gray-600 text-white px-6 py-3 rounded-lg hover:bg-gray-700 transition-colors"
          >
            <RotateCcw className="w-5 h-5" />
            リセット
          </button>
        </div>

        {hydrogenVolume > 0 && (
          <div className="bg-white p-4 rounded-lg border border-gray-200 max-w-md">
            <p className="text-sm text-gray-700">
              <strong>体積比:</strong> H₂ : O₂ = {(hydrogenVolume / oxygenVolume).toFixed(1)} : 1
              {Math.abs((hydrogenVolume / oxygenVolume) - 2) < 0.2 && (
                <span className="text-green-600 font-semibold"> (理論値 2:1)</span>
              )}
            </p>
            <p className="text-xs text-gray-500 mt-1">
              経過時間: {(time / 10).toFixed(1)}秒
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
