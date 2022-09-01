import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '@root/store/rootReducers'
import SignUp from './SignUp/SignUp'
// import FormSwitch from './components/FormSwitch'
import TabGroup from '@components/TabGroup'
import Login from './Login/Login'
import VerifyEmail from './VerifyEmail/verifyEmail'
import ForgotPassword from './ForgotPassword'
import '@assets/css/pages/Onboarding.css'
interface Props {
  isOnMenu?: boolean
  onSubmit?: (v?: boolean) => void
  onClose: () => void
}

const OnboardingForm: React.FC<Props> = ({ isOnMenu, onSubmit, onClose }) => {
  const [activeTab, setActiveTab] = useState('login')
  const [isForgotPasswordSelected, setForgotPasswordSelected] = useState(false)
  const handleGetTab = (tab: string) => {
    setActiveTab(tab)
  }
  const authenticationData = useSelector(
    (state: RootState) => state.authentication,
  )

  useEffect(() => {
    if (authenticationData.activeTab) {
      setActiveTab(authenticationData.activeTab)
    }
  }, [authenticationData])

  const onReturn = () => {
    setForgotPasswordSelected(false)
    setActiveTab('login')
  }

  const handleForgotPassword = () => {
    setForgotPasswordSelected(true)
  }

  return (
    <section className="onboarding-container">
      <>
        {authenticationData.isSentEmailVerificationMail ? (
          <VerifyEmail email={authenticationData.email} />
        ) : isForgotPasswordSelected ? (
          <ForgotPassword handleReturn={onReturn} />
        ) : (
          <>
            <TabGroup
              defaultTab={activeTab}
              tabSet={['register', 'login']}
              getSwitchedTab={handleGetTab}
            />
            {activeTab === 'register' ? (
              <SignUp onClose={onClose} isOnMenu={isOnMenu} />
            ) : (
              <Login
                getSubmit={onSubmit}
                handleLinkClick={handleForgotPassword}
                isOnMenu={isOnMenu}
              />
            )}
          </>
        )}
      </>
    </section>
  )
}

export default OnboardingForm
