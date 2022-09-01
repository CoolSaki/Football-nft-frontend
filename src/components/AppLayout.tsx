import React, { useState, useCallback, useEffect } from 'react'
import classnames from 'classnames'

import { Header, Footer } from '@components/index'

interface Props {
  children: React.ReactNode
  className?: string
  headerStatus?: string
  headerClass?: string
  footerStatus?: string
}

const AppLayout: React.FC<Props> = ({
  children,
  className,
  headerStatus,
  headerClass,
  footerStatus,
}) => {
  const [y, setY] = useState(window.scrollY)
  const [navigationStatus, setNavigationStatus] = useState(true)

  const handleNavigation = useCallback(
    e => {
      const window = e.currentTarget
      if (y > window.scrollY) {
        setNavigationStatus(true)
      } else if (y < window.scrollY) {
        setNavigationStatus(false)
      }
      setY(window.scrollY)
    },
    [y],
  )

  useEffect(() => {
    setY(window.scrollY)
    window.addEventListener('scroll', handleNavigation)

    return () => {
      window.removeEventListener('scroll', handleNavigation)
    }
  }, [handleNavigation])

  return (
    <div>
      <Header
        className={classnames(headerStatus)}
        headerClassName={classnames(headerClass)}
        navigationStatus={navigationStatus}
      />

      <div className={classnames('content-wrap', className)}>
        <div className="container">{children}</div>
      </div>

      <Footer
        className={classnames(footerStatus)}
        navigationStatus={navigationStatus}
      />
    </div>
  )
}

export default AppLayout
