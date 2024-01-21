export function sortByProperty<D extends { [key: string]: any }>(data: D[], key: string, desc = true): D[] {
  return data.sort((a, b) => {
    const sort = desc ? a[key] - b[key] : b[key] - a[key]
    if (isNaN(sort)) {
      return desc ? a[key].toString().localeCompare(b[key]) : b[key].toString().localeCompare(a[key])
    }
    return sort
  })
}
