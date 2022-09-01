import { PlayerCardData as PlayerItems } from '@root/constants'
import { NumberFormat } from '@utils/NumberFormat'
import { useTranslation } from 'react-i18next'

const Drafts = () => {
  const { t } = useTranslation()

  return (
    <div className="fixed-content">
      {/* 
      <div className="search-bar-container">
          <SearchBar
            onEdit={() => console.log('')}
            onClose={() => console.log('')}
          />
       </div>
      <div className="list-header">
        <div>{t('player')}</div>
        <div>{t('amount Drafted')}</div>
      </div>
      {PlayerItems.map((item, index) => (
        <div key={index} className="nft-item">
          <div className="nft-image-section">
            <div className="image-border">
              <img loading="lazy" src={item.img} alt="" className="nft-image" />
            </div>
            <div className="nft-name">{item.name}</div>
          </div>
          <div className="nft-price-section">
            <div>{NumberFormat(item.price)}</div>
            <div className="nft-price">${NumberFormat(item.price)}</div>
          </div>
        </div>
      ))} */}
      <div className="alert-wrapper">
        <div className="heading-title unverified-alert">
          {t('no drafts present currently')}
        </div>
      </div>
    </div>
  )
}

export default Drafts
