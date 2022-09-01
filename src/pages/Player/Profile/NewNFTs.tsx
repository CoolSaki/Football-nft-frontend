import React, { useState, useEffect } from 'react'

import Carousel from '@components/Carousel'
import { NftCardData } from '@root/constants'
import NftCard from '@components/Card/NftCard'
import { useTranslation } from 'react-i18next'

const customItems: JSX.Element[] = []
// const items: JSX.Element[] = []

// NftCardData.map((item, index) =>
//   items.push(
//     <NftCard nft={item} isNavigate={true} isBidEnabled={true} key={index} />,
//   ),
// )

interface Props {
  items?: any
}

const NewNFTs: React.FC<Props> = ({ items }) => {
  const { t } = useTranslation()

  return (
    <div className="new-nfts">
      <div>
        <div className="blog-title">{t('new nft’s')}</div>
        <div className="fullwidth flex-center">
          <div className="carousel">
            <Carousel items={items} responsiveWideMode={true} />
          </div>
        </div>
      </div>
    </div>
  )
}
export default NewNFTs
