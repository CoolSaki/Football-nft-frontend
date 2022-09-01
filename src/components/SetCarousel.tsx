import React from 'react'
import AliceCarousel from 'react-alice-carousel'
import 'react-alice-carousel/lib/alice-carousel.css'

const itemsLength: any = Array.from({ length: 5 })

const items = itemsLength.map((item: any, index: number) => {
  const style = { height: 200 + index * 10, border: '1px solid red' }
  return (
    <div className="item" style={style} data-value={index + 1}>
      item {index + 1}
    </div>
  )
})

interface Props {
  newItems: any
}

// const SetCarousel = (props<Props>) => {
const SetCarousel: React.FC<Props> = ({ newItems }) => {
  return <AliceCarousel autoHeight infinite mouseTracking items={newItems} />
}

export default SetCarousel
