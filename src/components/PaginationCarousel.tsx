import React, { useState, useRef, useEffect } from 'react'
import AliceCarousel from 'react-alice-carousel'
import 'react-alice-carousel/lib/alice-carousel.css'
import '@assets/css/components/Carousel.css'
import leftArrow from '@assets/images/left_angle_bracket.png'
import rightArrow from '@assets/images/right_angle_bracket.png'

const responsiveItemDefault = {
  0: {
    items: 1,
  },
  1024: {
    items: 3,
  },
  1216: {
    items: 4,
  },
}
const responsiveItemWide = {
  0: {
    items: 1,
  },
  1024: {
    items: 3,
  },
}
interface Props {
  items: any
  responsiveWideMode?: any
  carouselCallBack?: any
  isPlayersCoinCarousel?: boolean
  activeIndex?: number
}

const refObj = {
  '24h_change': '',
  coin_issued: '',
  holders: '',
  id: '',
  matic: '',
}

const PaginationCarousel: React.FC<Props> = ({
  items,
  responsiveWideMode,
  isPlayersCoinCarousel = false,
  carouselCallBack,
  activeIndex,
}) => {
  const [scrollDirection, setScrollDirection] = useState('forth')
  const prevItemRef = useRef<any>(null)
  const [changedItem, setChangedItem] = useState(1)

  const handleSlideChange = (evt: any) => {
    if (isPlayersCoinCarousel) {
      if (evt.item < 8) {
        setChangedItem(evt.item)
        if (evt.item < prevItemRef.current) {
          carouselCallBack(evt.item, 'back')
        } else if (evt.item >= prevItemRef.current) {
          carouselCallBack(evt.item, 'forth')
        }
      }
    }
  }

  useEffect(() => {
    prevItemRef.current = changedItem
  }, [changedItem])

  return (
    <AliceCarousel
      mouseTracking
      items={items}
      disableButtonsControls={false}
      keyboardNavigation={true}
      onSlideChanged={handleSlideChange}
      responsive={
        responsiveWideMode ? responsiveItemWide : responsiveItemDefault
      }
      activeIndex={activeIndex}
      autoPlayInterval={1000}
      autoPlay={false}
      // renderPrevButton={() => {
      //   // return <p className="p-4 absolute left-0 top-0">Previous Item</p>
      //   return (
      //     <img loading="lazy" src={leftArrow} alt="" className="img-radius" />
      //   )
      // }}
      // renderNextButton={() => {
      //   // return <p className="p-4 absolute right-0 top-0">Next Item</p>
      //   return (
      //     <img loading="lazy" src={rightArrow} alt="" className="img-radius" />
      //   )
      // }}
      renderPrevButton={() => {
        return (
          <img
            src={leftArrow}
            alt=""
            onClick={() => setScrollDirection('back')}
            className="img-radius"
          />
        )
      }}
      renderNextButton={() => {
        return (
          <img
            src={rightArrow}
            alt=""
            onClick={() => setScrollDirection('forth')}
            className="img-radius"
          />
        )
      }}
    />
  )
}

export default PaginationCarousel
