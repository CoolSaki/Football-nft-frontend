import React, { useState, memo } from 'react'
import SubmitButton from '@components/SubmitButton'
import history from '@root/utils/history'
import { useDispatch, useSelector } from 'react-redux'
import {
  closeEmailVerification,
  resendEmail,
} from '@root/apis/onboarding/authenticationSlice'
import { getRequest } from '@root/apis/axiosClient'
import { RootState } from '@root/store/rootReducers'
import Spinner from '@components/Spinner'
import { useTranslation } from 'react-i18next'
import classNames from 'classnames'

interface Props {
  title: string
  isMainTitle?: boolean
  children: React.ReactNode
  containerClass?: string
  fontStyle?: string
}

const Clause: React.FC<Props> = ({
  title,
  children,
  isMainTitle = false,
  containerClass = '',
  fontStyle = '',
}) => {
  return (
    <div className={classNames('terms-content-wrapper', containerClass)}>
      <div
        className={classNames(
          'new-nft-title',
          `${fontStyle ? fontStyle : 'ct-h1'}`,
          'text-center',
          isMainTitle ? 'terms-title' : 'terms-subtitle mt-40',
        )}
      >
        {title}
      </div>
      {children}
    </div>
  )
}

export default memo(Clause)
