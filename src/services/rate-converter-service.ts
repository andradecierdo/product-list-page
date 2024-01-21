export interface IRateConversion {
  conversion: number
}

export interface IRateConverter<R> {
  convertRate(value: number, from: R, to: R): number
}

export abstract class RateConverterService<R extends IRateConversion> implements IRateConverter<R>{

  protected constructor(private precision: number = 2) {}

  private roundValue(value: number): number {
    const precision = 10 ** this.precision
    return Math.round(value * precision) / precision
  }

  private convertToBase(value: number, { conversion }: R): number {
    return this.roundValue(value / conversion)
  }

  private convertFromBase(value: number, { conversion }: R): number {
    return this.roundValue(value * conversion)
  }

  convertRate(value: number, from: R, to: R): number {
    return this.convertFromBase(this.convertToBase(value, from), to)
  }
}
