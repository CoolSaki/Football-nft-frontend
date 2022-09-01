import React, { useState } from 'react'
import SubmitButton from '@components/SubmitButton'
import { useTranslation } from 'react-i18next'

interface Props {
  onSubmit: (v?: any) => void
  onClose: () => void
}

const StakeForm: React.FC<Props> = ({ onSubmit, onClose }) => {
  const { t } = useTranslation()
  const [input, setInput] = useState('')

  const stopPropagation = (event: any) => {
    event.stopPropagation()
  }

  return (
    <div className="bid-container" onClick={stopPropagation}>
      <div className="bid-title">{t('stake coins to bid')}</div>
      {/* <div className="heading-header">{t('stake coins to bid')}</div> */}
      <div className="bid-desc">{t('no player coins staked to buy this')}</div>
      <div className="bid-submit">
        <SubmitButton
          isDisabled={false}
          title={t('stake coins')}
          className="m-0auto stake-mode"
          onPress={onSubmit}
        />
        <SubmitButton
          isDisabled={false}
          title={t('buy player coins')}
          className="stake-buy-btn"
          onPress={onSubmit}
        />
        <div className="nft-close-link" onClick={onClose}>
          {t('close')}
        </div>
      </div>
    </div>
  )
}

export default StakeForm
