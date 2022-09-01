import { MOBILE_MAX_WIDTH, PRIVATE_KEY, PUBLIC_KEY } from '@root/constants'
import { JSEncrypt } from 'jsencrypt'

export const sleep = (ms: number) => {
  return new Promise(resolve => setTimeout(resolve, ms))
}

export const isNumeric = (str: string) => {
  if (typeof str != 'string') {
    return false
  } // we only process strings!
  return !isNaN(parseFloat(str)) && !isNaN(parseFloat(str)) // ...and ensure strings of whitespace fail
}

export const asyncLocalStorage = {
  setItem: function (key: string, value: string) {
    return Promise.resolve().then(function () {
      localStorage.setItem(key, value)
    })
  },
  getItem: function (key: string) {
    return Promise.resolve().then(function () {
      return localStorage.getItem(key)
    })
  },
  removeItem: function (key: string) {
    return Promise.resolve().then(function () {
      return localStorage.removeItem(key)
    })
  },
}

export const isMobile = () => {
  return window.innerWidth <= MOBILE_MAX_WIDTH
}

export const truncateDecimals = (number: number, digits: number) => {
  const multiplier = Math.pow(10, digits),
    adjustedNum = number * multiplier,
    truncatedNum = Math[adjustedNum < 0 ? 'ceil' : 'floor'](adjustedNum)
  return truncatedNum / multiplier
}

export const encrypt = (text?: string) => {
  if (!text) {
    return ''
  }
  return text
  // const encrypt = new JSEncrypt()
  // encrypt.setPublicKey(PUBLIC_KEY)
  // return encrypt.encrypt(text)
}

export const decrypt = (text?: string) => {
  if (!text) {
    return ''
  }
  return text
  // const decrypt = new JSEncrypt()
  // decrypt.setPrivateKey(PRIVATE_KEY)
  // const decrypted = decrypt.decrypt(text)
  // return decrypted ? decrypted : ''
}
