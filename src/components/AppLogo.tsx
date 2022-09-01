import React, { useContext } from 'react'
import classnames from 'classnames'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

import { AddressFormat } from '@root/utils/AddressFormat'
import Logo from '@assets/images/logo-min.png'
import { ConnectContext } from '@root/WalletConnectProvider'

interface Props {
  className?: string
}

const AppLogo: React.FC<Props> = ({ className }) => {
  const { t } = useTranslation()
  const { connectStatus } = useContext(ConnectContext)
  let loginInfo = localStorage.getItem('loginInfo')

  if (loginInfo !== null) {
    loginInfo = AddressFormat(loginInfo, 10)
  }

  return (
    <div className={classnames('logo', className)}>
      {Boolean(loginInfo) ? (
        <div className="wallet-address">
          {t('wallet')} ({loginInfo})
        </div>
      ) : (
        <Link to="/">
          <img loading="lazy" src={Logo} alt="" className="logo-img" />
        </Link>
      )}
    </div>
  )
}

export default AppLogo
