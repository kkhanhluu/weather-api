/* eslint-disable no-underscore-dangle */
import Debug from 'debug';
import { Document } from 'mongoose';
import fs from 'node:fs';
import { chain } from 'stream-chain';
import { withParser } from 'stream-json/streamers/StreamArray';
import { CityModel } from '../../components/cities/models';

interface CityFromFile {
  id: number;
  name: string;
  state?: string;
  country?: string;
  coord: {
    lat: number;
    lon: number;
  };
}

interface ReadFileResult {
  key: number;
  value: CityFromFile;
}

const debug = Debug('Weather API');

export function seedDb(path: string): Promise<boolean> {
  return new Promise((resolve, reject) => {
    const start = process.hrtime();
    let counter = 0;
    const pipeline = chain([fs.createReadStream(path), withParser()]);
    const promises: Promise<Document>[] = [];

    pipeline.on(
      'data',
      ({
        value: {
          coord: { lat, lon },
          ...rest
        },
      }: ReadFileResult) => {
        counter++;
        const cityRecord = new CityModel({
          ...rest,
          location: {
            type: 'Point',
            coordinates: [lon, lat],
          },
        });
        promises.push(cityRecord.save());
      },
    );

    pipeline.on('end', async () => {
      await Promise.all(promises);
      const endTime = process.hrtime(start);
      debug(`Finish seeding db in ${endTime[0]} seconds. Added ${counter} records`);
      resolve(true);
    });

    pipeline.on('error', reject);
  });
}
