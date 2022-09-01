/* eslint-disable no-unused-vars */
import React from 'react'
import classnames from 'classnames'

interface Props {
  type?: 'button' | 'submit'
  onClick: (v?: string) => void
  disabled?: boolean
  className?: string
  children?: string | React.ReactNode
}

const Button: React.FC<Props> = ({
  type,
  onClick,
  disabled,
  className,
  children,
}) => {
  return (
    <button
      type={type || 'button'}
      onClick={(): void => onClick()}
      disabled={disabled}
      className={classnames(className)}
    >
      <b>{children}</b>
    </button>
  )
}

export default Button
