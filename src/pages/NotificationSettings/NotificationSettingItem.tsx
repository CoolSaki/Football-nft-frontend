import React from 'react'
import ToggleSwitch from '@components/Form/ToggleSwitch'
interface Props {
  item: any
  index: number
  isMenu: boolean
  className?: string
}

const NotificationSettingItem: React.FC<Props> = ({ item, index }) => {
  let selectedLanguage = localStorage.getItem('languageName')

  if (selectedLanguage === null) {
    selectedLanguage = 'English'
  }

  return (
    <div className="notification">
      <div className="notification-title plain">
        <div className="notification-text">{item.title}</div>
        <div className="selected-value-row">
          <div className={`grey-color ${!Boolean(index) && 'green-color'}`}>
            <ToggleSwitch />
          </div>
        </div>
      </div>
    </div>
  )
}

export default NotificationSettingItem
