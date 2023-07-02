import { simpleCalculator, Action } from './index';

const testCases = [
  { a: -999, b: 999, action: Action.Add, expected: 0 },
  { a: 3, b: -2, action: Action.Add, expected: 1 },
  {
    a: Number.MIN_SAFE_INTEGER,
    b: Number.MAX_SAFE_INTEGER,
    action: Action.Add,
    expected: 0,
  },

  { a: 555, b: 110, action: Action.Subtract, expected: 445 },

  { a: 1, b: 5, action: Action.Multiply, expected: 5 },
  { a: 0, b: 5, action: Action.Multiply, expected: 0 },
  { a: 10, b: 10, action: Action.Multiply, expected: 100 },

  { a: 5, b: 2, action: Action.Divide, expected: 2.5 },
  { a: 5, b: 0, action: Action.Divide, expected: Infinity },
  { a: 0, b: 5, action: Action.Divide, expected: 0 },

  { a: 2, b: 3, action: Action.Exponentiate, expected: 8 },
  { a: 2, b: 0, action: Action.Exponentiate, expected: 1 },

  { a: 1, b: 1, action: 'invalid action', expected: null },

  { a: 123n, b: 999, action: Action.Add, expected: null },
  { a: 5, b: '123', action: Action.Divide, expected: null },
];

describe('simpleCalculator', () => {
  test.each(testCases)(
    'should return expected result for valid input and null for invalid input',
    ({ a, b, action, expected }) => {
      const result = simpleCalculator({ a, b, action });
      expect(result).toBe(expected);
    },
  );
});
