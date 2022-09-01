import React, { useEffect } from 'react'
import { AppLayout } from '@components/index'
import SellNftForm from './SellNftForm'
import TabGroup from '@components/TabGroup'
import { setPurchaseMode } from '@root/apis/purchase/purchaseSlice'
import { useNavigate, useLocation } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { isMobile } from '@utils/helpers'
import '@assets/css/pages/PurchaseNft.css'
import { useTranslation } from 'react-i18next'

const SellNft: React.FC = () => {
  const { t } = useTranslation()
  useEffect(() => {
    window.scrollTo(0, 0)
    window.history.replaceState(null, 'Buy', '/')
  }, [])

  const navigate = useNavigate()
  const dispatch = useDispatch()
  const location: any = useLocation()

  const handleGetPurchaseTab = (tab: string) => {
    if (isMobile()) {
      // navigate('/' + tab.toLowerCase() + '_nft')
      navigate('/' + tab.toLowerCase() + '-nft', {
        state: { profileData: location.state.profileData },
      })
    } else {
      dispatch(setPurchaseMode(tab))
    }
  }

  return (
    <AppLayout
      headerStatus="header-status"
      headerClass="home"
      footerStatus="footer-status"
    >
      <section className="players-buy">
        <TabGroup
          defaultTab={'SELL'}
          // tabSet={['BUY', 'SELL']}
          tabSet={[t('buy').toUpperCase(), t('sell').toUpperCase()]}
          getSwitchedTab={handleGetPurchaseTab}
        />
        <SellNftForm
          playerData={location.state.profileData}
          onClosePopup={() => navigate(-1)}
        />
      </section>
    </AppLayout>
  )
}

export default SellNft
