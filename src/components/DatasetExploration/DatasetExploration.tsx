import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import VisualizationContainer from '../shared/VisualizationContainer/VisualizationContainer';
import './DatasetExploration.css';

interface DatasetConfig {
  title: string;
  description: string;
  visualizations: {
    type: string;
    title: string;
    description: string;
  }[];
}

const DATASET_CONFIGS: Record<string, DatasetConfig> = {
  globalhealth: {
    title: 'Global Health Statistics',
    description: 'Explore worldwide health indicators and trends across different countries and time periods.',
    visualizations: [
      {
        type: 'map',
        title: 'Geographic Distribution',
        description: 'View health statistics across different regions and countries'
      },
      {
        type: 'timeline',
        title: 'Temporal Trends',
        description: 'Analyze how health indicators have changed over time'
      },
      {
        type: 'comparison',
        title: 'Country Comparison',
        description: 'Compare health statistics between different countries'
      }
    ]
  }
};

const DatasetExploration: React.FC = () => {
  const { datasetId } = useParams<{ datasetId: string }>();
  const dataset = datasetId ? DATASET_CONFIGS[datasetId] : null;
  const [selectedViz, setSelectedViz] = useState<number>(0);

  if (!dataset) {
    return (
      <div className="dataset-not-found">
        <h2>Dataset Not Found</h2>
        <p>The requested dataset could not be found.</p>
      </div>
    );
  }

  return (
    <div className="dataset-exploration">
      
      <div className="dataset-content">
        <div className="visualization-sidebar">
          <h2>Visualizations</h2>
          <ul className="visualization-list">
            {dataset.visualizations.map((viz, index) => (
              <li 
                key={index}
                className={`visualization-item ${selectedViz === index ? 'active' : ''}`}
                onClick={() => setSelectedViz(index)}
              >
                <h3>{viz.title}</h3>
                <p>{viz.description}</p>
              </li>
            ))}
          </ul>
        </div>

        <div className="visualization-main">
          <VisualizationContainer
            title={dataset.visualizations[selectedViz].title}
            description={dataset.visualizations[selectedViz].description}
          >
            <div className="visualization-placeholder">
              <p>Visualization coming soon!</p>
            </div>
          </VisualizationContainer>
        </div>
      </div>
    </div>
  );
};

export default DatasetExploration;
