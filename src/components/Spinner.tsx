import React from 'react'
import classnames from 'classnames'
import '@assets/css/components/Spinner.css'
import { useTranslation } from 'react-i18next'

interface Props {
  spinnerStatus?: boolean
  className?: string
  title: string
}

const Spinner: React.FC<Props> = props => {
  const { t } = useTranslation()
  const { spinnerStatus, className = '', title } = props
  return (
    <div
      className={classnames(
        'spinner-container',
        className,
        spinnerStatus ? 'show' : '',
      )}
    >
      <span>{title}</span>
      <div className="spinner">
        <div className="spinner__circle">
          <div className="spinner__circle-gradient"></div>
          <div className="spinner__circle-inner"></div>
        </div>
      </div>
    </div>
  )
}

export default Spinner
