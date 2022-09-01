import CameraAltOutlinedIcon from '@mui/icons-material/CameraAltOutlined'
import FormInput from '@components/Form/FormInput'
import Select from '@components/Form/Select'
import SubmitButton from '@components/SubmitButton'
import { useTranslation } from 'react-i18next'
import { useEffect, useRef, useState } from 'react'
import { monthSet } from '@root/constants'

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

const CreateNft = () => {
  const { t } = useTranslation()
  const inputFile = useRef<HTMLInputElement>(null)
  const [nftMedia, setNFTMedia] = useState<any>()
  const [pictureFile, setPictureFile] = useState<any>()
  const [fileLoadStatus, setFileLoadStatus] = useState(false)

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

  const onSetNFTFile = ({
    currentTarget: { files, name },
  }: React.ChangeEvent<HTMLInputElement>) => {
    if (files && files.length && name === 'nftMedia') setNFTMedia(files[0])
  }

  const handleFileInput = () => {
    setFileLoadStatus(false)
    if (inputFile.current) {
      inputFile.current.click()
    }
  }

  const handleSubmit = () => {
    if (nftMedia) {
      setFileLoadStatus(false)
    } else {
      setFileLoadStatus(true)
    }
  }

  useEffect(() => {
    if (nftMedia) {
      const objectUrl = URL.createObjectURL(nftMedia)
      setPictureFile(objectUrl)
      return () => URL.revokeObjectURL(objectUrl)
    }
  }, [nftMedia])

  const bidderList = [
    {
      id: 1,
      name: t('highest Bidder'),
    },
    {
      id: 2,
      name: t('lucky Winner'),
    },
    {
      id: 3,
      name: t('myself'),
    },
  ]
  return (
    <>
      <div className="createnft-fileload" onClick={handleFileInput}>
        <input
          id="media"
          name="nftMedia"
          accept="image/*"
          type="file"
          autoComplete="off"
          tabIndex={-1}
          style={{ display: 'none' }}
          ref={inputFile}
          onChange={onSetNFTFile}
        />
        {nftMedia ? (
          <div className="player-avatar-root">
            <img
              src={pictureFile ? pictureFile : URL.createObjectURL(nftMedia)}
              alt="image"
              className="player-avatar-picture"
            />
          </div>
        ) : (
          <div className="createnft-fileload-description">
            Load from Gallery
          </div>
        )}
      </div>
      {nftMedia ? (
        <div className="createnft-fileload-btn" onClick={handleFileInput}>
          {t('change artwork')}
        </div>
      ) : (
        // <div
        //   className="createnft-fileload-btn green-color"
        //   onClick={handleFileInput}
        // >
        //   {t('upload artwork')}
        // </div>
        <></>
      )}
      <div className="createnft-input-container">
        <div className="createnft-input-item">
          <div className="input-label">{t('name of NFT')}</div>
          <FormInput
            id="name"
            type="text"
            placeholder={t('enter nft name')}
            name="name"
            maxLength={30}
            // value={}
            handleChange={() => {
              return
            }}
            onBlur={() => {
              return
            }}
          />
        </div>
        <div className="createnft-input-item">
          <div className="input-label">{t('who gets it')}</div>
          <div className="player-dashboard-select">
            <Select
              placeholder={t('select')}
              data={bidderList}
              title={t('select')}
              onChange={() => {
                return
              }}
            />
          </div>
        </div>
        <div className="createnft-input-item">
          <div className="input-label">{t('bidding end date')}</div>
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
      </div>
      <SubmitButton
        isDisabled={false}
        title={t('create NFT')}
        className="createnft-createbtn"
        onPress={() => console.log('')}
      />
    </>
  )
}

export default CreateNft
