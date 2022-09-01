import React from 'react'
import classNames from 'classnames'
import '@assets/css/components/Spinner.css'
import { RootState } from '@root/store/rootReducers'
import { useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'

interface Props {
  disabled?: boolean
  isInactive?: boolean
  title?: string
  className?: string
  onPress: () => void
}

const PurchaseButton: React.FC<Props> = props => {
  const { t } = useTranslation()
  const { disabled, title = '', className = '', onPress, isInactive } = props
  const authenticationData = useSelector(
    (state: RootState) => state.authentication,
  )
  const { loadingBuy } = authenticationData

  return (
    <>
      <div
        className={classNames(
          'spinner__circle size-small',
          loadingBuy ? '' : 'hidden',
        )}
      >
        <div className="spinner__circle-gradient"></div>
        <div className="spinner__circle-inner"></div>
      </div>
      <button
        type="submit"
        disabled={disabled}
        className={classNames(
          `purchase-btn ${className}`,
          // isInactive ? 'btn-disabled' : '',
          disabled || loadingBuy ? 'hide' : '',
        )}
        onClick={onPress}
      >
        {t(title)}
      </button>
    </>
  )
}

export default PurchaseButton
