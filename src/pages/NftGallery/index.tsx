import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { NftCardData as NftItems } from '@root/constants'
import NftGalleryCard from '@components/Card/NftGalleryCard'
import { AppLayout } from '@components/index'
import '@assets/css/pages/NftGallery.css'
import { Grid } from '@mui/material'

const NftGallery: React.FC = () => {
  const { t } = useTranslation()
  return (
    <AppLayout headerClass="home">
      <div className="nft-gallery">
        <div className="nft-gallery-title h-2">My Gallerys</div>
        <Grid container>
          {NftItems.map((item, index) => {
            return (
              <Grid
                item
                md={6}
                xs={6}
                className={
                  index % 2 === 0
                    ? 'nft-gallery-leftline'
                    : 'nft-gallery-rightline'
                }
                key={index}
              >
                <NftGalleryCard nft={item.img} status={(index % 3) + 1} />
              </Grid>
            )
          })}
        </Grid>
      </div>
    </AppLayout>
  )
}

export default NftGallery
