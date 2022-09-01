/* eslint-disable no-unused-vars */
import React from 'react'
import Modal from 'react-modal'
import classnames from 'classnames'
import '@assets/css/components/BottomPopup.css'
interface Props {
  formActive?: string
  isOpen: boolean
  children: React.ReactNode
  contentClass?: string
  mode?: string
}

Modal.setAppElement('#root')

const BottomPopup: React.FC<Props> = ({
  isOpen,
  children,
  contentClass,
  mode,
}) => {
  return (
    <div
      id="myBottomPopup"
      className={classnames('bottom-popup', mode, isOpen ? 'show' : '')}
    >
      <div className={classnames('bottom-popup-content', mode, contentClass)}>
        {children}
      </div>
    </div>
  )
}

export default BottomPopup
