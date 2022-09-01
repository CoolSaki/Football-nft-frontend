import React, { useEffect, useState } from 'react'
import TabGroup from '@components/TabGroup'
import CreateWallet from './CreateWallet'
import CreateSecret from './CreateSecret'
import MyWallet from './MyWallet'
import PlayerCoins from './PlayerCoins'
import { useDispatch, useSelector } from 'react-redux'
import Nfts from './Nfts'
import { RootState } from '@root/store/rootReducers'
import {
  getWalletAddress,
  getWalletDetails,
} from '@root/apis/onboarding/authenticationSlice'

const WalletForm: React.FC = () => {
  const dispatch = useDispatch()
  const [activeTab, setActiveTab] = useState('balance')
  const [isSecretForm, toggleSecretForm] = useState(false)
  const [isWalletOpen, setIsWalletOpen] = useState(false)
  const authenticationData = useSelector(
    (state: RootState) => state.authentication,
  )
  const { isWalletCreatedSuccess } = authenticationData
  const loginInfo = localStorage.getItem('loginInfo')

  const handleGetTab = (tab: string) => {
    setActiveTab(tab)
  }
  //  GET_WALLET_API_NOT_TO_BE_USED_NOW
  React.useEffect(() => {
    if (loginInfo) {
      dispatch(getWalletAddress(loginInfo))
    } else {
      dispatch(getWalletDetails())
    }
  }, [isWalletCreatedSuccess])

  useEffect(() => {
    if (activeTab === 'balance') {
      toggleSecretForm(false)
      if (!authenticationData.userName && loginInfo) setIsWalletOpen(true)
      else setIsWalletOpen(false)
    }
  }, [activeTab])

  const handleSubmit = () => {
    toggleSecretForm(!isSecretForm)
  }
  const handleSecretSubmit = () => {
    toggleSecretForm(!isSecretForm)
    setIsWalletOpen(!isWalletOpen)
  }

  const handleWalletSubmit = () => {
    console.log('wallet created')
  }

  return (
    <section className="wallet-container">
      <div className="fullwidth">
        <TabGroup
          inactiveIndices={[1, 2]}
          defaultTab={activeTab}
          tabSet={['balance', 'player coins', 'nft’s']}
          tabClassName="wallet-tab"
          getSwitchedTab={handleGetTab}
        />
      </div>
      {activeTab === 'player coins' ? (
        <PlayerCoins />
      ) : activeTab === 'balance' ? (
        <>
          {isSecretForm && !isWalletCreatedSuccess ? (
            <CreateSecret onSubmit={handleSecretSubmit} />
          ) : isWalletCreatedSuccess ||
            authenticationData?.userWalletData?.address ? (
            <MyWallet onSubmit={handleWalletSubmit} />
          ) : (
            <CreateWallet onSubmit={handleSubmit} />
          )}
        </>
      ) : (
        <Nfts />
      )}
    </section>
  )
}

export default WalletForm
