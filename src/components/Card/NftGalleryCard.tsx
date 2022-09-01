import React from 'react'
import { useTranslation } from 'react-i18next'
import '@assets/css/components/NftGalleryCard.css'
import { CheckCircle, Error, FiberManualRecord } from '@mui/icons-material'

interface Props {
  nft: any
  className?: string
  status: number
}

const NftGalleryCard: React.FC<Props> = ({ nft, className, status }) => {
  const { t } = useTranslation()
  return (
    <div className={`nft-gallery-card ${className}`}>
      <img src={nft.default} className="nft-gallery-img" />
      {status === 1 ? (
        <CheckCircle className="nft-gallery-firsticon" />
      ) : // </div>
      status === 2 ? (
        <Error className="nft-gallery-secondicon" />
      ) : status === 3 ? (
        <>
          <div className="nft-gallery-thirdicon">
            <FiberManualRecord className="nft-gallery-thirdicondot" />
          </div>
          <div className="nft-gallery-lanchbtn">Lunch</div>
        </>
      ) : (
        <></>
      )}
    </div>
  )
}

export default NftGalleryCard
