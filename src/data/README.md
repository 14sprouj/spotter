# London Tram Stops Data

This directory contains data about London's Tramlink network.

## Files

### london-tram-stops.json
Complete dataset of 38 London Tramlink stops including:
- Stop names
- Geographic coordinates (latitude/longitude)
- TfL fare zones
- Network metadata

## Data Source

The data was compiled from publicly available information about London's Tramlink network operated by Transport for London (TfL). The Tramlink serves south London, primarily the London Borough of Croydon, with connections to:

- Wimbledon
- Beckenham
- Elmers End
- New Addington
- West Croydon
- East Croydon

## Usage

```typescript
import { getTramStops, getTramMetadata, findTramStopByName, getTramStopsByZone } from '../utils/tramStops';

// Get all tram stops
const stops = getTramStops();

// Get network metadata
const metadata = getTramMetadata();

// Find a specific stop
const wimbledon = findTramStopByName('Wimbledon');

// Get all stops in zone 5
const zone5Stops = getTramStopsByZone('5');
```

## Data Structure

```typescript
interface TramStop {
  name: string;      // Name of the tram stop
  lat: number;       // Latitude coordinate
  lng: number;       // Longitude coordinate
  zone: string;      // TfL fare zone(s)
}

interface TramStopsData {
  stops: TramStop[];
  metadata: {
    source: string;
    totalStops: number;
    operator: string;
    network: string;
    description: string;
  };
}
```

## Network Coverage

The London Tramlink network dataset includes 38 stops across zones 3-6:
- Zone 3: 2 stops
- Zone 4: 14 stops
- Zone 5: 21 stops
- Zone 6: 1 stop
- Mixed zones (3-4, 5-6): 1 stop

## Last Updated

January 2026
