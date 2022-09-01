import React, { useEffect, useState } from 'react'
import { AppLayout } from '@components/index'
import { isMobile } from '@utils/helpers'
import { useNavigate } from 'react-router-dom'
import '@assets/css/pages/OurTeam.css'
import { useTranslation } from 'react-i18next'
import BuyVideo from '@assets/images/buyVideo.svg'
import GalleryIcon from '@assets/images/gallery-icon.png'
import classNames from 'classnames'
import NewsCard from '@root/components/Card/NewsCard'
import Carousel from '@components/Carousel'
import Clause from '@pages/Terms&Policy/components/Clause'
import { TeamMembers } from '@root/constants'

interface TeamMemberCardProps {
  img?: string
  fullName: string
  companyTitle: React.ReactNode
  description: string
}

const TeamMemberCard: React.FC<TeamMemberCardProps> = ({
  img = '',
  fullName,
  companyTitle,
  description,
}) => {
  return (
    <div className={classNames('team-member-container')}>
      <img
        className={classNames('team-member-img', img ? '' : 'hidden')}
        src={img}
      />
      <div className={classNames('team-member-img', img ? 'hidden' : '')}></div>
      <div className="member-info-wrapper">
        <div className="member-intro-box">
          <div className="terms-subtitle ct-h4">{fullName}</div>
          <div className="ct-p1 designation">{companyTitle}</div>
        </div>
        <p className="terms-content ct-p3">{description}</p>
      </div>
    </div>
  )
}

const OurTeamDe: React.FC = () => {
  const { t } = useTranslation()

  return (
    <>
      <div className="our-team-container">
        <Clause
          title={t('Our Team')}
          isMainTitle
          containerClass="our-team-intro text-center m-0"
        >
          <div className="terms-content ct-p1 text-center">
            Ipsum ornare porta morbi velit eu, lectus. Aliquet quam sed dictum
            viverra. Sit vel suscipit quam in et aliquam nibh. Orci tellus
            curabitur ut vel nisi scelerisque odio fames non. Sed vitae sed
            pretium, in tortor eu id sodales in. Tincidunt dictum convallis massa
            amet, fermentum at nunc. A egestas nunc quam massa nisl ac suscipit
            dictum morbi. Ac volutpat, vestibulum vestibulum diam. Felis,
            venenatis, sed non ut morbi sed. Duis amet sollicitudin ut volutpat
            elementum tincidunt hac.
          </div>
        </Clause>
        <div className="team-display">
          <div className="team-container">
            {TeamMembers.map(item => (
              <TeamMemberCard
                img={item.img}
                fullName={item.fullName}
                companyTitle={item.companyTitle}
                description={item.description}
              />
            ))}
          </div>
        </div>
      </div>
      <section className="values-container our-story-container">
        <div
          className={classNames(
            'values-header about-txt-container',
            isMobile() ? '' : 'hidden',
          )}
        >
          <div
            className={classNames('p-0 ct-h1', isMobile() ? 'mt-0' : 'mt-40')}
          >
            {t('Our Story')}
          </div>
        </div>
        <div className="about-container col-reverse">
          <div className="about-txt-container">
            <div
              className={classNames(
                'about-intro-heading story-title ct-h1',
                isMobile() ? 'hidden' : '',
              )}
            >
              {t('Our Story')}
            </div>
            {isMobile() && <br />}
            <p className="ct-p1">
              Ipsum ornare porta morbi velit eu, lectus. Aliquet quam sed dictum
              viverra. Sit vel suscipit quam in et aliquam nibh. Orci tellus
              curabitur ut vel nisi scelerisque odio fames non. Sed vitae sed
              pretium, in tortor eu id sodales in. Tincidunt dictum convallis
              massa amet, fermentum at nunc. A egestas nunc quam massa nisl ac
              suscipit dictum morbi. Ac volutpat, vestibulum vestibulum diam.
              Felis, venenatis, sed non ut morbi sed. Duis amet sollicitudin ut
              volutpat elementum tincidunt hac.
            </p>
            <br />
            <p className="ct-p1">
              Lectus aenean turpis in penatibus mauris. Nulla nisi volutpat,
              praesent velit. Congue adipiscing nunc, placerat ac, in amet.
              Malesuada scelerisque vel amet vitae quis ut consectetur. Amet
              nunc nulla nulla arcu, arcu massa sit quisque. Volutpat molestie
              vestibulum id nibh. In nec amet feugiat sapien ipsum ullamcorper
              cursus phasellus egestas.
            </p>
            <br />
            <p className="ct-p1">
              In vulputate diam eget non aenean egestas enim orci arcu, etiam
              in.
            </p>
          </div>
          <div className="quad-block"></div>
        </div>
      </section>
    </>
  )
}

export default OurTeamDe
