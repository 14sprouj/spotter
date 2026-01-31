import { getTramStops, getTramMetadata } from '../utils/tramStops';

/**
 * TramStops Component
 * Displays information about London Tramlink stops
 */
export default function TramStops() {
  const stops = getTramStops();
  const metadata = getTramMetadata();

  return (
    <div className="tram-stops-container">
      <h2>London Tramlink Stops</h2>
      <div className="metadata">
        <p><strong>Network:</strong> {metadata.network}</p>
        <p><strong>Operator:</strong> {metadata.operator}</p>
        <p><strong>Total Stops:</strong> {metadata.totalStops}</p>
        <p><strong>Description:</strong> {metadata.description}</p>
      </div>
      
      <h3>All Stops ({stops.length})</h3>
      <ul className="stops-list">
        {stops.map((stop, index) => (
          <li key={`${stop.name}-${index}`}>
            <strong>{stop.name}</strong>
            <span> - Zone {stop.zone}</span>
            <span className="coordinates">
              {' '}({stop.lat.toFixed(4)}, {stop.lng.toFixed(4)})
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
