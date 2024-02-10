// Uncomment the code below and write your tests
import { generateLinkedList } from './index';

describe('generateLinkedList', () => {
  const values = ['a', 'b', 'c', 'd', 'e'];
  const expectedLinkedList = {
    next: {
      next: {
        next: {
          next: {
            next: {
              next: null,
              value: null,
            },
            value: 'e',
          },
          value: 'd',
        },
        value: 'c',
      },
      value: 'b',
    },
    value: 'a',
  };

  // Check match by expect(...).toStrictEqual(...)
  test('should generate linked list from values 1', () => {
    const generatedLinkedList = generateLinkedList(values);
    expect(generatedLinkedList).toMatchSnapshot();

    expect(generatedLinkedList).toStrictEqual(expectedLinkedList);
  });

  // Check match by comparison with snapshot
  test('should generate linked list from values 2', () => {
    const generatedLinkedList = generateLinkedList(values);
    expect(generatedLinkedList).toMatchSnapshot();
  });
});
