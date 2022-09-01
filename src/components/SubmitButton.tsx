import React, { useEffect } from 'react'
import classNames from 'classnames'
import { useSelector } from 'react-redux'
import { RootState } from '@root/store/rootReducers'
import '@assets/css/components/SubmitButton.css'

interface Props {
  isLoading?: boolean
  isDisabled?: boolean
  title?: string
  className?: string
  onPress: () => void
}

const SubmitButton: React.FC<Props> = props => {
  const { isLoading, isDisabled, title, className = '', onPress } = props
  const authenticationData = useSelector(
    (state: RootState) => state.authentication,
  )

  const { loader } = authenticationData

  return (
    <>
      <div
        className={classNames(
          'loading-spinner-container mb-40 mt-40',
          loader || isLoading ? 'show' : '',
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
          loader || isLoading ? 'hide' : '',
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

export default SubmitButton
