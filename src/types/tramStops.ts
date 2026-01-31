/**
 * Represents a single tram stop on the London Tramlink network
 */
export interface TramStop {
  /** Name of the tram stop */
  name: string;
  /** Latitude coordinate */
  lat: number;
  /** Longitude coordinate */
  lng: number;
  /** TfL fare zone(s) */
  zone: string;
}

/**
 * Metadata about the tram stop data
 */
export interface TramStopMetadata {
  /** Data source description */
  source: string;
  /** Total number of stops in the network */
  totalStops: number;
  /** Operator of the tram network */
  operator: string;
  /** Name of the network */
  network: string;
  /** Description of the network coverage */
  description: string;
}

/**
 * Complete structure for tram stops data
 */
export interface TramStopsData {
  /** Array of all tram stops */
  stops: TramStop[];
  /** Metadata about the tram network */
  metadata: TramStopMetadata;
}
