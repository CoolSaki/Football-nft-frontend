import React from 'react'

interface Props {
  img: string
  title: string
  desc: string
}

const Tutorial: React.FC<Props> = ({ img, title, desc }) => {
  return (
    <div className="tutorial-container">
      <div className="tutorial-img">
        <img src={img}></img>
      </div>
      <div className="tutorial-text">
        <div className="tutorial-title">{title}</div>
        <div className="tutorial-desc">{desc}</div>
        <div className="tutorial-readmore">READ MORE</div>
      </div>
    </div>
  )
}

export default Tutorial
