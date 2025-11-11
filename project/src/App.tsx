import { useState } from 'react';
import { ExperimentGallery } from './components/ExperimentGallery';
import { ExperimentDetail } from './components/ExperimentDetail';
import { Experiment } from './lib/supabase';

function App() {
  const [selectedExperiment, setSelectedExperiment] = useState<Experiment | null>(null);

  return (
    <>
      {selectedExperiment ? (
        <ExperimentDetail
          experiment={selectedExperiment}
          onBack={() => setSelectedExperiment(null)}
        />
      ) : (
        <ExperimentGallery onSelectExperiment={setSelectedExperiment} />
      )}
    </>
  );
}

export default App;
