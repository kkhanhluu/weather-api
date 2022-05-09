import { rest } from 'msw';
import fs from 'node:fs';
import path from 'node:path';

export const handlers = [
  rest.get('https://api.openweathermap.org/data/2.5/weather', (req, res, ctx) =>
    res(
      ctx.status(201),
      ctx.json({
        coord: {
          lon: 8.6465,
          lat: 49.8725,
        },
        weather: [
          {
            id: 801,
            main: 'Clouds',
            description: 'few clouds',
            icon: '02d',
          },
        ],
        base: 'stations',
        main: {
          temp: 22,
          feels_like: 22.01,
          temp_min: 20.36,
          temp_max: 23.75,
          pressure: 1024,
          humidity: 67,
        },
        visibility: 10000,
        wind: {
          speed: 5.66,
          deg: 40,
        },
        clouds: {
          all: 20,
        },
        dt: 1652012821,
        sys: {
          type: 2,
          id: 2005640,
          country: 'DE',
          sunrise: 1651981839,
          sunset: 1652035991,
        },
        timezone: 7200,
        id: 2938913,
        name: 'Darmstadt',
        cod: 200,
      }),
    ),
  ),
  rest.get('https://bulk.openweathermap.org/sample/city.list.min.json.gz', (req, res, ctx) => {
    const buffer = fs.readFileSync(path.resolve(__dirname, './city.list.test.json.gz'));
    return res(ctx.status(201), ctx.body(buffer));
  }),
];
