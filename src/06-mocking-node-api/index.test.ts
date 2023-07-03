import { readFileAsynchronously, doStuffByTimeout, doStuffByInterval } from '.';
import path from 'path';
import fs from 'fs';

describe('doStuffByTimeout', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set timeout with provided callback and timeout', () => {
    const callback = jest.fn();
    const timeout = 10;
    const timer = jest.spyOn(global, 'setTimeout').mockImplementation();

    doStuffByTimeout(callback, timeout);

    expect(timer).toHaveBeenLastCalledWith(callback, timeout);
  });

  test('should call callback only after timeout', () => {
    const callback = jest.fn();
    const timeout = 10;

    doStuffByTimeout(callback, timeout);

    expect(callback).not.toHaveBeenCalled();

    jest.advanceTimersByTime(timeout);

    expect(callback).toHaveBeenCalled();
  });
});

describe('doStuffByInterval', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set interval with provided callback and timeout', () => {
    const callback = jest.fn();
    const timeout = 10;
    const timer = jest.spyOn(global, 'setInterval').mockImplementation();

    doStuffByInterval(callback, timeout);

    expect(timer).toHaveBeenLastCalledWith(callback, timeout);
  });

  test('should call callback multiple times after multiple intervals', () => {
    const callback = jest.fn();
    const timeout = 10;

    doStuffByInterval(callback, timeout);

    expect(callback).not.toHaveBeenCalled();

    jest.advanceTimersByTime(timeout);
    expect(callback).toHaveBeenCalledTimes(1);

    jest.advanceTimersByTime(timeout);
    expect(callback).toHaveBeenCalledTimes(2);

    jest.advanceTimersByTime(timeout);
    expect(callback).toHaveBeenCalledTimes(3);

    jest.advanceTimersByTime(timeout);
    expect(callback).toHaveBeenCalledTimes(4);
  });
});

describe('readFileAsynchronously', () => {
  const pathToFile = 'path/to/file.txt';
  const fileContent = 'file content';

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

    const answer = await readFileAsynchronously(pathToFile);

    expect(answer).toBeNull();
  });

  test('should return file content if file exists', async () => {
    jest.spyOn(fs, 'existsSync').mockReturnValue(true);
    jest.spyOn(fs.promises, 'readFile').mockResolvedValue(fileContent);

    const answer = await readFileAsynchronously(pathToFile);

    expect(answer).toBe(fileContent);
  });
});
