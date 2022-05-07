import { City } from '../models/City';

export class CitiesService {
  public get(id: number): City {
    return {
      id,
      name: 'Darmstadt',
      country: 'Germany',
      state: 'Hessen',
      coord: {
        lat: 49.8728,
        lon: 8.6512,
      },
    };
  }
}
