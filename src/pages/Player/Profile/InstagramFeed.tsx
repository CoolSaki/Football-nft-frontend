import Carousel from '@components/Carousel'
import React, { useState, useEffect, useRef } from 'react'
import axios from 'axios'
import { useTranslation } from 'react-i18next'
import { INSTAGRAM_KEY } from '@root/constants'

const InstagramFeed: React.FC<any> = () => {
  const { t } = useTranslation()
  const [feeds, setFeedsData] = useState([])
  const items: JSX.Element[] = []
  async function fetchInstagramPost() {
    try {
      axios
        .get(
          `https://graph.instagram.com/me/media?fields=id,media_type,media_url,caption&limit=100&media_type=CAROUSEL_ALBUM&access_token=${INSTAGRAM_KEY}`,
        )
        .then(resp => {
          setFeedsData(resp.data.data)
        })
    } catch (err) {
      console.log('error', err)
    }
  }
  useEffect(() => {
    // fetchInstagramPost()
  }, [])
  useEffect(() => {
    feeds.map((feed: any) =>
      items.push(
        <img
          width="100%"
          height="auto"
          id={feed.id}
          src={feed.media_url}
          alt={feed.caption}
        />,
      ),
    )
  }, [feeds])

  return (
    <div className="instagram-feed">
      <div className="blog-title">{t('instagram feed')}</div>
      <div className="flex-center">
        <div className="blog-content">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit
        </div>
      </div>
      <div className="flex-center">
        {items.length === 0 && <div className="blog-image"></div>}
        {items.length > 0 && (
          <div className="fullwidth flex-center">
            <div className="carousel">
              <Carousel items={items} responsiveWideMode={true} />
            </div>
          </div>
        )}
      </div>
      <a
        className="blog-button"
        href="https://www.instagram.com"
        target="_blank"
      >
        {t('go_to_instagram')}
      </a>
    </div>
  )
}

export default InstagramFeed
