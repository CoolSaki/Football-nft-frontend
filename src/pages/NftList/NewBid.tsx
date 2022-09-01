import React, { useEffect, useState } from 'react'
import { createTheme, ThemeProvider, styled } from '@mui/material/styles'
import {
  NftCardData as NftItems,
  DemoPlayers,
  TABULET_MAX_WIDTH,
} from '@root/constants'
import NftCard from '../../components/Card/NftCard'
import NftCardMobile from '../../components/Card/NftCardMobile'
import Grid from '@mui/material/Grid'
import { useTranslation } from 'react-i18next'

const theme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 1024,
      lg: 1200,
      xl: 1536,
    },
  },
})

const NewBid: React.FC = () => {
  const [width, setWidth] = useState(window.innerWidth)
  const { t } = useTranslation()
  const handleResize = () => {
    setWidth(window.innerWidth)
  }

  const demoData = DemoPlayers
  let demoPlayers: any = []
  for (let i = 0; i < demoData.length; i++) {
    demoPlayers = [...demoPlayers, ...demoData[i].nfts]
  }

  demoPlayers = demoPlayers.filter((item: any) => !item.isWin)

  let currentIndex = demoPlayers.length,
    randomIndex

  // While there remain elements to shuffle.
  while (currentIndex !== 0) {
    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex)
    currentIndex--

    // And swap it with the current element.
    ;[demoPlayers[currentIndex], demoPlayers[randomIndex]] = [
      demoPlayers[randomIndex],
      demoPlayers[currentIndex],
    ]
  }

  useEffect(() => {
    window.addEventListener('resize', handleResize)
  }, [])

  return (
    <ThemeProvider theme={theme}>
      <div>
        {width > 650 ? (
          <Grid container className="nft-list-grid">
            {demoPlayers.map((item: any, index: number) => (
              <Grid item sm={6} md={4} style={{ marginBottom: '20px' }}>
                <NftCard
                  nft={item}
                  isBidEnabled={true}
                  key={index}
                  isNavigate
                />
              </Grid>
            ))}
          </Grid>
        ) : (
          <Grid container className="nft-list-grid-mob">
            {demoPlayers.map((item: any, index: number) => (
              <Grid item xs={6} style={{ marginBottom: '20px' }}>
                <NftCardMobile
                  nft={item}
                  isBidEnabled={true}
                  key={index}
                  isNavigate
                />
              </Grid>
            ))}
          </Grid>
        )}
        <div className="nft-list-see-more link">{t('see more')}</div>
      </div>
    </ThemeProvider>
  )
}

export default NewBid
