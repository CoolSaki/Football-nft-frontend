import React from 'react'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import Heading from './Heading'
import GetStarted from './GetStarted'
import FlipCard from '../../../components/Card/FlipCard'
import Grid from '@mui/material/Grid'
import HoverVideoPlayer from 'react-hover-video-player'
import PlayArrowIcon from '@mui/icons-material/PlayArrow'
import { useTranslation } from 'react-i18next'
import { SocialUrls } from '@root/constants'

const theme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 912,
      md: 1024,
      lg: 1368,
      xl: 1536,
    },
  },
})

const Intro: React.FC = () => {
  const { t } = useTranslation()
  const getTranslation = (text: string) => {
    const translation = t(text)
    if (translation === text) {
      // return '!__no_translation__!'
      return text
    } else {
      return translation
    }
  }

  const flipCards = [
    {
      title: getTranslation('benefit from the players performance'),
      desc: getTranslation('buy coins from professtional footballers'),
    },
    {
      title: getTranslation('unique interaction'),
      desc:
        getTranslation('family_friends_acquaintances') +
        ' ' +
        getTranslation('owning player coins allows'),
    },
    {
      title: getTranslation('scout talents and support'),
      desc: getTranslation('invest in player coins'),
    },
    {
      title: getTranslation('earn player coins through staking'),
      desc: getTranslation('pool of player coins'),
    },
  ]
  //   "owning player coins leads"
  // "owning player coins leads"
  // "player coin is heart of the"
  // "ecosystem and is exclusively managed"
  // "player coins are only issued"
  return (
    <ThemeProvider theme={theme}>
      <Heading />
      <div className="heading-container">
        <div className="intro-header">{t('introducing')}</div>
        <div className="intro-title">{t('player coins')}</div>
        <div className="heading-desc">{t('buy_the_player_coin')}</div>
        <div className="heading-desc">{t('owning player coins leads')}</div>
        <div className="heading-desc">
          {t('player coin is heart of the') + ' '}
          <a href="https://dev.mecarreira.com/" target="_blank">
            MeCarreira.com
          </a>
          {' ' + t('ecosystem and is exclusively managed') + ' '}
          <a href="https://dev.mecarreira.com/" target="_blank">
            MeCarreira.com
          </a>
          {' ' + t('player coins are only issued')}
        </div>
      </div>
      <Grid container className="intro-grid">
        {flipCards.map((data, id) => (
          <Grid item key={id} xs={12} sm={6} md={6} style={{ paddingTop: 24 }}>
            <FlipCard title={data.title} desc={data.desc} />
          </Grid>
        ))}
      </Grid>
      <a href={SocialUrls.youtube} className="intro-video">
        <HoverVideoPlayer
          videoSrc="/videos/banner_video.webm"
          pausedOverlay={
            <img
              src="thumbnail.png"
              alt=""
              style={{
                // Make the image expand to cover the video's dimensions
                width: '100%',
                height: '100%',
                objectFit: 'cover',
              }}
            />
          }
          loadingOverlay={
            <div className="loading-overlay">
              <div className="loading-spinner" />
            </div>
          }
        />
        <div className="intro-watch">
          <div className="h-1">{t('watch the video')}</div>
          <PlayArrowIcon style={{ color: 'white' }} />
        </div>
      </a>
      <GetStarted />
    </ThemeProvider>
  )
}

export default Intro
