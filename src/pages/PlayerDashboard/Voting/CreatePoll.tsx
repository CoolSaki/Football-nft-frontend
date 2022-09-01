import CameraAltOutlinedIcon from '@mui/icons-material/CameraAltOutlined'
import FormInput from '@components/Form/FormInput'
import Select from '@components/Form/Select'
import SubmitButton from '@components/SubmitButton'
import { useEffect, useState } from 'react'
import { monthSet } from '@root/constants'
import { useTranslation } from 'react-i18next'

const daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
const today = new Date()
const targetDate = new Date(
  today.getFullYear() - 42,
  today.getMonth(),
  today.getDate(),
)
interface Years {
  id: number
  value: number
  title: number
}

const CreatePoll = () => {
  const { t } = useTranslation()
  const [daySelected, setDaySelected] = useState(targetDate.getDate())
  const [monthSelected, setMonthSelected] = useState(targetDate.getMonth())
  const [yearSelected, setYearSelected] = useState(targetDate.getFullYear())
  const [yearSet, setYearSet] = useState<Years[]>([])
  const [daysSet, setDaysSet] = useState<Years[]>([])

  useEffect(() => {
    window.scrollTo(0, 0)
    setDate(targetDate)
    setYears(20)
  }, [])

  function setDate(date: any) {
    setDays(date.getMonth())
    setDaySelected(date.getDate())
    setMonthSelected(date.getMonth())
    setYearSelected(date.getFullYear())
  }

  function setDays(monthIndex: number) {
    const optionCount = 0 //daySelected //2 //$('#select-day option').length,
    const daysCount = daysInMonth[monthIndex]
    const daysArr = []
    if (optionCount < daysCount) {
      for (let i = optionCount; i < daysCount; i++) {
        daysArr.push({
          id: i + 1,
          value: i + 1,
          title: i + 1,
        })
      }
      setDaysSet(daysArr)
    } else {
      for (let i = daysCount; i < optionCount; i++) {
        const optionItem = '#select-day option[value=' + (i + 1) + ']'
      }
    }
  }

  function setYears(val: number) {
    const year = targetDate.getFullYear()
    const yearArr = []
    for (let i = 0; i < val; i++) {
      yearArr.push({
        id: i + 1,
        value: year + i,
        title: year + i,
      })
    }
    setYearSet(yearArr)
  }

  const handleDayChange = (evt: any) => {
    setDaySelected(evt.target.value)
  }

  const handleMonthChange = (evt: any) => {
    setMonthSelected(evt.target.value)
    const monthIndex = monthSelected
    setDays(evt.target.value)
  }

  const handleYearChange = (evt: any) => {
    setYearSelected(evt.target.value)
  }

  return (
    <>
      <div className="createpoll-input-container">
        <div className="createpoll-input-item">
          <div className="input-label">{t('vote closes on')}</div>
          <div className="birthday">
            <select
              id="select-day"
              className="dob-select"
              // value={values.daySelected}
              name="daySelected"
              // onChange={handleChange}
              onChange={(event: any) => {
                // handleChange(event)
                // calculateTotal(event)
                handleDayChange(event)
              }}
              // onBlur={handleBlur}
            >
              <option>DD</option>
              {daysSet.map(({ value, title }, index) => (
                <option key={index} value={value}>
                  {title}
                </option>
              ))}
            </select>
            <select
              id="select-month"
              className="dob-select"
              // value={values.monthSelected}
              name="monthSelected"
              // onChange={handleChange}
              onChange={(event: any) => {
                // handleChange(event)
                // calculateTotal(event)
                handleMonthChange(event)
              }}
              // onBlur={handleBlur}
            >
              <option>MM</option>
              {monthSet.map(({ value, title }, index) => (
                <option key={index} value={value}>
                  {title}
                </option>
              ))}
            </select>
            <select
              id="select-year"
              className="dob-select"
              // value={values.yearSelected}
              name="yearSelected"
              // onChange={handleChange}
              onChange={(event: any) => {
                // handleChange(event)
                // calculateTotal(event)
                handleYearChange(event)
              }}
              // onBlur={handleBlur}
            >
              <option>YYYY</option>
              {yearSet.map(({ value, title }, index) => (
                <option key={index} value={value}>
                  {title}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="createpoll-input-item">
          <div className="input-label">{t('voting question')}</div>
          <textarea
            className="createpoll-textarea"
            placeholder={t('enter voting question')}
          ></textarea>
        </div>
        <div className="createpoll-input-item">
          <div className="input-label">{t('answer')} 1</div>
          <FormInput
            id="answer1"
            type="text"
            placeholder={t('enter answer')}
            name="answer1"
            maxLength={2}
            // value={}
            handleChange={() => {
              return
            }}
            onBlur={() => {
              return
            }}
          />
        </div>
        <div className="createpoll-input-item margin-bottom-0">
          <div className="input-label">{t('answer')} 2</div>
          <FormInput
            id="answer2"
            type="text"
            placeholder={t('enter answer')}
            name="answer2"
            maxLength={2}
            // value={}
            handleChange={() => {
              return
            }}
            onBlur={() => {
              return
            }}
          />
        </div>
      </div>
      <div className="createpoll-answer-addbtn">{t('add more answers')}</div>
      <SubmitButton
        isDisabled={false}
        title={t('new voting poll')}
        className="createpoll-createbtn"
        onPress={() => console.log('')}
      />
    </>
  )
}

export default CreatePoll
