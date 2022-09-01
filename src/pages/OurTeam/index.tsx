/* eslint-disable @typescript-eslint/no-non-null-assertion */
import React, { useEffect } from 'react'
import AppLayout from '@components/AppLayout'
import { useLocation } from 'react-router'
import OurTeamEn from './OurTeamEn'
import OurTeamDe from './OurTeamDe'
import OurTeamFr from './OurTeamFr'
import TagManager from 'react-gtm-module'
import { tagManagerArgs } from '@root/constants'

const OurTeam: React.FC = () => {
  const location = useLocation()
  const lang = location?.pathname?.split('-').pop()
  const selectedLocale = localStorage.getItem('language')

  useEffect(() => {
    window.scrollTo(0, 0)
    TagManager.initialize(tagManagerArgs)
    document.querySelector('title')!.innerText = 'The Team of meCarreira'
    document
      .querySelector("meta[name='description']")!
      .setAttribute(
        'content',
        'Read about our core team and why they are the best in what they do',
      )
  }, [])

  const getLocalizedTeamInfo = () => {
    if (lang === 'en' || selectedLocale === 'en') {
      return <OurTeamEn />
    } else if (lang === 'de' || selectedLocale === 'de') {
      return <OurTeamEn />
    } else if (lang === 'fr' || selectedLocale === 'fr') {
      return <OurTeamEn />
    } else {
      return <OurTeamEn />
    }
  }

  return (
    <AppLayout headerClass="home">
      <div className="team-box m-0">{getLocalizedTeamInfo()}</div>
    </AppLayout>
  )
}

export default OurTeam
