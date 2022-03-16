import { rest } from 'msw';
import configData from '../config.json';
import { Consent } from '../types/Consent';

export const testConsents: Consent[] = [
  {
    id: 0,
    name: 'Test Name 0',
    email: 'test',
    newsletter: true,
    ads: false,
    statistics: true,
  },
  {
    id: 1,
    name: 'Test Name 1',
    email: 'test',
    newsletter: false,
    ads: true,
    statistics: true,
  },
  {
    id: 2,
    name: 'Test Name 2',
    email: 'test',
    newsletter: true,
    ads: false,
    statistics: false,
  },
];

export const handlers = [
  rest.get(`${configData.SERVER_URL}/consents`, (req, res, ctx) => {
    return res(ctx.json(testConsents), ctx.delay(150));
  }),

  rest.post(`${configData.SERVER_URL}/consents`, (req, res, ctx) => {
    const { name } = req.body as Consent;

    if (name === 'Irregular Test Input') {
      return res(
        ctx.status(404),
        ctx.json({ errorMessage: `Bad request` }),
        ctx.delay(150)
      );
    } else {
      return res(ctx.status(201), ctx.json({}), ctx.delay(150));
    }
  }),
];
