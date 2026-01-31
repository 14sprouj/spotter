/**
 * Example usage of London Tram Stops data
 * 
 * This file demonstrates how to use the tram stops utilities
 * in your application.
 */

import { 
  getTramStops, 
  getTramMetadata, 
  findTramStopByName, 
  getTramStopsByZone,
  getTramStopsCount
} from '../utils/tramStops';

// Example 1: Get all tram stops
export function getAllStops() {
  const stops = getTramStops();
  console.log(`Total stops: ${stops.length}`);
  stops.forEach(stop => {
    console.log(`${stop.name} - Zone ${stop.zone} (${stop.lat}, ${stop.lng})`);
  });
  return stops;
}

// Example 2: Get metadata about the network
export function getNetworkInfo() {
  const metadata = getTramMetadata();
  console.log(`Network: ${metadata.network}`);
  console.log(`Operator: ${metadata.operator}`);
  console.log(`Total Stops: ${metadata.totalStops}`);
  console.log(`Description: ${metadata.description}`);
  return metadata;
}

// Example 3: Find specific stops
export function findSpecificStops() {
  const wimbledon = findTramStopByName('Wimbledon');
  const westCroydon = findTramStopByName('West Croydon');
  const eastCroydon = findTramStopByName('East Croydon');
  
  console.log('Major stops:', { wimbledon, westCroydon, eastCroydon });
  return { wimbledon, westCroydon, eastCroydon };
}

// Example 4: Get stops by zone
export function getStopsByFareZone() {
  const zone3 = getTramStopsByZone('3');
  const zone4 = getTramStopsByZone('4');
  const zone5 = getTramStopsByZone('5');
  const zone6 = getTramStopsByZone('6');
  
  console.log(`Zone 3: ${zone3.length} stops`);
  console.log(`Zone 4: ${zone4.length} stops`);
  console.log(`Zone 5: ${zone5.length} stops`);
  console.log(`Zone 6: ${zone6.length} stops`);
  
  return { zone3, zone4, zone5, zone6 };
}

// Example 5: Calculate distance between two stops (simplified)
export function calculateDistance(stop1Name: string, stop2Name: string) {
  const stop1 = findTramStopByName(stop1Name);
  const stop2 = findTramStopByName(stop2Name);
  
  if (!stop1 || !stop2) {
    console.error('One or both stops not found');
    return null;
  }
  
  // Simple Euclidean distance (not accurate for real-world use, just for demo)
  const latDiff = stop2.lat - stop1.lat;
  const lngDiff = stop2.lng - stop1.lng;
  const distance = Math.sqrt(latDiff * latDiff + lngDiff * lngDiff);
  
  console.log(`Distance between ${stop1Name} and ${stop2Name}: ${distance.toFixed(4)} degrees`);
  return distance;
}

// Example 6: Get total count
export function getCount() {
  const count = getTramStopsCount();
  console.log(`Total tram stops in the network: ${count}`);
  return count;
}

// Example 7: Filter stops by name pattern
export function searchStops(searchTerm: string) {
  const allStops = getTramStops();
  const matches = allStops.filter(stop => 
    stop.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  console.log(`Found ${matches.length} stops matching "${searchTerm}"`);
  return matches;
}
