import { Experiment } from '../lib/supabase';

interface ExperimentCardProps {
  experiment: Experiment;
  onClick: () => void;
}

export function ExperimentCard({ experiment, onClick }: ExperimentCardProps) {
  return (
    <div
      onClick={onClick}
      className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer transition-transform hover:scale-105 hover:shadow-xl"
    >
      <div className="aspect-video w-full overflow-hidden bg-gray-200">
        <img
          src={experiment.thumbnail_url}
          alt={experiment.title}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="p-4">
        <h3 className="font-bold text-lg text-gray-800 mb-2">
          {experiment.title}
        </h3>
        <p className="text-gray-600 text-sm line-clamp-2">
          {experiment.description}
        </p>
      </div>
    </div>
  );
}
