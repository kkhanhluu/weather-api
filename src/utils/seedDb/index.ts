import { Document } from 'mongoose';
import https from 'node:https';
import zlip from 'node:zlib';
import { chain } from 'stream-chain';
import { withParser } from 'stream-json/streamers/StreamArray';
import { CityModel } from '../../components/cities/models';
import { logger } from '../logger';

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

export function seedDb(): Promise<boolean> {
  return new Promise((resolve, reject) => {
    const start = process.hrtime();
    let counter = 0;
    const promises: Promise<Document>[] = [];

    https.get(
      'https://bulk.openweathermap.org/sample/city.list.min.json.gz',
      {
        method: 'GET',
      },
      (res) => {
        const pipeline = res.pipe(chain([zlip.createGunzip(), withParser()]));
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
          logger.info(`Finish seeding db in ${endTime[0]} seconds. Added ${counter} records`);
          resolve(true);
        });

        pipeline.on('error', reject);
      },
    );
  });
}
