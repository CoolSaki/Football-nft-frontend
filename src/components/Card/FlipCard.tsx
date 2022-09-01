import React, { useState } from 'react'
import '@assets/css/components/FlipCard.css'
import { useTranslation } from 'react-i18next'
interface Props {
  title: string
  desc: string
}

const FlipCard: React.FC<Props> = ({ title, desc }) => {
  const [flip, setFlip] = useState(false)
  const { t } = useTranslation()
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
    <div className="flip-card">
      <div
        className={flip ? 'flip-card-inner show' : 'flip-card-inner'}
        onMouseOver={() => setFlip(true)}
        onMouseOut={() => setFlip(false)}
      >
        <div className="flip-card-front">
          <div className="flip-card-title">{title}</div>
          <div className="flip-card-desc">
            {desc.substr(0, 272)}
            <span onClick={() => setFlip(true)}>...</span>
          </div>
        </div>
        <div className="flip-card-back" onClick={() => setFlip(false)}>
          <div className="flip-card-desc">...{desc.substr(272)}</div>
        </div>
      </div>
    </div>
  )
}

export default FlipCard
