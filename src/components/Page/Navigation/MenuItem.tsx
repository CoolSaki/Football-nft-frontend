import React, { useState, useEffect } from 'react'
import classnames from 'classnames'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'
import { isMobile } from '@utils/helpers'
import DialogBox from '@components/DialogBox'
import ChangePasswordForm from '@pages/Onboarding/ChangePassword/ChangePasswordForm'
import { useDispatch } from 'react-redux'
import { resetPlayerData } from '@root/apis/playerCoins/playerCoinsSlice'
import { showSignupForm } from '@root/apis/onboarding/authenticationSlice'

interface Props {
  item: any
  index: number
  isMenu: boolean
  className?: string
}

const MenuItem: React.FC<Props> = ({ item, index, isMenu, className }) => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [showFormPopup, setShowFormPopup] = useState(false)
  const [itemHovered, setItemHovered] = useState(false)
  let selectedLanguage = localStorage.getItem('languageName')
  const loginInfo = localStorage.getItem('loginInfo')
  const loginId = localStorage.getItem('loginId')

  if (selectedLanguage === null) {
    selectedLanguage = 'English'
  }

  const handleClick = (url: string) => {
    if (isMenu) {
      if (index === 1 && !loginInfo && !loginId) {
        dispatch(showSignupForm())
        return
      }
      if (
        isMobile() ||
        url === 'language' ||
        url === 'all-players' ||
        url === 'player-dashboard' ||
        url === 'nfts'
      ) {
        navigate('/' + url)
      } else {
        setShowFormPopup(true)
      }
    }
  }

  const handleClose = (event: any) => {
    event.stopPropagation()
    setShowFormPopup(false)
    dispatch(resetPlayerData())
  }

  const toggleItemFocused = (isHover: boolean) => {
    setItemHovered(isHover)
  }

  return (
    <div className="notification">
      <div
        className={classnames('notification-title', className)}
        onClick={() => handleClick(item.url)}
        onMouseEnter={() => toggleItemFocused(true)}
        onMouseLeave={() => toggleItemFocused(false)}
      >
        <>
          <DialogBox
            isOpen={showFormPopup}
            onClose={handleClose}
            contentClass="onboarding-popup"
          >
            {index === 2 && <ChangePasswordForm />}
          </DialogBox>
          <div
            className={classnames(
              `link-title ${!Boolean(index) && 'notification-title-color'}`,
              itemHovered ? 'focussed' : '',
            )}
          >
            {t(item.title)}
          </div>
        </>
        <div className="selected-value-row">
          {!Boolean(index) && isMenu && (
            <div className="selected-value active">{selectedLanguage}</div>
          )}
          <div className={`grey-color ${!Boolean(index) && 'green-color'}`}>
            <ArrowForwardIosIcon style={{ fontSize: '12px' }} />
          </div>
        </div>
      </div>

      <div
        className={
          !index ? 'notification-content selected' : 'notification-content'
        }
      >
        {item.content}
      </div>
      <div
        className={!index ? 'notification-date selected' : 'notification-date'}
      >
        {item.datetime && item.datetime.substring(0, 16).replace('T', ' ')}
      </div>
    </div>
  )
}

export default MenuItem
