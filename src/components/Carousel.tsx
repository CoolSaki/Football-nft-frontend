import React from 'react'
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
}

const Carousel: React.FC<Props> = ({ items, responsiveWideMode }) => {
  return (
    <AliceCarousel
      mouseTracking
      items={items}
      disableButtonsControls={false}
      keyboardNavigation={true}
      responsive={
        responsiveWideMode ? responsiveItemWide : responsiveItemDefault
      }
      autoPlayInterval={1000}
      // infinite
      autoPlay={false}
      renderPrevButton={() => {
        // return <p className="p-4 absolute left-0 top-0">Previous Item</p>
        return (
          <img loading="lazy" src={leftArrow} alt="" className="img-radius" />
        )
      }}
      renderNextButton={() => {
        // return <p className="p-4 absolute right-0 top-0">Next Item</p>
        return (
          <img loading="lazy" src={rightArrow} alt="" className="img-radius" />
        )
      }}
    />
  )
}

export default Carousel
