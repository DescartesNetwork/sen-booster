export enum TabId {
  Booster = 'booster',
  Redeem = 'redeem',
  BoostList = 'boost-list',
  OrderList = 'order-list',
}

export enum Mode {
  User = 'user',
  Retailer = 'retailer',
}

export enum UserBoosterCategory {
  AllBooster = 'All booster',
  HotBooster = 'Hot booster',
  HighBuyBackRate = 'High buy-back rate',
  BoostOnly = 'Boost only',
}

export enum RetailerBoosterCategory {
  AvailableBooster = 'Available booster',
  BoostOnly = 'Boost only',
  ExpiredBooster = 'Expired booster',
}

export type RedeemDataSource = {
  lastUpdate: string
  orderId: string
  lockTime: string
  state: string
}

export enum OrderState {
  Pending = 'pending',
  Approved = 'approved',
  Done = 'done',
  Rejected = 'rejected',
}

export const FORMAT_DATE = 'MMM DD, YYYY HH:mm'

export const TOKEN =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDg4MzdCZUI2ODM5MTcwODZjQUI3OTU0MzI3ZTgwOWU1ZTlCZTc2NTEiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2NTU0NTU5NzI5MjAsIm5hbWUiOiJTZW50cmUifQ.Jf7oQOKMrBxp5morvs7DR_As4EU9Y5WybyuvY1teFN8'

export const ALL = 'all'

export const TIME_OPTIONS = [
  { key: 'Past 7 days', value: 7 },
  { key: 'Past 30 days', value: 30 },
]

export const STATUS_OPTIONS = [
  { key: 'All', value: ALL },
  { key: 'Pending', value: 'pending' },
  { key: 'Approved', value: 'approved' },
  { key: 'Reject', value: 'reject' },
  { key: 'Done', value: 'done' },
]
