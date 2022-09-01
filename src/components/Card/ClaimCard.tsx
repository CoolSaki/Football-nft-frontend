import React from 'react'
import '@assets/css/components/ClaimCard.css'
import { useTranslation } from 'react-i18next'

interface Props {
  title: string
  desc: string
}

const ClaimCard: React.FC<Props> = ({ title, desc }) => {
  const { t } = useTranslation()
  return (
    <div className="claim-card">
      <div className="claim-card-title">{t(title)}</div>
      <div className="claim-card-desc">{t(desc)}</div>
    </div>
  )
}

export default ClaimCard
