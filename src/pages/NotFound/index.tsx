import React, { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import SubmitButton from '@components/SubmitButton'
import { verifyEmail } from '@root/apis/onboarding/authenticationSlice'
import AppLayout from '@components/AppLayout'
import { RootState } from '@root/store/rootReducers'
import Spinner from '@components/Spinner'
import { useTranslation } from 'react-i18next'

const NotFound: React.FC = props => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const pathSet = pathname.split('/')

  return (
    <AppLayout className="home" footerStatus="hidden">
      <section className="verification-container fullwidth">
        <div className="email-verification-container not-found">
          <h2 className="page-heading">{t('404! page not found')}</h2>
        </div>
      </section>
    </AppLayout>
  )
}

export default NotFound
