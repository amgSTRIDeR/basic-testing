// Uncomment the code below and write your tests
import { simpleCalculator, Action } from './index';

describe('simpleCalculator tests', () => {
  test('should add two numbers', () => {
    expect(simpleCalculator({ a: 4, b: 7, action: Action.Add })).toBe(11);
  });

  test('should subtract two numbers', () => {
    expect(simpleCalculator({ a: 24, b: 12, action: Action.Subtract })).toBe(
      12,
    );
  });

  test('should multiply two numbers', () => {
    expect(simpleCalculator({ a: 10, b: 10, action: Action.Multiply })).toBe(
      100,
    );
  });

  test('should divide two numbers', () => {
    expect(simpleCalculator({ a: 44, b: 4, action: Action.Divide })).toBe(11);
  });

  test('should exponentiate two numbers', () => {
    expect(simpleCalculator({ a: 2, b: 4, action: Action.Exponentiate })).toBe(
      16,
    );
  });

  test('should return null for invalid action', () => {
    expect(simpleCalculator({ a: 2, b: 4, action: 'invalid' })).toBe(null);
  });

  test('should return null for invalid arguments', () => {
    expect(simpleCalculator({ a: 2, b: 'sd', action: Action.Add })).toBe(null);
  });
});
