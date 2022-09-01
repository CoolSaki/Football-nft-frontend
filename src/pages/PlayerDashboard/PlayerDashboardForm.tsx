import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router'
import '@assets/css/pages/PlayerDashboard.css'
import { useTranslation } from 'react-i18next'
import TabGroup from '@components/TabGroup'
import Nfts from './Nfts'
import PlayerCoin from './PlayerCoin'
import Voting from './Voting'
import Drafts from './Drafts'
import PlayerCoinRequest from './PlayerCoinRequest'
import PlayerCoinLaunch from './PlayerCoinLaunch'
import { useDispatch, useSelector } from 'react-redux'
import { getPlayerData } from '@root/apis/playerCoins/playerCoinsSlice'
import { logout } from '@root/apis/onboarding/authenticationSlice'
import { RootState } from '@root/store/rootReducers'
import { asyncLocalStorage } from '@utils/helpers'
import classNames from 'classnames'

interface Props {
  isOpen?: boolean
}
const PlayerDashboardForm: React.FC<Props> = ({ isOpen }) => {
  const playerStatus = localStorage.getItem('PLAYER_STATUS')
  const { t } = useTranslation()
  const navigate = useNavigate()
  const location = useLocation()
  const dispatch = useDispatch()
  const [activeTab, setActiveTab] = useState('player coins')
  const [isNoPlayer, setIsNoPlayer] = useState<number>(0)
  const [status, setStatus] = useState('')
  const handleGetTab = (tab: string) => {
    setActiveTab(tab)
  }
  const playerCoinData = useSelector((state: RootState) => state.playercoins)
  const { allPlayersData, tokenExpired, isGetPlayerError, tempAlteration } =
    playerCoinData

  useEffect(() => {
    // if (
    //   allPlayersData.length > 0 &&
    //   allPlayersData[0]?.playerstatusid?.id > 1
    // ) {
    //   // setStatus('Launch')
    //   setStatus(allPlayersData[0]?.playerstatusid?.playerstatusname)
    // }
    // console.log({ allPlayersData })
    console.log('kkoopp---', allPlayersData)
    if (allPlayersData.length === 0) {
      console.log('no allplayers')
      setIsNoPlayer(isNoPlayer + 1)
    } else {
      console.log('allplayers foud')
    }
  }, [allPlayersData])

  useEffect(() => {
    window.scrollTo(0, 0)
    console.log({ location })
    console.log('PDFMOUNTED')
    if (location.pathname !== '/menu') {
      dispatch(getPlayerData())
    }
  }, [])

  useEffect(() => {
    console.log({ isNoPlayer })
  }, [isNoPlayer])
  return (
    <section
      className={classNames(
        'player-dashboard-container',
        !allPlayersData[0]?.playerstatusid?.playerstatusname
          ? '' //'loader-center'
          : '',
      )}
    >
      {/* <div
        className={classNames(
          'balance-progress',
          // !allPlayersData[0]?.playerstatusid?.playerstatusname &&
          isNoPlayer <= 1 &&
            !allPlayersData[0]?.playerstatusid?.playerstatusname
            ? ''
            : 'hidden',
        )}
      >
        <div
          className={classNames(
            'loading-spinner-container mb-40 mt-40',
            'show',
          )}
        >
          {isGetPlayerError ? (
            <div className="input-feedback text-center">{isGetPlayerError}</div>
          ) : (
            <div className="loading-spinner">
              <div className="spinner__circle">
                <div className="spinner__circle-gradient"></div>
                <div className="spinner__circle-inner"></div>
              </div>
            </div>
          )}
        </div>
      </div> */}
      {allPlayersData[0]?.playerstatusid?.playerstatusname === 'Pending' ||
      allPlayersData.length === 0 ? (
        <PlayerCoinRequest onSubmit={() => setStatus('Launch')} />
      ) : // <Voting />
      null}
      {allPlayersData[0]?.playerstatusid?.playerstatusname === 'Verified' ? (
        <PlayerCoinLaunch onSubmit={() => setStatus('Main')} />
      ) : null}
      {allPlayersData[0]?.playerstatusid?.playerstatusname === 'Deployed' ||
      allPlayersData[0]?.playerstatusid?.id === 4 ? (
        <div className="main-tabwrapper">
          <TabGroup
            defaultTab={activeTab}
            tabSet={['player coins', 'nft’s', 'voting', 'drafts']}
            getSwitchedTab={handleGetTab}
          />
        </div>
      ) : null}
      {(['Deployed', 'Subscription'].includes(
        allPlayersData[0]?.playerstatusid?.playerstatusname,
      ) ||
        allPlayersData[0]?.playerstatusid?.id === 4) &&
        activeTab === 'player coins' && <PlayerCoin />}
      {/* {['Deployed', 'Subscription'].includes(
        allPlayersData[0]?.playerstatusid?.playerstatusname,
      ) ||
        (allPlayersData[0]?.playerstatusid?.id === 4 &&
          activeTab === 'player coins' && <PlayerCoin />)} */}
      {(['Deployed', 'Subscription'].includes(
        allPlayersData[0]?.playerstatusid?.playerstatusname,
      ) ||
        allPlayersData[0]?.playerstatusid?.id === 4) &&
        activeTab === 'nft’s' && <Nfts />}
      {(['Deployed', 'Subscription'].includes(
        allPlayersData[0]?.playerstatusid?.playerstatusname,
      ) ||
        allPlayersData[0]?.playerstatusid?.id === 4) &&
        activeTab === 'voting' && <Voting />}
      {(['Deployed', 'Subscription'].includes(
        allPlayersData[0]?.playerstatusid?.playerstatusname,
      ) ||
        allPlayersData[0]?.playerstatusid?.id === 4) &&
        activeTab === 'drafts' && <Drafts />}
    </section>
  )
}

export default PlayerDashboardForm
