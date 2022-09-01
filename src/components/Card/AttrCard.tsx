import React from 'react'
import '@assets/css/components/AttrCard.css'
import { useTranslation } from 'react-i18next'

interface Props {
  title: string
  desc: string
}

const AttrCard: React.FC<Props> = ({ title, desc }) => {
  const { t } = useTranslation()
  return (
    <div className="attr-card">
      <div className="attr-card-title">{t(title)}</div>
      <div className="attr-card-desc">{t(desc)}</div>
    </div>
  )
}

export default AttrCard
