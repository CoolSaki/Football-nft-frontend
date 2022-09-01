/* eslint-disable @typescript-eslint/no-non-null-assertion */
import React, { useEffect } from 'react'

import { AppLayout } from '@components/index'
import Notification from '@components/Page/Navigation/MenuItem'
import '@assets/css/pages/Notification.css'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@root/store/rootReducers'
import { getNotifications } from '@root/apis/notification/notificationSlice'

const Notifications: React.FC = () => {
  const dispatch = useDispatch()
  const notificationsList = useSelector(
    (state: RootState) => state.notification.notificationsList,
  )

  useEffect(() => {
    dispatch(getNotifications())
    document.querySelector('title')!.innerText = 'Notifications of meCarreira'
  }, [])

  return (
    <AppLayout className="notifications" footerStatus="footer-status">
      {notificationsList.map((item: any, index: any) => (
        <Notification
          item={item}
          key={index}
          index={index}
          isMenu={false}
          className="notification-title-color"
        />
      ))}
    </AppLayout>
  )
}

export default Notifications
