import { setupServer } from 'msw/node';
import { restHandlers } from './handers';
import { afterAll, afterEach, beforeAll } from 'vitest';

export const server = setupServer(...restHandlers);
