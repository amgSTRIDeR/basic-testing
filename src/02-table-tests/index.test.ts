// Uncomment the code below and write your tests
import { simpleCalculator, Action } from './index';

const testCases = [
  { a: 1, b: 2, action: Action.Add, expected: 3 },
  { a: 2, b: 2, action: Action.Add, expected: 4 },
  { a: 3, b: 2, action: Action.Add, expected: 5 },
  { a: 4, b: 7, action: Action.Add, expected: 11 },
  { a: 24, b: 12, action: Action.Subtract, expected: 12 },
  { a: 10, b: 10, action: Action.Multiply, expected: 100 },
  { a: 44, b: 4, action: Action.Divide, expected: 11 },
  { a: 2, b: 4, action: Action.Exponentiate, expected: 16 },
  { a: 2, b: 4, action: 'invalid', expected: null },
  { a: 2, b: 'sd', action: Action.Add, expected: null },
];

describe('simpleCalculator', () => {
  test.each(testCases)(
    'Should return correct result for valid input and null for invalid input',
    ({ a, b, action, expected }) => {
      expect(simpleCalculator({ a, b, action })).toBe(expected);
    },
  );
});
