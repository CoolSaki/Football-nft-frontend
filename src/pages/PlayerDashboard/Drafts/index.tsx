import BottomPopup from '@components/BottomPopup'
import SearchBar from '@components/SearchBar'
import SubmitButton from '@components/SubmitButton'
import ArrowDown from '@components/Svg/ArrowDown'
import ArrowUp from '@components/Svg/ArrowUp'
import { PlayerCardData as PlayerItems } from '@root/constants'
import { NumberFormat } from '@utils/NumberFormat'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import NewDraft from './NewDraft'
import CheckCircleOutlinedIcon from '@mui/icons-material/CheckCircleOutline'
import CloseIcon from '@mui/icons-material/Close'

const Drafts = () => {
  const { t } = useTranslation()
  const [selectedFirst, setSelectedFirst] = useState(false)
  const [selectedSecond, setSelectedSecond] = useState(false)
  const [showNewDraftPopup, setShowNewDraftPopup] = useState(false)

  const handleSearch = (value: string | undefined) => {
    console.log('searchKeys---', value)
  }

  return (
    <div className="fixed-content-without-margin dlg-content no-scroll">
      <div className="fixed-content">
        <div className="alert-wrapper">
          <div className="heading-title unverified-alert popup-alert">
            {t('your status must be pro')}
          </div>
        </div>
      </div>
    </div>
  )

  return (
    <div className="player-draft dlg-content">
      <BottomPopup mode="wallet" isOpen={showNewDraftPopup}>
        <NewDraft onClose={() => setShowNewDraftPopup(false)} />
      </BottomPopup>
      <SearchBar
        onEdit={handleSearch}
        containerClass="drafts-search-bar"
        onClose={() => console.log('')}
      />
      <div className="accordion mt-0">
        <div className="item">
          <div className="title">
            <h2>{t('draft requests')} (1,345)</h2>
          </div>
          <div className="content show">
            {PlayerItems.slice(0, 2).map(item => (
              <div className="nft-item">
                <div className="nft-image-section">
                  <div className="image-border">
                    <img
                      loading="lazy"
                      src={item.img}
                      alt=""
                      className="nft-image"
                    />
                  </div>
                  <div className="nft-name">{item.name}</div>
                </div>
                <div className="price-button-section">
                  <div className="nft-price-section">
                    <div className="white-color">
                      {NumberFormat(item.price)}
                    </div>
                    <div className="nft-price">${NumberFormat(item.price)}</div>
                  </div>
                  <CheckCircleOutlinedIcon className="green-color" />
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="item" key={1}>
          <div
            className={selectedFirst ? 'title no-border' : 'title'}
            onClick={() => setSelectedFirst(!selectedFirst)}
          >
            <h2>{t('active drafted')} (5/5)</h2>
            {selectedFirst ? <ArrowUp /> : <ArrowDown />}
          </div>
          <div className={selectedFirst ? 'content show' : 'content'}>
            <div className="list-header">
              <div>{t('address')}</div>
              <div>{t('amount drafted')}</div>
            </div>
            {PlayerItems.slice(3, 8).map(item => (
              <div className="nft-item">
                <div className="nft-image-section">
                  <div className="image-border">
                    <img
                      loading="lazy"
                      src={item.img}
                      alt=""
                      className="nft-image"
                    />
                  </div>
                  <div className="nft-name">{item.name}</div>
                </div>
                <div className="price-button-section">
                  <div className="nft-price-section">
                    <div className="white-color">
                      {NumberFormat(item.price)}
                    </div>
                    <div className="nft-price">${NumberFormat(item.price)}</div>
                  </div>
                  <CloseIcon className="red-color" />
                </div>
              </div>
            ))}
            <div className="mb-20"></div>
            <SubmitButton
              isDisabled={false}
              title={t('draft new player')}
              onPress={() => setShowNewDraftPopup(true)}
              className="m-0auto"
            />
          </div>
        </div>
        <div className="item" key={2}>
          <div
            className="title"
            onClick={() => setSelectedSecond(!selectedSecond)}
          >
            <h2>{t('drafted in the past')}</h2>
            {selectedSecond ? <ArrowUp /> : <ArrowDown />}
          </div>
          <div className={selectedSecond ? 'content show' : 'content'}>
            {PlayerItems.slice(6, 8).map(item => (
              <div className="nft-item">
                <div className="nft-image-section">
                  <div className="image-border">
                    <img
                      loading="lazy"
                      src={item.img}
                      alt=""
                      className="nft-image"
                    />
                  </div>
                  <div className="nft-name">{item.name}</div>
                </div>
                <div className="nft-price-section">
                  <div className="white-color">{NumberFormat(item.price)}</div>
                  <div className="nft-price">${NumberFormat(item.price)}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="mb-20"></div>
      {!selectedFirst && (
        <SubmitButton
          isDisabled={false}
          title={t('draft new player')}
          onPress={() => setShowNewDraftPopup(true)}
          className="m-0auto"
        />
      )}
    </div>
  )
}

export default Drafts
