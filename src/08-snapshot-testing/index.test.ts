import { generateLinkedList } from './index';

// Check match by expect(...).toStrictEqual(...)
describe('generateLinkedList', () => {
  const values = [1, 2, 3, 4, 5];
  const expectedLinkedList = {
    next: {
      next: {
        next: {
          next: {
            next: {
              next: null,
              value: null,
            },
            value: 5,
          },
          value: 4,
        },
        value: 3,
      },
      value: 2,
    },
    value: 1,
  };

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
