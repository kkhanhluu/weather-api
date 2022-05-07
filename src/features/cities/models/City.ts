import { Coordinate } from './Coordinate';

export interface City {
  id: number;
  name: string;
  state: string;
  country: string;
  coord: Coordinate;
}
