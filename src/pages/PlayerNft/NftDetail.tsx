import React, { useEffect, useState } from 'react'
import ArrowCircleUpIcon from '@mui/icons-material/ArrowCircleUp'
import Grid from '@mui/material/Grid'
import AttrCard from '../../components/Card/AttrCard'
import ClaimCard from '../../components/Card/ClaimCard'
import { useTranslation } from 'react-i18next'

interface Props {
  onClick: () => void
}

const attrData: any[] = [
  { title: 'head', desc: 'orange hat' },
  { title: 'shirt', desc: 'shirt1' },
  { title: 'pants', desc: 'black' },
  { title: 'shoes', desc: 'puma' },
]

const claimData: any[] = [
  {
    title: 'match worn shoes',
    desc: 'the owner of this NFT gets the right',
  },
]

// useEffect(() => {
//   window.scrollTo(0, 0)
// }, [])

const NftDetail: React.FC<Props> = ({ onClick }) => {
  const { t } = useTranslation()

  return (
    <div className="nft-detail-container">
      <div>
        {/* <div className="flex-center fullwidth">
          <ArrowCircleUpIcon
            className="nft-detail-arrow-up"
            onClick={onClick}
          ></ArrowCircleUpIcon>
        </div> */}
        <div className="nft-detail-title">{t('this nft is part of')}</div>
        <div className="nft-detail-attr">
          <div className="nft-detail-attr-title">{t('special attributes')}</div>
          {!attrData.length ? (
            <div className="nft-detail-attr-no">
              {t('no attributes for this nft')}
            </div>
          ) : (
            <Grid container spacing={2}>
              {attrData?.map((data: any, index: number) => (
                <Grid item xs={6} sm={6} key={index}>
                  <AttrCard title={data.title} desc={data.desc} />
                </Grid>
              ))}
            </Grid>
          )}
        </div>
        <div className="nft-detail-claim">
          <div className="nft-detail-claim-title">{t('claim')}</div>
          {!claimData.length ? (
            <div className="nft-detail-claim-no">
              {t('no claims for this nft')}
            </div>
          ) : (
            <Grid container>
              {claimData?.map((data: any, index: number) => (
                <Grid item xs={12} key={index}>
                  <ClaimCard title={data.title} desc={data.desc} />
                </Grid>
              ))}
            </Grid>
          )}
        </div>
      </div>
    </div>
  )
}

export default NftDetail
