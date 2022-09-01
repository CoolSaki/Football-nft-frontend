/* eslint-disable no-unused-vars */
import React from 'react'
import classNames from 'classnames'

interface Props {
  id?: string
  type?: 'text' | 'checkbox' | 'radio' | 'email' | 'password' | 'number'
  value?: number | string
  name?: string
  onChange: (v?: string) => void
  onBlur: (v?: any) => void
  disabled?: boolean
  className?: string
  placeholder?: string
  min?: number
  max?: number
  maxLength?: number
  allowAlphaNumeric?: boolean
}

const Input: React.FC<Props> = ({
  id,
  type,
  value,
  name,
  onChange,
  onBlur,
  disabled,
  placeholder,
  className,
  min,
  max,
  allowAlphaNumeric = false,
  maxLength = 50,
}) => {
  const handleChange = (event: any) => {
    if (!allowAlphaNumeric) {
      event.preventDefault()
      const re = /^[0-9.\b]+$/
      // if value is not blank, then test the regex
      if (event.target.value === '' || re.test(event.target.value)) {
        onChange(event)
      }
    } else {
      onChange(event)
    }
  }

  return (
    <input
      id={id || ''}
      type={type || 'text'}
      value={value}
      name={name}
      maxLength={maxLength}
      onChange={handleChange}
      onBlur={e => onBlur(e)}
      disabled={disabled}
      placeholder={placeholder}
      min={min}
      max={max}
      className={classNames(className)}
    />
  )
}

export default Input
