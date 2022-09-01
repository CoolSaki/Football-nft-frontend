import React from 'react'
import { useTranslation } from 'react-i18next'
import TutorialCarousel from '@components/TutorialCarousel'
import { TutorialData } from '@root/constants'
import Tutorial from './Tutorial'

const items: JSX.Element[] = []
TutorialData.map((item, index) =>
  items.push(<Tutorial img={item.img} title={item.title} desc={item.desc} />),
)

const Tutorials: React.FC = () => {
  const { t } = useTranslation()

  return (
    <div className="tutorials-container">
      <div>
        <span className="blog-title">{t('tutorials')}</span>
        <div className="alert-wrapper">
          <div className="heading-title unverified-alert">
            {t('tutorials are coming soon')}
          </div>
        </div>
        {/* <div className="tutorial-carousel">
          <TutorialCarousel items={items} />
        </div>
        <div className="get-more-btn">Show all</div> */}
      </div>
    </div>
  )
}

export default Tutorials
