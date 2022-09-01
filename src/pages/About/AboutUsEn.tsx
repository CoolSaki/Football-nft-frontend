import React, { useEffect, useState } from 'react'
import { AppLayout } from '@components/index'
import { isMobile } from '@utils/helpers'
import { useNavigate } from 'react-router-dom'
import '@assets/css/pages/About.css'
import { useTranslation } from 'react-i18next'
import BuyVideo from '@assets/images/buyVideo.svg'
import GalleryIcon from '@assets/images/gallery-icon.png'
import classNames from 'classnames'
import NewsCard from '@root/components/Card/NewsCard'
import Carousel from '@components/Carousel'

interface ListItemProps {
  title: string
  children: React.ReactNode
  containerClass?: string
  index?: number
}

const ListItem: React.FC<ListItemProps> = ({
  title,
  children,
  containerClass = '',
  index,
}) => {
  return (
    <div className={classNames('list-item', containerClass)}>
      <div className="list-item-heading">
        {index ? (
          <div className="get-index">
            <div>{index}</div>
          </div>
        ) : (
          <img loading="lazy" src={GalleryIcon} />
        )}
        <div className="terms-subtitle">{title}</div>
      </div>
      {children}
    </div>
  )
}

const AboutUsEn: React.FC = () => {
  const { t } = useTranslation()
  const [newsList, setNewsList] = useState<any>([1, 2, 3, 4, 5, 6])
  const items: JSX.Element[] = []

  const getTranslation = (text: string) => {
    const translation = t(text)
    if (translation === text) {
      // return '!__no_translation__!'
      return text
    } else {
      return translation
    }
  }

  newsList.map((item: any, index: any) => {
    return items.push(
      <NewsCard
        title="Title"
        content="Lectus aenean turpis in penatibus mauris. Nulla nisi volutpat, praesent velit. Congue adipiscing nunc, placerat ac, in amet."
      />,
    )
  })
  return (
    <>
      <div className="about-us-container">
        <div className="about-container col-reverse">
          <div className="about-txt-container">
            <div className="ct-h1 about-intro-heading">
              {getTranslation('empowering players and fans')}
            </div>
            <p className="m-0 ct-p1">
              {getTranslation('we created meCarreira to celebrate')}
            </p>
            <p className="ct-p1">
              {getTranslation('found by swiss enterpreneurs')}
            </p>
          </div>
          <div className="circle-block"></div>
        </div>
      </div>
      {/* <div className="about-video-container">
        <div className="ct-h1 m-0 p-0">{t('About meCarreira')}</div>
        <span className="ct-p1 text-center">
          {getTranslation('buy coin to unlock')}
        </span>
        <div className="about-video">
          <img loading="lazy" src={BuyVideo} alt="" />
        </div>
        <p className="caption ct-p3 text-center">
          Lectus aenean turpis in penatibus mauris. Nulla nisi volutpat,
          praesent velit.
        </p>
      </div> */}
      <section className="values-container h-none">
        <div className="about-container our-values-container">
          <div className="values-header about-txt-container">
            <div className="ct-h1 p-0 m-0">{t('our values')}</div>
            <p className="ct-p1">{t('these values are our beliefs')}</p>
          </div>
        </div>
        <div className="about-container">
          <div className="quad-block first-pic"></div>
          <div className="about-txt-container">
            <ListItem title={t('focussed')} containerClass="ct-h3" index={1}>
              <div className="terms-content text-left ct-p1 mt-5">
                {getTranslation('focus max clarity')} <br />{' '}
                {getTranslation('you dont get results')}
              </div>
            </ListItem>
            <ListItem
              title={t('Independent')}
              containerClass="mt-40 ct-h3"
              index={2}
            >
              <div className="terms-content text-left ct-p1 mt-5">
                {getTranslation('we honor independency')}
                <br /> {getTranslation('find yourself')}
              </div>
            </ListItem>
            <ListItem
              title={t('cutting-edge')}
              containerClass="mt-40 ct-h3"
              index={3}
            >
              <div className="terms-content text-left ct-p1 mt-5">
                {getTranslation('we cutting edge')}
                <br /> {getTranslation('being on edge not safe')}
              </div>
            </ListItem>
          </div>
        </div>
      </section>
      <section className="values-container h-none purpose-section">
        <div className="about-container our-values-container">
          <div className="values-header about-txt-container purpose-container">
            <div className="ct-h1 p-0 m-0">{t('our purpose')}</div>
            <p className="ct-h4 mb-0">{t('make full use of your potential')}</p>
            <p className="ct-p1">
              {getTranslation('our aim is empowering players')}{' '}
            </p>
            <p className="ct-h4 mb-0">
              {t('each talent has the power to create a career')}
            </p>
            <p className="ct-p1">
              {getTranslation('whether you are professional player')}
            </p>
          </div>
        </div>
        <div className="about-container purpose-block">
          <div className="quad-block"></div>
          <div className="about-txt-container">
            <ListItem title={t('players')} containerClass="ct-h3" index={1}>
              <div className="terms-content text-left ct-p1 mt-5">
                {getTranslation('players can extend market')}
              </div>
            </ListItem>
            <ListItem title={t('fans')} containerClass="mt-40 ct-h3" index={2}>
              <div className="terms-content text-left ct-p1 mt-5">
                {getTranslation('everybody that loves football')}
              </div>
            </ListItem>
            <ListItem
              title={t('talents')}
              containerClass="mt-40 ct-h3"
              index={3}
            >
              <div className="terms-content text-left ct-p1 mt-5">
                {getTranslation('new generation of talented players')}
              </div>
            </ListItem>
          </div>
        </div>
      </section>
      {/* <section className="values-container">
        <div className="about-container our-values-container">
          <div className="values-header about-txt-container">
            <div className="ct-h1 p-0 mt-40">{t('Our Promise')}</div>
            <p className="ct-p1">
              Sit vel suscipit quam in et aliquam nibh. Orci tellus curabitur ut
              vel nisi scelerisque.
            </p>
          </div>
        </div>
        <div className="about-container col-reverse">
          <div className="about-txt-container">
            <ListItem title={t('Title 1')} containerClass="ct-h3">
              <div className="terms-content text-left ct-p1 mt-5">
                Lectus aenean turpis in penatibus mauris. Nulla nisi volutpat,
                praesent velit. Congue adipiscing nunc, placerat ac, in amet.
                Malesuada scelerisque vel amet vitae quis ut consectetur. Amet
                nunc nulla nulla arcu, arcu massa sit quisque. Volutpat molestie
                vestibulum id nibh. In nec amet feugiat sapien ipsum ullamcorper
                cursus phasellus egestas.
              </div>
            </ListItem>
            <ListItem title={t('Title 2')} containerClass="mt-40 ct-h3">
              <div className="terms-content text-left ct-p1 mt-5">
                Lectus aenean turpis in penatibus mauris. Nulla nisi volutpat,
                praesent velit. Congue adipiscing nunc, placerat ac, in amet.
                Malesuada scelerisque vel amet vitae quis ut consectetur. Amet
                nunc nulla nulla arcu, arcu massa sit quisque. Volutpat molestie
                vestibulum id nibh. In nec amet feugiat sapien ipsum ullamcorper
                cursus phasellus egestas.
              </div>
            </ListItem>
            <ListItem title={t('Title 3')} containerClass="mt-40 ct-h3">
              <div className="terms-content text-left ct-p1 mt-5">
                Lectus aenean turpis in penatibus mauris. Nulla nisi volutpat,
                praesent velit. Congue adipiscing nunc, placerat ac, in amet.
                Malesuada scelerisque vel amet vitae quis ut consectetur. Amet
                nunc nulla nulla arcu, arcu massa sit quisque. Volutpat molestie
                vestibulum id nibh. In nec amet feugiat sapien ipsum ullamcorper
                cursus phasellus egestas.
              </div>
            </ListItem>
          </div>
          <div className="quad-block"></div>
        </div>
      </section> */}
      {/* <div className="collaboration-container">
        <div className="ct-h1 m-0">{t('Our Collaborations')}</div>
        <span className="ct-p1">
          Sit vel suscipit quam in et aliquam nibh. Orci tellus curabitur ut vel
          nisi scelerisque.
        </span>
        <div className="collaborations-wrapper">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((item: number) => {
            return (
              <div className="collaboration">
                <span>
                  {getTranslation('logo')} {item}
                </span>
              </div>
            )
          })}
        </div>
      </div>
      <div className="news-container">
        <div className="ct-h2 m-0 text-center">
          {t('read all about us in the news')}
        </div>
        <span className="ct-p1">{getTranslation('buy_the_player_coin')}</span>
        <div className="carousel news-carousel">
          <Carousel items={items} />
        </div>
      </div> */}
    </>
  )
}

export default AboutUsEn
