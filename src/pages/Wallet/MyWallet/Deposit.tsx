import React, { useState, useEffect } from 'react'
import { Formik } from 'formik'
import ContentCopyIcon from '@mui/icons-material/ContentCopy'
import classnames from 'classnames'
import { useSelector } from 'react-redux'
import { RootState } from '@root/store/rootReducers'
import { useTranslation } from 'react-i18next'
interface Props {
  title: string
  address?: string
  containerClassName?: string
  onClose: () => void
}

const Deposit: React.FC<Props> = ({
  containerClassName = '',
  title,
  address,
  onClose,
}) => {
  const [isAddressCopied, setAddressCopied] = useState(false)
  const { t } = useTranslation()
  const handleCopy = () => {
    setAddressCopied(!isAddressCopied)
    navigator.clipboard.writeText(address ?? 's')
  }

  return (
    <section
      className={classnames(
        'wallet-container deposit-address-container',
        containerClassName,
      )}
    >
      <div className="fullwidth m0-auto mb-20 wallet-heading mt-40 passphrase-heading">
        <p className="sub-title">{title}</p>
      </div>
      <div className="address-box m0-auto">
        <p>{address}</p>
        <div className="flex-center">
          <div
            className="copy-button tooltip"
            onClick={() => handleCopy()}
            onMouseLeave={() => setAddressCopied(false)}
          >
            <span
              className={classnames(
                'tooltiptext',
                isAddressCopied ? 'tooltip-visible' : '',
              )}
            >
              {t('copied')}
            </span>
          </div>
        </div>
      </div>
      <div className="green-line-btn deposit-cancel" onClick={onClose}>
        {t('close')}
      </div>
    </section>
  )
}

export default Deposit
