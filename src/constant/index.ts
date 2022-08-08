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
  LPHighToLow = 'LP sold: High to low',
  LPLowToHigh = 'LP sold: Low to high',
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
  'No lock time': 0,
  '30 days': 30,
  '60 days': 60,
  '90 days': 90,
  '120 days': 120,
  '365 days': 365,
}

export const TIME_FILTER_OPTIONS = [
  { key: 'Past 30 days', value: 30 },
  { key: 'Past 60 days', value: 60 },
  { key: 'Past 90 days', value: 90 },
  { key: 'Past 120 days', value: 120 },
  { key: 'Past 365 days', value: 365 },
]

export const STATUS_OPTIONS = {
  retailer: [
    { key: 'All', value: ALL },
    { key: 'Approved', value: 'approved' },
    { key: 'Open', value: 'open' },
    { key: 'Done', value: 'done' },
    { key: 'Rejected', value: 'rejected' },
  ],
  user: [
    { key: 'All', value: ALL },
    { key: 'Ready', value: 'ready' },
    { key: 'Approved', value: 'approved' },
    { key: 'Waiting', value: 'open' },
    { key: 'Done', value: 'done' },
    { key: 'Canceled', value: 'canceled' },
    { key: 'Rejected', value: 'rejected' },
  ],
}

export type BoosterMetadata = {
  payRate: PayRateState
  budget: number
}
