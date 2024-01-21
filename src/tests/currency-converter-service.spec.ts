import { describe, expect, test } from '@jest/globals'
import { Currency, CurrencyConverterService } from '../services'

describe('Currency Converter Service', () => {
  const currencyConverter = new CurrencyConverterService()

  test('converts currency from NZD to NZD', () => {
    const result = currencyConverter.convertCurrency(2, Currency.NZD, Currency.NZD)
    expect(result).toBe(2)
  })

  test('converts currency from NZD to USD', () => {
    const result = currencyConverter.convertCurrency(11, Currency.NZD, Currency.USD)
    expect(result).toBe(8.36)
  })

  test('converts currency from NZD to USD', () => {
    const result = currencyConverter.convertCurrency(23, Currency.NZD, Currency.EURO)
    expect(result).toBe(15.41)
  })

  test('converts currency from USD to NZD', () => {
    const result = currencyConverter.convertCurrency(66, Currency.USD, Currency.NZD)
    expect(result).toBe(86.84)
  })

  test('converts currency from USD to EURO', () => {
    const result = currencyConverter.convertCurrency(35, Currency.USD, Currency.EURO)
    expect(result).toBe(30.85)
  })

  test('converts currency from USD to USD', () => {
    const result = currencyConverter.convertCurrency(3, Currency.USD, Currency.USD)
    expect(result).toBe(3)
  })

  test('converts currency from EURO to EURO', () => {
    const result = currencyConverter.convertCurrency(5, Currency.EURO, Currency.EURO)
    expect(result).toBe(5)
  })

  test('converts currency from EURO to NZD', () => {
    const result = currencyConverter.convertCurrency(78, Currency.EURO, Currency.NZD)
    expect(result).toBe(116.42)
  })

  test('converts currency from EURO to USD', () => {
    const result = currencyConverter.convertCurrency(89, Currency.EURO, Currency.USD)
    expect(result).toBe(100.96)
  })
})
