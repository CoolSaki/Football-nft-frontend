/* eslint-disable @typescript-eslint/no-non-null-assertion */
import React, { useEffect } from 'react'
import AppLayout from '@components/AppLayout'
import { useLocation } from 'react-router'
import AboutUsEn from './AboutUsEn'
import AboutUsDe from './AboutUsDe'
import AboutUsFr from './AboutUsFr'
import TagManager from 'react-gtm-module'
import { tagManagerArgs } from '@root/constants'

const AboutUs: React.FC = () => {
  const location = useLocation()
  const lang = location?.pathname?.split('-').pop()
  const selectedLocale = localStorage.getItem('language')

  useEffect(() => {
    window.scrollTo(0, 0)
    TagManager.initialize(tagManagerArgs)
    document.querySelector('title')!.innerText = 'About meCarreira'
    document
      .querySelector("meta[name='description']")!
      .setAttribute('content', 'Why do we do, what we do')
  }, [])
  const getLocalizedAbout = () => {
    if (lang === 'en' || selectedLocale === 'en') {
      return <AboutUsEn />
    } else if (lang === 'de' || selectedLocale === 'de') {
      return <AboutUsEn />
    } else if (lang === 'fr' || selectedLocale === 'fr') {
      return <AboutUsEn />
    } else {
      return <AboutUsEn />
    }
  }

  return <AppLayout headerClass="home">{getLocalizedAbout()}</AppLayout>
}

export default AboutUs
