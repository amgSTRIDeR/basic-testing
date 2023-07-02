import _ from 'lodash';
import {
  getBankAccount,
  InsufficientFundsError,
  TransferFailedError,
  SynchronizationFailedError,
} from '.';

describe('BankAccount', () => {
  let bankAccount = getBankAccount(100);
  const momsFriendsSonsAccount = getBankAccount(1000000000000);

  beforeEach(() => {
    bankAccount = getBankAccount(100);
  });

  test('should create account with initial balance', () => {
    expect(bankAccount.getBalance()).toBe(100);
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    expect(() => bankAccount.withdraw(101)).toThrowError(
      InsufficientFundsError,
    );
  });

  test('should throw error when transferring more than balance', () => {
    expect(() =>
      bankAccount.transfer(101, momsFriendsSonsAccount),
    ).toThrowError(InsufficientFundsError);
  });

  test('should throw error when transferring to the same account', () => {
    expect(() => bankAccount.transfer(1, bankAccount)).toThrowError(
      TransferFailedError,
    );
  });

  test('should deposit money', () => {
    bankAccount.deposit(1);
    expect(bankAccount.getBalance()).toBe(101);
  });

  test('should withdraw money', () => {
    bankAccount.withdraw(1);
    expect(bankAccount.getBalance()).toBe(99);
  });

  test('should transfer money', () => {
    bankAccount.transfer(1, momsFriendsSonsAccount);
    expect(bankAccount.getBalance()).toBe(99);
    expect(momsFriendsSonsAccount.getBalance()).toBe(1000000000001);
  });

  test('fetchBalance should return number in case if request did not failed', async () => {
    jest.spyOn(_, 'random').mockReturnValue(1);
    const balance = await bankAccount.fetchBalance();
    expect(typeof balance).toBe('number');
  });

  test('should set new balance if fetchBalance returned number', async () => {
    jest.spyOn(_, 'random').mockReturnValue(1);

    await bankAccount.synchronizeBalance();
    expect(bankAccount.getBalance()).toBe(1);
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    jest.spyOn(_, 'random').mockReturnValue(0);

    await expect(bankAccount.synchronizeBalance()).rejects.toThrow(
      SynchronizationFailedError,
    );
  });
});
