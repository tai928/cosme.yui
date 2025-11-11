import { useEffect, useState } from 'react';
import { Experiment, supabase } from '../lib/supabase';
import { ExperimentCard } from './ExperimentCard';
import { Beaker } from 'lucide-react';

interface ExperimentGalleryProps {
  onSelectExperiment: (experiment: Experiment) => void;
}

export function ExperimentGallery({ onSelectExperiment }: ExperimentGalleryProps) {
  const [experiments, setExperiments] = useState<Experiment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadExperiments();
  }, []);

  const loadExperiments = async () => {
    try {
      const { data, error } = await supabase
        .from('experiments')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setExperiments(data || []);
    } catch (error) {
      console.error('Error loading experiments:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <Beaker className="w-12 h-12 mx-auto mb-4 text-blue-500 animate-pulse" />
          <p className="text-gray-600">実験を読み込み中...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      <div className="container mx-auto px-4 py-8">
        <header className="mb-12 text-center">
          <div className="flex items-center justify-center mb-4">
            <Beaker className="w-10 h-10 text-blue-600 mr-3" />
            <h1 className="text-4xl font-bold text-gray-800">
              化学実験シミュレーション
            </h1>
          </div>
          <p className="text-gray-600 text-lg">
            実験をクリックして、インタラクティブなシミュレーションを体験しよう
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {experiments.map((experiment) => (
            <ExperimentCard
              key={experiment.id}
              experiment={experiment}
              onClick={() => onSelectExperiment(experiment)}
            />
          ))}
        </div>

        {experiments.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">実験データがありません</p>
          </div>
        )}
      </div>
    </div>
  );
}
