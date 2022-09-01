import SubmitButton from '@components/SubmitButton'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import CreateNft from './CreateNft'
import NftList from './NftList'

const Nfts = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const [status, setStatus] = useState('list')
  const handleNewCreate = () => {
    setStatus('create')
  }
  const handleMyGallery = () => {
    navigate('/nft-gallery')
  }

  return (
    // <div className="fixed-content-without-margin dlg-content no-scroll">
    //   <div className="fixed-content">
    //     <div className="alert-wrapper">
    //       <div className="heading-title unverified-alert popup-alert">
    //         {t('your status must be pro')}
    //       </div>
    //     </div>
    //   </div>
    <>
      <div className="nft-tab-title">{t('create your own nft')}</div>
      {status !== 'create' ? (
        <>
          <SubmitButton
            title={t('new nft')}
            className="nft-create-btn"
            onPress={handleNewCreate}
          />
          <SubmitButton
            title={t('my gallery')}
            className="nft-gallery-btn"
            onPress={handleMyGallery}
          />
        </>
      ) : (
        <></>
      )}
      {status === 'list' ? (
        <NftList />
      ) : status === 'create' ? (
        <CreateNft />
      ) : (
        <></>
      )}
    </>
    // </div>
  )
}

export default Nfts
