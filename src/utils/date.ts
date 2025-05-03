import dayjs from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat'

dayjs.extend(customParseFormat)

export function formatDateYearMonthDay(input: Date | string | number): string {
  return dayjs(input).format('YYYY-MM-DD')
}

export function formatDateDayMonthYear(input: Date | string | number): string {
  return dayjs(input).format('DD/MM/YYYY')
}

export function formatTimeOption(value: string | number): string {
  const numericValue = parseFloat(value.toString())
  const hour = Math.floor(numericValue)
  const fractionalPart = numericValue - hour
  const minutes = fractionalPart !== 0 ? '30' : '00'

  return `${hour.toString().padStart(2, '0')}:${minutes}`
}

export function formatToIsoDate(dateStr: string): string {
  return dayjs(dateStr, 'DD/MM/YYYY').format('YYYY-MM-DD')
}
