'use strict';

import test from 'ava';
import { beacons as config } from 'config';
import request from 'supertest-as-promised';
import service from 'server';

const app = service.listen();

test(`should be able to load status page`, async t => {
  const res = await request(app).get(`/status`);

  t.is(res.statusCode, 200);
  t.true(res.body.success);
});