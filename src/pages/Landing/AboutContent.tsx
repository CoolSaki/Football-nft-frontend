import React, { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import Faq from '@components/Page/Faq'
import { useDispatch, useSelector } from 'react-redux'
import { showSignupForm } from '@root/apis/onboarding/authenticationSlice'
import { RootState } from '@root/store/rootReducers'
import { isMobile } from '@utils/helpers'
import { useNavigate } from 'react-router-dom'

const AboutContent: React.FC = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const isUserAuthenticated = useSelector(
    (state: RootState) => state.authentication,
  )

  const fetchSignupForm = () => {
    if (isMobile()) {
      navigate('/signup')
    } else {
      dispatch(showSignupForm())
    }
  }

  return (
    <div className="about-content">
      <div>
        <div className="about-section">
          <span className="blog-title faq-title capitalize">{t(`faq's`)}</span>
          <Faq showButton={true} />
        </div>
      </div>
    </div>
  )
}

export default AboutContent
