export interface Coordinates {
  longitude: number;
  latitude: number;
}

export interface Location {
  address: string;
  coordinates: Coordinates;
}
