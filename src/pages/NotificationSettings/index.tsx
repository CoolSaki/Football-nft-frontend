import React, { useEffect } from 'react'

import { AppLayout } from '@components/index'
import NotificationSettingItem from '@pages/NotificationSettings/NotificationSettingItem'
import { NotificationList } from '@root/constants'
import '@assets/css/pages/NotificationSettings.css'
import { useTranslation } from 'react-i18next'

const NotificationSettings: React.FC = () => {
  const { t } = useTranslation()

  useEffect(() => {
    window.history.replaceState(null, 'Buy', '/')
  }, [])

  return (
    <AppLayout className="notifications" footerStatus="footer-status">
      <div className="new-nft-title settings-title">
        {t('notification Settings')}
      </div>
      <div className="switch-container mt-40">
        <NotificationSettingItem
          item={{ title: t('show Notifications') }}
          key={0}
          index={0}
          isMenu={false}
          className="notification-title-color"
        />
        <div className="bottom-line m-0"></div>
        {NotificationList.map((item, index) => (
          <NotificationSettingItem
            // item={item}
            item={{ title: `${t('notification')} ${index + 1}` }}
            key={index}
            index={index}
            isMenu={false}
            className="notification-title-color"
          />
        ))}
        <div className="bottom-line m-0"></div>
      </div>
    </AppLayout>
  )
}

export default NotificationSettings
