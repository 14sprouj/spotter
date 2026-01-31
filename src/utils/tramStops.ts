import tramStopsData from '../data/london-tram-stops.json';
import type { TramStopsData } from '../types/tramStops';

/**
 * Retrieves all London Tramlink stops
 * @returns Array of tram stops with their coordinates and zone information
 */
export function getTramStops() {
  const data = tramStopsData as TramStopsData;
  return data.stops;
}

/**
 * Retrieves metadata about the London Tramlink network
 * @returns Metadata including operator, total stops, and network description
 */
export function getTramMetadata() {
  const data = tramStopsData as TramStopsData;
  return data.metadata;
}

/**
 * Finds a specific tram stop by name
 * @param name - The name of the tram stop to find
 * @returns The tram stop if found, undefined otherwise
 */
export function findTramStopByName(name: string) {
  const stops = getTramStops();
  return stops.find(stop => stop.name.toLowerCase() === name.toLowerCase());
}

/**
 * Gets all tram stops in a specific zone
 * @param zone - The zone number or range (e.g., "3", "3-4")
 * @returns Array of tram stops in the specified zone
 */
export function getTramStopsByZone(zone: string) {
  const stops = getTramStops();
  return stops.filter(stop => stop.zone === zone);
}

/**
 * Gets the total count of tram stops
 * @returns Total number of tram stops in the network
 */
export function getTramStopsCount() {
  return getTramStops().length;
}
