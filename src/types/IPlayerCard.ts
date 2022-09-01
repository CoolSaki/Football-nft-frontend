interface exchangeRate {
  fromticker: string
  rate: number
  ratetimestamp: number
  toticker: string
}
export interface IPlayerCard {
  id?: number
  exchangeRateUSD: exchangeRate
  name: string
  ethPrice?: number
  matic_price: number
  matic: number
  usd_price: number
  '24h_change': number
  coin_issued: number
  price: number
  playercontractsubscriptionstart: number,
  time: string
  img: string
  playerpicture: string
  profileLink: string
  changedPrice: string
  coinIssued: number
  holders: number
  detailpageurl: string
}