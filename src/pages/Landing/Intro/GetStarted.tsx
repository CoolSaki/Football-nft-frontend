import React from 'react'
import GetContent from './GetContent'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

const data = [
  {
    index: 1,
    title: 'get a wallet or sign up',
    text: 'download compatible polygon',
  },
  {
    index: 2,
    title: 'connect your wallet',
    text: 'only if you use own wallet',
  },
  {
    index: 3,
    title: 'buy player coins',
    text: 'buy player coins directly with credit-card',
  },
  {
    index: 4,
    title: 'take action',
    text: 'arrival into football metaverse',
  },
]

const GetStarted: React.FC = () => {
  const navigate = useNavigate()
  const { t } = useTranslation()

  const handlecClick = () => {
    window.location.reload()
  }

  const getTranslation = (text: string) => {
    const translation = t(text)
    if (translation === text) {
      // return '!__no_translation__!'
      return text
    } else {
      return translation
    }
  }

  return (
    <div className="get-container m-60">
      <div className="get-header">{getTranslation('getting started')}</div>
      {data.map(item => (
        <GetContent
          index={item.index}
          key={item.index}
          title={getTranslation(item.title)}
          text={getTranslation(item.text)}
        />
      ))}
      {/* <a className="get-more-btn" href="#">
        {t('show me more')}
      </a> */}
    </div>
  )
}

export default GetStarted
