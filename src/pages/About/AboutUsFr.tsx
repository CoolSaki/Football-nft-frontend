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
}

const ListItem: React.FC<ListItemProps> = ({
  title,
  children,
  containerClass = '',
}) => {
  return (
    <div className={classNames('list-item', containerClass)}>
      <div className="list-item-heading">
        <img loading="lazy" src={GalleryIcon} />
        <div className="terms-subtitle">{title}</div>
      </div>
      {children}
    </div>
  )
}

const AboutUsFr: React.FC = () => {
  const { t } = useTranslation()
  const [newsList, setNewsList] = useState<any>([1, 2, 3, 4, 5, 6])
  const items: JSX.Element[] = []

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
              {t('Get a digital piece of your favorite player (FR)')}
            </div>
            <p className="m-0 ct-p1">
              Ipsum ornare porta morbi velit eu, lectus. Aliquet quam sed dictum
              viverra. Sit vel suscipit quam in et aliquam nibh. Orci tellus
              curabitur ut vel nisi scelerisque odio fames non. Sed vitae sed
              pretium, in tortor eu id sodales in. Tincidunt dictum convallis
              massa amet, fermentum at nunc. A egestas nunc quam massa nisl ac
              suscipit dictum morbi. Ac volutpat, vestibulum vestibulum diam.
              Felis, venenatis, sed non ut morbi sed. Duis amet sollicitudin ut
              volutpat elementum tincidunt hac.
            </p>
            <p className="ct-p1">
              Lectus aenean turpis in penatibus mauris. Nulla nisi volutpat,
              praesent velit. Congue adipiscing nunc, placerat ac, in amet.
              Malesuada scelerisque vel amet vitae quis ut consectetur. Amet
              nunc nulla nulla arcu, arcu massa sit quisque. Volutpat molestie
              vestibulum id nibh. In nec amet feugiat sapien ipsum ullamcorper
              cursus phasellus egestas.
            </p>
            <p className="ct-p1">
              In vulputate diam eget non aenean egestas enim orci arcu, etiam
              in.
            </p>
          </div>
          <div className="circle-block"></div>
        </div>
      </div>
      {/* <div className="about-video-container">
        <div className="ct-h1 m-0 p-0">{t('About meCarreira')}</div>
        <span className="ct-p1 text-center">
          Buy the player coin to unlock access to exclusive content
        </span>
        <div className="about-video">
          <img loading="lazy" src={BuyVideo} alt="" />
        </div>
        <p className="caption ct-p3 text-center">
          Lectus aenean turpis in penatibus mauris. Nulla nisi volutpat,
          praesent velit.
        </p>
      </div> */}
      <section className="values-container">
        <div className="about-container our-values-container">
          <div className="values-header about-txt-container">
            <div className="ct-h1 p-0 m-0">{t('our values')}</div>
            <p className="ct-p1">
              Sit vel suscipit quam in et aliquam nibh. Orci tellus curabitur ut
              vel nisi scelerisque.
            </p>
          </div>
        </div>
        <div className="about-container">
          <div className="quad-block first-pic"></div>
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
        </div>
      </section>
      <section className="values-container">
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
      </section>
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
                <span>Logo {item}</span>
              </div>
            )
          })}
        </div>
      </div>
      <div className="news-container">
        <div className="ct-h2 m-0 text-center">
          {t('Read all about us in the news')}
        </div>
        <span className="ct-p1">
          Buy the player coin to unlock access to exclusive content
        </span>
        <div className="carousel news-carousel">
          <Carousel items={items} />
        </div>
      </div> */}
    </>
  )
}

export default AboutUsFr
