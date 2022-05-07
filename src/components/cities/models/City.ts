import { model, Schema } from 'mongoose';
import { Coordinate } from './Coordinate';

export interface City {
  id: number;
  name: string;
  state?: string;
  country?: string;
  coord: Coordinate;
}

const citySchema = new Schema<City>(
  {
    id: { type: Number, required: true, unique: true },
    name: { type: String, required: true },
    state: { type: String },
    country: { type: String },
    coord: new Schema(
      {
        lat: { type: Number, required: true },
        lon: { type: Number, required: true },
      },
      { _id: false },
    ),
  },
  { versionKey: false },
);

export const CityModel = model<City>('City', citySchema, 'City');
