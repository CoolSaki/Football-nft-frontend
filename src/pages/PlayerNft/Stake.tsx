import React, { useEffect, useState } from 'react'
import { Formik } from 'formik'
import * as Yup from 'yup'
import classnames from 'classnames'
import SubmitButton from '@components/SubmitButton'
import FormInput from '@components/Form/FormInput'
import Error from './Error'
import { RootState } from '@root/store/rootReducers'
import { useTranslation } from 'react-i18next'

interface Props {
  onSubmit: (v?: any) => void
  onClose: () => void
}

const initialValues = {
  address: '',
}

const Stake: React.FC<Props> = ({ onSubmit, onClose }) => {
  const loginInfo = localStorage.getItem('loginInfo')
  const { t } = useTranslation()

  const submitForm = (values: any) => {
    const reqParams = {
      to_address: values.address,
    }
    onSubmit(reqParams)
  }

  return (
    <section className="wallet-container stake-bid-container">
      <div className="bid-title">{t('stake coins to bid')}</div>
      <div className="bid-desc mt-40 mb-40">
        {t('no player coins staked to buy this')}
      </div>
      <div className="bid-submit stake-bid-btn-wrapper">
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
    </section>
  )
}

export default Stake
