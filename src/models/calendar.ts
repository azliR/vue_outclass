export interface Calendar {
  dtstart: Array<DtOption | string>
  dtend: Array<DtOption | string>
  rrule: Rrule
  dtstamp: string
  uid: string
  created: string
  description: string
  lastModified: string
  location: string
  sequence: string
  status: string
  summary: string
  transp: string
}

export interface DtOption {
  tzid: string
}

export interface Rrule {
  freq: string
  wkst: string
}
