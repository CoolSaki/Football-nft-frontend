import React from 'react'

interface Props {
  index: number
  title: string
  text: string
}

const GetContent: React.FC<Props> = ({ index, title, text }) => {
  return (
    <div className="get-content">
      <div className="get-index">
        <div>{index}</div>
      </div>
      <div className="get-desc">
        <div className="get-title h-3">{title}</div>
        <div className="get-text">{text}</div>
      </div>
    </div>
  )
}

export default GetContent
