import React, { useEffect, useState } from 'react'
import TabGroup from '@components/TabGroup'
import Profile from './Profile'
import Nfts from './Nfts'
import Drafts from './Drafts'
import Supporters from './Supporters'
import { useSelector } from 'react-redux'
import { RootState } from '@root/store/rootReducers'
import '@assets/css/pages/Player.css'

const PlayerDetailForm: React.FC = () => {
  const curTab = useSelector((state: RootState) => state.authentication.curTab)
  const [activeTab, setActiveTab] = useState(curTab)
  const playerCoinData = useSelector((state: RootState) => state.playercoins)
  const { getPlayerDetailsSuccessData } = playerCoinData
  const handleGetTab = (tab: string) => {
    setActiveTab(tab)
  }

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <section className="player-container">
      <>
        <div className="tab-bar-container">
          <TabGroup
            defaultTab={activeTab}
            tabSet={['profile', 'nft’s', 'drafts', 'supporters']}
            getSwitchedTab={handleGetTab}
          />
        </div>
        {activeTab === 'profile' && <Profile />}
        {activeTab === 'nft’s' && (
          <Nfts playerData={getPlayerDetailsSuccessData} />
        )}
        {activeTab === 'drafts' && <Drafts />}
        {activeTab === 'supporters' && (
          <Supporters playerData={getPlayerDetailsSuccessData} />
        )}
      </>
    </section>
  )
}

export default PlayerDetailForm
