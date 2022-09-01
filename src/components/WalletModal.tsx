/* eslint-disable no-unused-vars */
import React, { useContext, useEffect, useState } from 'react'
import Modal from 'react-modal'
import classnames from 'classnames'
import '@assets/css/components/WalletModal.css'
import MetamaskIcon from '@assets/icons/icon/metamask.svg'
import CoinbaseIcon from '@assets/icons/icon/coinbase.svg'
import TrustIcon from '@assets/icons/icon/trust.svg'
import WalletConnectIcon from '@assets/icons/icon/walletconnect.svg'
import { useTranslation } from 'react-i18next'
import { ConnectContext } from '@root/WalletConnectProvider'
import { useDispatch } from 'react-redux'
import { loginWithWallet } from '@root/apis/onboarding/authenticationSlice'
import { useNavigate } from 'react-router-dom'

interface Props {
  isOpen: boolean
  onClick: (v?: any) => void
  onClose: (v?: any) => void
}

Modal.setAppElement('#root')

const WalletModal: React.FC<Props> = ({ isOpen, onClick, onClose }) => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { connectStatus, connect } = useContext(ConnectContext)
  const [isFirstConnect, setIsFirstConnect] = useState(true)

  const handleConnect = async (wallet: string) => {
    await connect(wallet)
  }

  const loginId = localStorage.getItem('loginId')

  useEffect(() => {
    setIsFirstConnect(false)
    if (!loginId && !isFirstConnect && connectStatus) {
      dispatch(loginWithWallet())
      navigate('/')
      onClick()
    }
  }, [connectStatus])

  return (
    <div
      id="walletModal"
      className={classnames('modal', 'wallet-modal', isOpen ? 'show' : '')}
    >
      <div className="wallet-modal-content">
        <button className="wallet-modal-close">
          <span onClick={onClose}>&times;</span>
        </button>
        <div
          className="wallet-modal-btn"
          onClick={() => handleConnect('WalletConnect')}
        >
          <img
            loading="lazy"
            src={WalletConnectIcon}
            alt="walletconnect-icon"
          />
          <span>WalletConnect</span>
        </div>
        <div
          className="wallet-modal-btn"
          onClick={() => handleConnect('Metamask')}
        >
          <img loading="lazy" src={MetamaskIcon} alt="metamask-icon" />
          <span>Metamask</span>
        </div>
        <div
          className="wallet-modal-btn"
          onClick={() => handleConnect('Coinbase')}
        >
          <img loading="lazy" src={CoinbaseIcon} alt="coinbase-icon" />
          <span>Coinbase</span>
        </div>
        <div
          className="wallet-modal-btn"
          onClick={() => handleConnect('Trust')}
        >
          <img loading="lazy" src={TrustIcon} alt="trust-icon" />
          <span>Trust</span>
        </div>
      </div>
    </div>
  )
}

export default WalletModal
