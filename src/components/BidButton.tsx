import React, { useEffect } from 'react'
import classNames from 'classnames'
import '@assets/css/components/SubmitButton.css'

interface Props {
  isLoading?: boolean
  isDisabled?: boolean
  title?: string
  className?: string
  onPress: (event: any) => void
}

const BidButton: React.FC<Props> = props => {
  const { isLoading, isDisabled, title, className = '', onPress } = props

  return (
    <>
      <div
        className={classNames(
          'loading-spinner-container mb-40 mt-40',
          isLoading ? 'show' : '',
        )}
      >
        <div className="loading-spinner">
          <div className="spinner__circle">
            <div className="spinner__circle-gradient"></div>
            <div className="spinner__circle-inner"></div>
          </div>
        </div>
      </div>
      <button
        type="submit"
        className={classNames(
          `form-submit-btn ${className}`,
          isLoading ? 'hide' : '',
          isDisabled ? 'btn-disabled' : '',
        )}
        disabled={isDisabled}
        onClick={onPress}
      >
        {title}
      </button>
    </>
  )
}

export default BidButton
