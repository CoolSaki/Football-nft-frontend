/* eslint-disable no-unused-vars */
import React from 'react'
import Modal from 'react-modal'
import classnames from 'classnames'
import { isMobile } from '@utils/helpers'
import '@assets/css/components/DialogBox.css'
interface Props {
  formActive?: string
  isOpen: boolean
  children: React.ReactNode
  contentClass?: string
  closeBtnClass?: string
  parentClass?: string
  onClose: (v?: any) => void
}

Modal.setAppElement('#root')

const DialogBox: React.FC<Props> = ({
  isOpen,
  children,
  contentClass,
  closeBtnClass,
  parentClass,
  onClose,
}) => {
  return (
    <div
      id="myModal"
      className={classnames('modal', isOpen ? 'show' : '', parentClass)}
    >
      <div className={classnames('modal-content', contentClass)}>
        <button
          className={classnames('close', isMobile() ? closeBtnClass : '')}
        >
          <span onClick={onClose}>&times;</span>
        </button>
        {children}
      </div>
    </div>
  )
}

export default DialogBox
