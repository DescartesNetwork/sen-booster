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
  '1 day': 1,
  '7 days': 7,
  '30 days': 30,
  '60 days': 60,
  '90 days': 90,
  '120 days': 120,
  '365 days': 365,
  '1 month': 30,
  '2 months': 60,
  '3 months': 90,
  '4 months': 120,
  '1 year': 365,
  '2 years': 730,
}

export const TIME_FILTER_OPTIONS = [
  { key: 'Last 1 month', value: 30 },
  { key: 'Last 2 months', value: 60 },
  { key: 'Last 3 months', value: 90 },
  { key: 'Last 4 months', value: 120 },
  { key: 'Last 1 year', value: 365 },
  { key: 'Last 2 years', value: 730 },
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
