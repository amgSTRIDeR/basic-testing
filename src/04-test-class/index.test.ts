// Uncomment the code below and write your tests
import {
  BankAccount,
  InsufficientFundsError,
  SynchronizationFailedError,
  TransferFailedError,
  getBankAccount,
} from '.';
import _ from 'lodash';

describe('BankAccount', () => {
  let bankAccount = getBankAccount(999);
  const anotherAccount = getBankAccount(2000);

  beforeEach(() => {
    bankAccount = getBankAccount(999);
  });

  test('should create account with initial balance', () => {
    expect(bankAccount instanceof BankAccount).toBeTruthy();
    expect(bankAccount.getBalance()).toBe(999);
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    expect(() => bankAccount.withdraw(1001)).toThrowError(
      InsufficientFundsError,
    );
  });

  test('should throw error when transferring more than balance', () => {
    expect(() => bankAccount.transfer(1001, anotherAccount)).toThrowError(
      InsufficientFundsError,
    );
  });

  test('should throw error when transferring to the same account', () => {
    expect(() => bankAccount.transfer(1001, bankAccount)).toThrowError(
      TransferFailedError,
    );
  });

  test('should deposit money', () => {
    bankAccount.deposit(1);
    expect(bankAccount.getBalance()).toBe(1000);
  });

  test('should withdraw money', () => {
    bankAccount.withdraw(100);
    expect(bankAccount.getBalance()).toBe(899);
  });

  test('should transfer money', () => {
    bankAccount.transfer(99, anotherAccount);
    expect(bankAccount.getBalance()).toBe(900);
    expect(anotherAccount.getBalance()).toBe(2099);
  });

  test('fetchBalance should return number in case if request did not failed', async () => {
    const randomSpy = jest.spyOn(_, 'random').mockReturnValue(1);
    const balance = await bankAccount.fetchBalance();
    expect(typeof balance).toBe('number');
    randomSpy.mockRestore();
  });

  test('should set new balance if fetchBalance returned number', async () => {
    const newBalance = 30;
    const randomSpy = jest.spyOn(_, 'random').mockReturnValue(newBalance);
    await bankAccount.synchronizeBalance();
    expect(bankAccount.getBalance()).toBe(newBalance);
    randomSpy.mockRestore();
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    const randomSpy = jest.spyOn(_, 'random').mockReturnValue(0);
    expect(() => bankAccount.synchronizeBalance()).rejects.toThrowError(
      SynchronizationFailedError,
    );
    randomSpy.mockRestore();
  });
});
