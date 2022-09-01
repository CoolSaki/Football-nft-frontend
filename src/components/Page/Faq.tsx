import { useState } from 'react'
import RemoveIcon from '@mui/icons-material/Remove'
import AddIcon from '@mui/icons-material/Add'

import { Faq as FaqItems } from '@root/constants'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'

interface Props {
  showButton?: boolean
}
const Faq: React.FC<Props> = ({ showButton }) => {
  const [selected, setSelected] = useState(0)
  const navigate = useNavigate()
  const { t } = useTranslation()

  const toggle = (i: number) => {
    if (selected === i) {
      return setSelected(-1)
    }
    setSelected(i)
  }

  const getTranslation = (text: string) => {
    const translation = t(text)
    if (translation === text) {
      // return '!__no_translation__!'
      return text
    } else {
      return translation
    }
  }

  return (
    <div className="App">
      <div className="wrapper">
        <div className="accordion">
          {FaqItems.map((item, i) => (
            <div className="item" key={i}>
              <div className="title" onClick={() => toggle(i)}>
                <div>{getTranslation(item.question)}</div>
                {selected === i ? (
                  <RemoveIcon style={{ color: '#6BC909', width: '17.5px' }} />
                ) : (
                  <AddIcon style={{ color: '#6BC909', width: '17.5px' }} />
                )}
              </div>
              <div className={selected === i ? 'content show' : 'content line'}>
                {item.answer.map((text, index) => (
                  <p key={index}>{getTranslation(text)}</p>
                ))}
              </div>
              {/* <div className={selected === i ? 'content show' : 'content line'}>
                {item.answer}
              </div> */}
            </div>
          ))}
          {showButton && (
            <div className="get-more-btn" onClick={() => navigate('faqs')}>
              {getTranslation('show all')}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Faq
