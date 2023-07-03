import axios from 'axios';
import { throttledGetDataFromApi } from './index';

jest.mock('axios');
jest.mock('lodash', () => {
  const moduleLodash = jest.requireActual('lodash');
  return {
    __esModule: true,
    ...moduleLodash,
    throttle: jest.fn((fn) => fn),
  };
});

describe('throttledGetDataFromApi', () => {
  const pathTest = '/test';
  const responseTest = { data: 'dataTest' };

  beforeEach(() => {
    axios.create = jest.fn(() => axios);
    axios.get = jest.fn().mockResolvedValue(responseTest);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should create instance with provided base url', async () => {
    await throttledGetDataFromApi(pathTest);

    expect(axios.create).toHaveBeenCalledWith({
      baseURL: 'https://jsonplaceholder.typicode.com',
    });
  });

  test('should perform request to correct provided url', async () => {
    await throttledGetDataFromApi(pathTest);

    expect(axios.get).toHaveBeenCalledWith(pathTest);
  });

  test('should return response data', async () => {
    const answer = await throttledGetDataFromApi(pathTest);

    expect(answer).toEqual(responseTest.data);
  });
});
