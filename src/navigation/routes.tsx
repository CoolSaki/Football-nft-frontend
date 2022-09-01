import React, { useEffect, useState } from 'react'
import {
  Routes as GroupRoutes,
  Route,
  BrowserRouter as Router,
} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {
  About,
  Notification,
  NotificationSettings,
  Menu,
  Language,
  BuyNft,
  SellNft,
  Staked,
  Onboarding,
  EmailVerification,
  ResetPassword,
  ChangePassword,
  CreateWallet,
  Player,
  PlayerList,
  PlayerDashboard,
  PlayerNft,
  Blog,
  NftList,
  Faqs,
} from '@pages/index'
import TermsConditions from '@pages/Terms&Policy/TermsConditions'
import PrivacyPolicy from '@pages/Terms&Policy/PrivacyPolicy'
import ProtocolDisclaimer from '@pages/Terms&Policy/ProtocolDisclaimer'
import AboutUs from '@pages/About'
import OurTeam from '@pages/OurTeam'
import Careers from '@pages/Careers'

import ContactUs from '@pages/Careers/ContactUs'
import PageNotFound from '@pages/NotFound'
import { SubLanguages } from '@root/constants'
import { RootState } from '@root/store/rootReducers'
import DialogBox from '@components/DialogBox'
import NewsLetter from '@pages/Landing/NewsLetter'
import { getNotification } from '@root/apis/onboarding/authenticationSlice'
import NftGallery from '@pages/NftGallery'
import NftGalleryDetail from '@pages/NftGalleryDetail'

const Routes: React.FC = () => {
  const dispatch = useDispatch()
  const authenticationData = useSelector(
    (state: RootState) => state.authentication,
  )
  const showSignupPopup = useSelector(
    (state: RootState) => state.authentication.isSignupFormVisible,
  )
  const [showFormPopup, setShowFormPopup] = useState(false)
  const { delay } = authenticationData

  useEffect(() => {
    dispatch(getNotification())
  }, [])

  useEffect(() => {
    if (delay > 0) {
      setTimeout(() => {
        showAccessPopup()
      }, delay * 1000)
    }
  }, [delay])

  useEffect(() => {
    if (showFormPopup) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
  }, [showFormPopup])

  useEffect(() => {
    if (showSignupPopup) {
      localStorage.setItem('activatedAccessPopup', 'signup')
    } else if (localStorage.getItem('activatedAccessPopup') !== 'true') {
      localStorage.setItem('activatedAccessPopup', 'false')
    }
  }, [showSignupPopup])

  const showAccessPopup = () => {
    if (
      localStorage.getItem('activatedAccessPopup') !== 'true' &&
      localStorage.getItem('activatedAccessPopup') !== 'signup'
    ) {
      setShowFormPopup(true)
    }
    localStorage.setItem('activatedAccessPopup', 'true')
  }
  return (
    <>
      <DialogBox
        isOpen={showFormPopup && !showSignupPopup}
        onClose={() => setShowFormPopup(false)}
        contentClass="notification-popup"
        closeBtnClass="close-notification"
        parentClass="none-backdrop-filter"
      >
        <NewsLetter
          isNotification={true}
          onClose={() => setShowFormPopup(false)}
        />
      </DialogBox>
      <Router>
        <GroupRoutes>
          <Route path="/" element={<About />} />
          <Route path="/signup" element={<Onboarding />} />
          <Route path="/buy-nft" element={<BuyNft />} />
          <Route path="/sell-nft" element={<SellNft />} />
          <Route path="/notifications" element={<Notification />} />
          <Route path="/menu" element={<Menu />} />
          <Route
            path="/notifications_settings"
            element={<NotificationSettings />}
          />
          <Route path="/language" element={<Language />} />
          <Route
            path="/accounts/verify/email/:refreshToken/:jwtToken"
            element={<EmailVerification />}
          />
          <Route
            path="/accounts/resetPassword/:uid/:token"
            element={<ResetPassword />}
          />
          <Route path="/accounts/changePassword" element={<ChangePassword />} />
          <Route path="/staked" element={<Staked />} />
          <Route path="/player/:id" element={<Player />} />
          <Route path="/player/:id/nft/:nft" element={<PlayerNft />} />
          <Route
            path="/accounts/resetPassword/:uid/:token"
            element={<ResetPassword />}
          />
          <Route path="/wallet" element={<CreateWallet />} />
          <Route path="/all-players" element={<PlayerList />} />
          <Route path="/player-dashboard" element={<PlayerDashboard />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/faqs" element={<Faqs />} />
          <Route path="/terms-conditions" element={<TermsConditions />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/disclaimer" element={<ProtocolDisclaimer />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/our-team" element={<OurTeam />} />
          <Route path="/nfts" element={<NftList />} />
          <Route path="/nft-gallery" element={<NftGallery />} />
          <Route
            path="/nft-gallery-detail/:id"
            element={<NftGalleryDetail />}
          />
          {SubLanguages.map(region => {
            return (
              <>
                <Route
                  path={`/terms-conditions-${region.symbol}`}
                  element={<TermsConditions />}
                />
                <Route
                  path={`/about-us-${region.symbol}`}
                  element={<AboutUs />}
                />
                <Route
                  path={`/our-team-${region.symbol}`}
                  element={<OurTeam />}
                />
                <Route
                  path={`/disclaimer-${region.symbol}`}
                  element={<ProtocolDisclaimer />}
                />
                <Route
                  path={`/privacy-policy-${region.symbol}`}
                  element={<PrivacyPolicy />}
                />
              </>
            )
          })}
          <Route path="/careers" element={<Careers />} />
          <Route path="/contact-us" element={<ContactUs />} />
          <Route path="*" element={<PageNotFound />} />
        </GroupRoutes>
      </Router>
    </>
  )
}

export default Routes
