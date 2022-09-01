import React from 'react'
import classNames from 'classnames'
import '@assets/css/components/Spinner.css'
import { RootState } from '@root/store/rootReducers'
import { useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'
import approxIcon from '@assets/images/approximation.png'
import dollarIcon from '@assets/images/dollar_mecarreira.png'
import maticIcon from '@assets/images/matic-token-icon.png'

interface Props {
  logoSet: any
  labelBottom: string
  valueBottom: string
  unit: string
  isInsufficientMatics?: boolean
  isInactive?: boolean
  title: string
  className?: string
  onPress?: () => void
}

const PaymentMethodCard: React.FC<Props> = props => {
  const { t } = useTranslation()

  return (
    <div className="method-card">
      <div className="h-4">{props?.title}</div>
      <div className="pay-logo-wrapper">
        {props.logoSet.map((item: any) => (
          <img src={item?.img} alt="" />
        ))}
      </div>
      {props.isInsufficientMatics ? (
        <div className="danger-funds">Not Enough Balance</div>
      ) : (
        <div className="pay-details-wrapper">
          <div className="pay-detail">{props?.labelBottom}</div>
          <div className="pay-detail">
            <img src={approxIcon} className="currency-icon" alt="" />
            <span>{props?.valueBottom}</span>
            <img
              src={props?.unit === 'matic' ? maticIcon : dollarIcon}
              className="currency-icon"
              alt=""
            />
          </div>
        </div>
      )}
    </div>
  )
}

export default PaymentMethodCard
