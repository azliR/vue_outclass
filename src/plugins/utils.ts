import dayjs from 'dayjs'

export function isValidUrl(string: string) {
  let url

  try {
    url = new URL(string)
  } catch (_) {
    return false
  }

  return url.protocol === 'http:' || url.protocol === 'https:'
}

export function formatDate(date: Date, format: string): string {
  return dayjs(date).format(format)
}
