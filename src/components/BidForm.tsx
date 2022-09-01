import React, { useState } from 'react'
import SubmitButton from '@components/SubmitButton'
import { useTranslation } from 'react-i18next'

interface Props {
  onSubmit: (v?: any) => void
  onClose: () => void
}

const BidForm: React.FC<Props> = ({ onSubmit, onClose }) => {
  const { t } = useTranslation()
  const [input, setInput] = useState('')

  const stopPropagation = (event: any) => {
    event.stopPropagation()
  }

  return (
    <div className="bid-container" onClick={stopPropagation}>
      <div className="bid-title">{t('place bid')}</div>
      <div className="bid-desc">{t('you must place a bid')}</div>
      <div className="bid-enter">
        <div className="bid-enter-label">{t('enter bid')}:</div>
        <input
          type="text"
          className="bid-enter-input"
          placeholder={t('amount')}
          value={input}
          onInput={(e: any) => setInput(e.target.value)}
        ></input>
        {/* <div className="bid-enter-max">
          {t('maximum coins to bid')}:{' '}
          <span onClick={(e: any) => setInput(e.target.innerText)}>3.24</span>
        </div> */}
      </div>
      <div className="bid-submit">
        <SubmitButton
          isDisabled={false}
          title={t('confirm')}
          className="m-0auto"
          onPress={onSubmit}
        />
        <div
          className="form-submit-btn btn-disabled mt-20 m-0auto"
          onClick={onClose}
        >
          {t('cancel')}
        </div>
      </div>
    </div>
  )
}

export default BidForm
