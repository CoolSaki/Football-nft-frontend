import purchases from '@root/apis/purchase/purchaseSlice'
import authentication from '@root/apis/onboarding/authenticationSlice'
import wallet from '@root/apis/wallet/walletSlice'
import playercoins from '@root/apis/playerCoins/playerCoinsSlice'
import playerstats from '@root/apis/playerStats/playerStatsSlice'
import careers from '@root/apis/careers/careersSlice'
import notification from '@root/apis/notification/notificationSlice'
import nftnavigation from '@root/apis/commonSlice'

export const rootReducer = {
  authentication,
  playercoins,
  playerstats,
  purchases,
  wallet,
  careers,
  notification,
  nftnavigation,
}

export type RootState = ReturnType<typeof rootReducer>
