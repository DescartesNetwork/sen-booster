import { PayRateState } from 'actions/createBooster/payRate'

export const DATE_FORMAT = 'MMM DD, YYYY HH:mm'

export const ALL = 'all'

export const SECONDS_PER_DAY = 24 * 60 * 60

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
// Booster's category with User Mode
export enum UserBoosterCategory {
  LPHighToLow = 'LP paid: High to low',
  LPLowToHigh = 'LP paid: Low to high',
  RateHighToLow = 'Buy-back rate: High to low',
  RateLowToHigh = 'Buy-back rate: Low to high',
}
export const USER_BOOSTER_CATEGORIES = Object.entries(UserBoosterCategory).map(
  ([_, value]) => value,
)

export enum RetailerBoosterCategory {
  AvailableBooster = 'Available booster',
  BoostOnly = 'Boost only',
  ExpiredBooster = 'Expired booster',
}

export const LOCK_TIME_DAY: Record<string, number> = {
  '7 days': 7,
  '30 days': 30,
  '60 days': 60,
  '90 days': 90,
  '120 days': 120,
  '365 days': 365,
}

export const TIME_FILTER_OPTIONS = [
  { key: 'Past 7 days', value: 7 },
  { key: 'Past 30 days', value: 30 },
]

export const STATUS_OPTIONS = {
  retailer: [
    { key: 'All', value: ALL },
    { key: 'Approved', value: 'approved' },
    { key: 'Reject', value: 'reject' },
    { key: 'Done', value: 'done' },
    { key: 'Open', value: 'open' },
  ],
  user: [
    { key: 'All', value: ALL },
    { key: 'Approved', value: 'approved' },
    { key: 'Canceled', value: 'canceled' },
    { key: 'Done', value: 'done' },
    { key: 'Waiting', value: 'open' },
  ],
}

export type BoosterMetadata = {
  payRate: PayRateState
  budget: number
}
