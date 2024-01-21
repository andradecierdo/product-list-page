import { IRateConversion, RateConverterService } from './rate-converter-service'
import { CURRENCY_RATES } from '../utilities/constants'

export enum Currency {
  NZD = 'NZD',
  USD = 'USD',
  EURO = 'EURO',
}

export interface ICurrencyConversion extends IRateConversion {
  currency: Currency
}

export interface ICurrencyConverterService {
  convertCurrency(value: number, from: Currency, to: Currency): number
}

const defaultCurrencyConversions: ICurrencyConversion[] = [
  {
    currency: Currency.NZD,
    conversion: CURRENCY_RATES.NZD,
  },
  {
    currency: Currency.USD,
    conversion: CURRENCY_RATES.USD,
  },
  {
    currency: Currency.EURO,
    conversion: CURRENCY_RATES.EURO,
  },
]

export class CurrencyConverterService extends RateConverterService<ICurrencyConversion> implements ICurrencyConverterService {
  private currencyConversions: Map<Currency, ICurrencyConversion>

  constructor(currencyConversions: ICurrencyConversion[] = []) {
    super()
    const conversions = currencyConversions.length ? currencyConversions : defaultCurrencyConversions
    this.currencyConversions = new Map<Currency, ICurrencyConversion>(conversions.map(o => [o.currency, o]))
  }

  convertCurrency(value: number, from: Currency, to: Currency): number {
    const fromCurrency = this.currencyConversions.get(from)
    const toCurrency = this.currencyConversions.get(to)

    if (!fromCurrency || !toCurrency) {
      throw new Error('Invalid Currency!')
    }

    return super.convertRate(value, fromCurrency, toCurrency)
  }
}
