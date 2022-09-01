import React, { useState } from 'react'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import { NumberFormat } from '@utils/NumberFormat'
import { useDispatch } from 'react-redux'
import { setPurchasePlayerId } from '@root/apis/purchase/purchaseSlice'
import { useTranslation } from 'react-i18next'

interface playerItem {
  img: string
  name: string
  price: number
}

interface Props {
  index?: number
  item: playerItem
  handleStake: () => void
}

const PlayerItem: React.FC<Props> = props => {
  const { index, item, handleStake } = props
  const dispatch = useDispatch()
  const { t } = useTranslation()

  const [clicked, setClicked] = useState(false)

  const handleClick = () => {
    if (!clicked) setClicked(true)
  }

  const handleStakeClick = () => {
    dispatch(setPurchasePlayerId(index))
    setClicked(false)
    handleStake()
  }
  return (
    <div key={index} className="nft-item pointer" onClick={handleClick}>
      <div className="nft-image-section">
        <MoreVertIcon />
        <div className="image-border">
          <img loading="lazy" src={item.img} alt="" className="nft-image" />
        </div>
      </div>
      {clicked ? (
        <div className="nft-name-section nft-first-name-section">
          <div
            className="nft-name select_nft_stake bottom-border"
            onClick={handleStakeClick}
          >
            {t('stake') + '/' + t('unstake')}
          </div>
          <div
            className="select_nft_cancel bottom-border"
            onClick={() => setClicked(false)}
          >
            {t('cancel')}
          </div>
        </div>
      ) : (
        <div className="nft-name-section">
          <div className="nft-name">{item.name}</div>
          <div>
            <div>
              <span className="green-color">
                {NumberFormat(item.price)} / {''}
              </span>
              {NumberFormat(item.price)}
            </div>
            <div className="nft-price">${NumberFormat(item.price)}</div>
          </div>
        </div>
      )}
    </div>
  )
}

export default PlayerItem
