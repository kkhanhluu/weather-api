import { model, Schema } from 'mongoose';
import { Location } from './Location';

export interface City {
  id: number;
  name: string;
  state?: string;
  country?: string;
  location: Location;
}

const citySchema = new Schema<City>(
  {
    id: { type: Number, required: true, unique: true },
    name: { type: String, required: true },
    state: { type: String },
    country: { type: String },
    location: {
      type: {
        type: String,
        enum: ['Point'],
        required: true,
      },
      coordinates: {
        type: [Number],
        required: true,
      },
    },
  },
  { versionKey: false },
);

export const CityModel = model<City>('City', citySchema, 'City');
