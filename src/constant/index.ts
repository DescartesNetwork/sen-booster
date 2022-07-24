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

export const DATES = [
  { name: '7 days', value: 7 },
  { name: '30 days', value: 30 },
  { name: '60 days', value: 60 },
  { name: '90 days', value: 90 },
  { name: '120 days', value: 120 },
  { name: '365 days', value: 365 },
]

export const FORMAT_DATE = 'MMM DD, YYYY HH:mm'

export const TOKEN =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDg4MzdCZUI2ODM5MTcwODZjQUI3OTU0MzI3ZTgwOWU1ZTlCZTc2NTEiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2NTU0NTU5NzI5MjAsIm5hbWUiOiJTZW50cmUifQ.Jf7oQOKMrBxp5morvs7DR_As4EU9Y5WybyuvY1teFN8'
