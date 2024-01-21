import { describe, expect, test } from '@jest/globals'
import { Currency, NzdConverterService } from '../services'

describe('NZD Converter Service', () => {
  const nzdConverterService = new NzdConverterService()

  test('converts currency from NZD to NZD', () => {
    const result = nzdConverterService.convert(1, Currency.NZD)
    expect(result).toBe(1)
  })

  test('converts currency from NZD to USD', () => {
    const result = nzdConverterService.convert(10, Currency.USD)
    expect(result).toBe(7.6)
  })

  test('converts currency from NZD to EURO', () => {
    const result = nzdConverterService.convert(20, Currency.EURO)
    expect(result).toBe(13.4)
  })
})
