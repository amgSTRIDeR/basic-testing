import { simpleCalculator, Action } from './index';

describe('simpleCalculator tests', () => {
  test('should add two numbers', () => {
    const result1 = simpleCalculator({ a: -999, b: 999, action: Action.Add });
    expect(result1).toBe(0);

    const result2 = simpleCalculator({ a: 3, b: -2, action: Action.Add });
    expect(result2).toBe(1);

    const result3 = simpleCalculator({ a: Number.MIN_SAFE_INTEGER, b: Number.MAX_SAFE_INTEGER, action: Action.Add });
    expect(result3).toBe(0);
  });

  test('should subtract two numbers', () => {
    const result = simpleCalculator({ a: 555, b : 110, action: Action.Subtract });
    expect(result).toBe(445);
  });

  test('should multiply two numbers', () => {
    const result1 = simpleCalculator({ a: 1, b: 5, action: Action.Multiply });
    expect(result1).toBe(5);

    const result2 = simpleCalculator({ a: 0, b: 5, action: Action.Multiply });
    expect(result2).toBe(0);

    const result3 = simpleCalculator({ a: 10, b: 10, action: Action.Multiply });
    expect(result3).toBe(100);
  });

  test('should divide two numbers', () => {
    const result1 = simpleCalculator({ a: 5, b: 2, action: Action.Divide });
    expect(result1).toBe(2.5);

    const result2 = simpleCalculator({ a: 5, b: 0, action: Action.Divide });
    expect(result2).toBe(Infinity);

    const result3 = simpleCalculator({ a: 0, b: 5, action: Action.Divide });
    expect(result3).toBe(0);
  });

  test('should exponentiate two numbers', () => {
    const result1 = simpleCalculator({ a: 2, b: 3, action: Action.Exponentiate });
    expect(result1).toBe(8);

    const result2 = simpleCalculator({ a: 2, b: 0, action: Action.Exponentiate });
    expect(result2).toBe(1);
  });

  test('should return null for invalid action', () => {
    const result1 = simpleCalculator({ a: 1, b: 1, action: 'invalid action' });
    expect(result1).toBe(null);
  });

  test('should return null for invalid arguments', () => {
    const result1 = simpleCalculator({ a: 123n, b: 999, action: Action.Add });
    expect(result1).toBe(null);

    
    const result2 = simpleCalculator({ a: 5, b: '123', action: Action.Divide });
    expect(result2).toBe(null);
  });
});
