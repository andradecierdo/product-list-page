import { Currency, CurrencyConverterService } from './currency-converter-service'

export class NzdConverterService extends CurrencyConverterService {
  convert(value: number, toCurrency: Currency): number {
    return super.convertCurrency(value, Currency.NZD, toCurrency)
  }
}
