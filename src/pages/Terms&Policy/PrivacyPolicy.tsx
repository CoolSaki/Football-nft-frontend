/* eslint-disable @typescript-eslint/no-non-null-assertion */
import React, { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import AppLayout from '@components/AppLayout'
import { useLocation } from 'react-router'
import PrivacyPolicyEn from './PrivacyPolicyEn'
import PrivacyPolicyDe from './PrivacyPolicyDe'
import PrivacyPolicyFr from './PrivacyPolicyFr'
import TagManager from 'react-gtm-module'
import { tagManagerArgs } from '@root/constants'

const PrivacyPolicy: React.FC = () => {
  const { t } = useTranslation()
  const location = useLocation()
  const lang = location?.pathname?.split('-').pop()
  const selectedLocale = localStorage.getItem('language')

  useEffect(() => {
    window.scrollTo(0, 0)
    TagManager.initialize(tagManagerArgs)
    document.querySelector('title')!.innerText = 'Privacy Policy of meCarreira'
  }, [])

  const getLocalizedPolicy = () => {
    if (lang === 'en' || selectedLocale === 'en') {
      return <PrivacyPolicyEn />
    } else if (lang === 'de' || selectedLocale === 'de') {
      return <PrivacyPolicyEn />
    } else if (lang === 'fr' || selectedLocale === 'fr') {
      return <PrivacyPolicyEn />
    } else {
      return <PrivacyPolicyEn />
    }
  }

  return <AppLayout headerClass="home">{getLocalizedPolicy()}</AppLayout>
}

export default PrivacyPolicy
