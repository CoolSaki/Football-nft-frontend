import React from 'react'
import AddIcon from '@mui/icons-material/Add'
import { PlayerCardData as PlayerItems } from '@root/constants'
import SearchBar from '@components/SearchBar'
import { NumberFormat } from '@utils/NumberFormat'
import { useTranslation } from 'react-i18next'

interface Props {
  onClose: () => void
}

const NewDraft: React.FC<Props> = ({ onClose }) => {
  const { t } = useTranslation()
  const handleSearch = (value: string | undefined) => {
    console.log('searchKeys---', value)
  }

  return (
    <section className="new-draft">
      <div className="new-draft-title">{t('find players')}</div>
      <SearchBar onEdit={handleSearch} onClose={() => console.log('')} />
      <div className="list-header">
        <div>{t('address')}</div>
        <div>{t('amount drafted')}</div>
      </div>
      {PlayerItems.slice(3, 8).map(item => (
        <div className="nft-item">
          <div className="nft-image-section">
            <div className="image-border">
              <img loading="lazy" src={item.img} alt="" className="nft-image" />
            </div>
            <div className="nft-name">{item.name}</div>
          </div>
          <div className="price-button-section">
            <div className="nft-price-section">
              <div className="white-color">{NumberFormat(item.price)}</div>
              <div className="nft-price">${NumberFormat(item.price)}</div>
            </div>
            <AddIcon className="green-color" />
          </div>
        </div>
      ))}
      <div className="m0-auto">
        <div className="close-button" onClick={onClose}>
          {t('close')}
        </div>
      </div>
    </section>
  )
}

export default NewDraft
