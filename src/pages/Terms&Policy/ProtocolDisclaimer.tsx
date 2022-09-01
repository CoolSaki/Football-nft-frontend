/* eslint-disable @typescript-eslint/no-non-null-assertion */
import React, { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import AppLayout from '@components/AppLayout'
import { useLocation } from 'react-router'
import ProtocolDisclaimerEn from './ProtocolDisclaimerEn'
import ProtocolDisclaimerDe from './ProtocolDisclaimerDe'
import ProtocolDisclaimerFr from './ProtocolDisclaimerFr'
import TagManager from 'react-gtm-module'
import { tagManagerArgs } from '@root/constants'

const PrivacyPolicy: React.FC = () => {
  const location = useLocation()
  const lang = location?.pathname?.split('-').pop()
  const selectedLocale = localStorage.getItem('language')

  useEffect(() => {
    window.scrollTo(0, 0)
    TagManager.initialize(tagManagerArgs)
    document.querySelector('title')!.innerText =
      'Protocol Disclaimer of meCarreira'
  }, [])

  const getLocalizedDisclaimer = () => {
    if (lang === 'en' || selectedLocale === 'en') {
      return <ProtocolDisclaimerEn />
    } else if (lang === 'de' || selectedLocale === 'de') {
      return <ProtocolDisclaimerEn />
    } else if (lang === 'fr' || selectedLocale === 'fr') {
      return <ProtocolDisclaimerEn />
    } else {
      return <ProtocolDisclaimerEn />
    }
  }
  return <AppLayout headerClass="home">{getLocalizedDisclaimer()}</AppLayout>
}

export default PrivacyPolicy
