import React from 'react'
import { useTranslation } from 'react-i18next'

import Carousel from '@components/Carousel'
import { NftCardData } from '@root/constants'
import NftCard from '@components/Card/NftCard'

const items: JSX.Element[] = []
NftCardData.map((item, index) =>
  items.push(<NftCard nft={item} key={index} showOwnerInfo={true} />),
)

const LatestCreateNFT: React.FC = () => {
  const { t } = useTranslation()

  return (
    <div className="latest-content">
      <div>
        <span className="blog-title latest-title">
          {t('latest created NFT’s')}
        </span>
        <div className="carousel">
          <Carousel items={items} />
        </div>
        <span className="latest-text-content">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        </span>
        <a href="#" className="blog-content latest-more-view">
          {t('view all')}
        </a>
      </div>
    </div>
  )
}

export default LatestCreateNFT
