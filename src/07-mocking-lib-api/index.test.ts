// Uncomment the code below and write your tests
import axios from 'axios';
import { throttledGetDataFromApi } from './index';

jest.mock('axios');
jest.mock('lodash', () => {
  return {
    ...jest.requireActual('lodash'),
    throttle: jest.fn((callback) => callback),
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

    expect(axios.get).toBeCalledWith(pathTest);
  });

  test('should return response data', async () => {
    const data = await throttledGetDataFromApi(pathTest);

    expect(data).toBe(responseTest.data);
  });
});
