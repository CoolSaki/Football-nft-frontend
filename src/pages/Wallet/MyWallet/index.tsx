import React, { useState, useEffect, useContext } from 'react'
import { useTranslation } from 'react-i18next'
import classnames from 'classnames'
import SubmitButton from '@components/SubmitButton'
import IosShareIcon from '@mui/icons-material/IosShare'
import '@assets/css/pages/Wallet.css'
import BottomPopup from '@components/BottomPopup'
import Send from './Send'
import PassPhrase from './PassPhrase'
import Deposit from './Deposit'
import { isMobile } from '@utils/helpers'
import { useDispatch, useSelector } from 'react-redux'
import {
  exportKeyReset,
  getWalletAddress,
  getWalletDetails,
  sendMaticsMetamask,
  sendMaticsReset,
} from '@root/apis/onboarding/authenticationSlice'
import { RootState } from '@root/store/rootReducers'
import ExportPrivateKey from './ExportPrivateKey'
import { ConnectContext } from '@root/WalletConnectProvider'

interface Props {
  onSubmit: any
}

const MyWallet: React.FC<Props> = ({ onSubmit }) => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const [fixedRate, setFixedRate] = useState('')
  const [isSendMatic, setSendMatic] = useState(false)
  const [isDepositSelected, setDepositSelected] = useState(false)
  const [transactionData, setTransactionData] = useState(null)
  const [isSecretAcquired, setAquireSecret] = useState(false)
  const [isExportKeyOpted, setExportKeyOpted] = useState(false)
  const [balance, setBalance] = useState<any>('0.00')
  const [usdBalance, setUsdBalance] = useState<any>()
  const loginInfo = localStorage.getItem('loginInfo')
  const { sendWithWallet, getBalance } = useContext(ConnectContext)

  const authenticationData = useSelector(
    (state: RootState) => state.authentication,
  )

  const {
    loader,
    userWalletData: { address, USDBalance, exchangeRateData },
  } = authenticationData

  useEffect(() => {
    const _getBalance = async () => {
      if (loginInfo) {
        await getBalance()
      }
      const matic = localStorage.getItem('balance')
      const usd = (parseFloat(matic || '') * exchangeRateData.rate).toFixed(3)
      setBalance(matic)
      setUsdBalance(usd)
    }
    _getBalance()
  }, [])

  useEffect(() => {
    console.log('newBal---', balance)
  }, [balance])

  const handleRefreshBalance = async (event: any) => {
    event.preventDefault()
    if (loginInfo) {
      dispatch(getWalletAddress(loginInfo))
      await getBalance()
    } else {
      dispatch(getWalletDetails())
    }
    const matic = localStorage.getItem('balance')
    const usd = (parseFloat(matic || '') * exchangeRateData.rate).toFixed(3)
    setBalance(matic)
    setUsdBalance(usd)
  }

  const handleFetchTransactionData = (data: any) => {
    if (loginInfo) {
      // dispatch(sendMaticsMetamask())
      sendWithWallet(data.to_address, data.amount)
      setTimeout(() => {
        handleCloseSecret()
        dispatch(sendMaticsReset())
      }, 2000)
    } else {
      setTransactionData(data)
      setAquireSecret(true)
      dispatch(sendMaticsReset())
    }
  }

  const handleCloseSecret = () => {
    setAquireSecret(false)
    setSendMatic(false)
    setDepositSelected(false)
  }

  const handleCloseExport = () => {
    setExportKeyOpted(false)
    setSendMatic(false)
    dispatch(exportKeyReset())
  }

  const handleExportKey = (evt: any) => {
    evt.preventDefault()
    setExportKeyOpted(true)
    setSendMatic(true)
  }

  return (
    <div
      className={classnames(
        'purchase-container wallet-wrapper',
        isMobile() ? 'mobile-wrapper' : '',
      )}
    >
      <BottomPopup mode="wallet" isOpen={isSendMatic && !isExportKeyOpted}>
        {isSendMatic && !isExportKeyOpted ? (
          <Send
            onSubmit={handleFetchTransactionData}
            onClose={() => handleCloseSecret()}
          />
        ) : null}
      </BottomPopup>
      <BottomPopup mode="wallet" isOpen={isSecretAcquired}>
        {isSecretAcquired ? (
          <PassPhrase
            onClose={() => handleCloseSecret()}
            transactionData={transactionData}
          />
        ) : null}
      </BottomPopup>
      <BottomPopup mode="wallet" isOpen={isDepositSelected}>
        {isDepositSelected ? (
          <Deposit
            title={t('my MATIC Deposit Address')}
            address={address}
            onClose={() => handleCloseSecret()}
          />
        ) : null}
      </BottomPopup>
      {isExportKeyOpted ? (
        <BottomPopup mode="wallet" isOpen={isExportKeyOpted}>
          <ExportPrivateKey onClose={() => handleCloseExport()} />
        </BottomPopup>
      ) : null}
      {loader ? (
        <div className="balance-progress">
          <div
            className={classnames(
              'loading-spinner-container mb-40 mt-40',
              'show',
            )}
          >
            <div className="loading-spinner">
              <div className="spinner__circle">
                <div className="spinner__circle-gradient"></div>
                <div className="spinner__circle-inner"></div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <>
          <div className="balance-card">
            <h2 className="wallet-heading total-balance">
              $
              {!isNaN(usdBalance) && balance !== null
                ? '' + usdBalance
                : '0.00'}{' '}
              USD
            </h2>
            <p className="wallet-text eth-amt">
              {!isNaN(balance) && balance !== null ? ' ' + balance : '0.00'}{' '}
              MATIC
            </p>
            <div className="balance-control-wrapper">
              <p onClick={handleRefreshBalance}>{t('refresh')}</p>
            </div>
          </div>
          <div className="wallet-btn-container">
            <SubmitButton
              isDisabled={false}
              title={t('buy')}
              className="wallet-btn disabled"
              onPress={() => console.log('')}
            />
            <SubmitButton
              isDisabled={false}
              title={t('send')}
              className="wallet-btn disabled"
              onPress={() => setSendMatic(true)}
            />
            <SubmitButton
              isDisabled={false}
              title={t('deposit')}
              className="wallet-btn"
              onPress={() => setDepositSelected(true)}
            />
          </div>
          {!loginInfo ? (
            <div
              className="wallet-text export-key-text"
              onClick={handleExportKey}
            >
              {' '}
              <IosShareIcon />
              <span>{t('export private key')}</span>
            </div>
          ) : null}
        </>
      )}
    </div>
  )
}

export default MyWallet
