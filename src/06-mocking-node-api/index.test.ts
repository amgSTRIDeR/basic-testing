// Uncomment the code below and write your tests
import path from 'path';
import fs from 'fs';
import { readFileAsynchronously, doStuffByTimeout, doStuffByInterval } from '.';

describe('doStuffByTimeout', () => {
  const fakeCallback = jest.fn();
  const timeout = 5000;

  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set timeout with provided callback and timeout', () => {
    const timer = jest.spyOn(global, 'setTimeout').mockImplementation();
    doStuffByTimeout(fakeCallback, timeout);
    expect(timer).toHaveBeenCalledWith(fakeCallback, timeout);
  });

  test('should call callback only after timeout', () => {
    doStuffByTimeout(fakeCallback, timeout);

    expect(fakeCallback).not.toHaveBeenCalled();

    jest.advanceTimersByTime(timeout);

    expect(fakeCallback).toHaveBeenCalled();
  });
});

describe('doStuffByInterval', () => {
  const fakeCallback = jest.fn();
  const timeout = 5000;

  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set interval with provided callback and timeout', () => {
    const interval = jest.spyOn(global, 'setInterval').mockImplementation();
    doStuffByInterval(fakeCallback, timeout);
    expect(interval).toBeCalledWith(fakeCallback, timeout);
  });

  test('should call callback multiple times after multiple intervals', () => {
    doStuffByInterval(fakeCallback, timeout);

    expect(fakeCallback).not.toBeCalled();

    jest.advanceTimersByTime(timeout);

    expect(fakeCallback).toBeCalledTimes(1);

    jest.advanceTimersByTime(timeout / 2);

    expect(fakeCallback).toBeCalledTimes(1);

    jest.advanceTimersByTime(timeout / 2);

    expect(fakeCallback).toBeCalledTimes(2);
  });
});

describe('readFileAsynchronously', () => {
  const pathToFile = 'path/to/file.txt';

  afterEach(() => {
    jest.restoreAllMocks();
  });

  test('should call join with pathToFile', async () => {
    const joinSpy = jest
      .spyOn(path, 'join')
      .mockReturnValue(pathToFile)
      .mockImplementation();

    await readFileAsynchronously(pathToFile);

    expect(joinSpy).toHaveBeenCalledWith(__dirname, pathToFile);
  });

  test('should return null if file does not exist', async () => {
    jest.spyOn(fs, 'existsSync').mockReturnValue(false);
    expect(await readFileAsynchronously(pathToFile)).toBeNull();
  });

  test('should return file content if file exists', async () => {
    const text = '123';
    const buffer = Buffer.from(text);
    jest.spyOn(fs, 'existsSync').mockReturnValue(true);
    jest.spyOn(fs.promises, 'readFile').mockResolvedValue(buffer);

    expect(await readFileAsynchronously(pathToFile)).toBe(text);
  });
});
