import React, { useEffect, useState, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import SubmitButton from '@components/SubmitButton'
import ArrowDown from '@components/Svg/ArrowDown'
import ArrowUp from '@components/Svg/ArrowUp'
import OpenInNewIcon from '@mui/icons-material/OpenInNew'
import CloseIcon from '@mui/icons-material/Close'
import FormInput from '@components/Form/FormInput'
import { PlayerCardData as PlayerItems } from '@root/constants'
import { NumberFormat } from '@utils/NumberFormat'
import Matic from '@components/Svg/Matic'
import Radio from '@mui/material/Radio'
import RadioGroup from '@mui/material/RadioGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormControl from '@mui/material/FormControl'
import CameraAltOutlinedIcon from '@mui/icons-material/CameraAltOutlined'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@root/store/rootReducers'
import {
  handleGoLive,
  updatePlayerProfile,
} from '@root/apis/playerCoins/playerCoinsSlice'
import Cropper from 'react-cropper'
import 'cropperjs/dist/cropper.css'
import Resizer from 'react-image-file-resizer'
import PersonOutlineIcon from '@mui/icons-material/PersonOutline'

const PlayerCoin = () => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const [selected, setSelected] = useState(0)
  const [playerInfo, setPlayerInfo] = useState<any>()
  const [status, setStatus] = useState('initial')
  const [withdrawAvailable, setWithdrawAvailable] = useState(false)
  const [playerStatus, setPlayerStatus] = useState<string>('deployed')
  const inputFile = useRef<HTMLInputElement>(null)
  const [nftMedia, setNFTMedia] = useState<any>()
  const [pictureFile, setPictureFile] = useState<any>()
  const [cropStatus, setCropStatus] = useState(false)
  const [imageValidationError, setImageValidationError] = useState('')
  const [imageWidth, setImageWidth] = useState(1)
  const [image, setImage] = useState('')
  const [imgTag, setImgTag] = useState<any>(document.createElement('img'))
  const [cropper, setCropper] = useState<any>()

  const getCropData = async () => {
    if (typeof cropper !== 'undefined') {
      setPictureFile(cropper.getCroppedCanvas().toDataURL())
      if (nftMedia) {
        const url = cropper.getCroppedCanvas().toDataURL()
        const file = await dataUrlToFileUsingFetch(
          url,
          'output.png',
          'image/png',
        )
        let imageFile: any
        Resizer.imageFileResizer(
          file,
          400,
          400,
          'PNG',
          100,
          0,
          output => {
            imageFile = output as File
            const formData = new FormData()
            formData.append(
              'id',
              String(playerInfo?.id || allPlayersData[0]?.id),
            )
            formData.append('playerpicture', imageFile)
            dispatch(updatePlayerProfile(formData))
            // checkPlayerDetail()

            setImage('')
          },
          'file',
          400,
          400,
        )
      } else {
        setImage('')
      }
    }
    setCropStatus(false)
  }

  const dataUrlToFileUsingFetch = async (
    url: string,
    fileName: string,
    mimeType: string,
  ) => {
    const response = await fetch(url)
    const buffer = await response.arrayBuffer()

    return new File([buffer], fileName, { type: mimeType })
  }

  const toggle = (i: number) => {
    if (selected === i) {
      return setSelected(0)
    }
    setSelected(i)
  }

  const handleLiving = () => {
    // setStatus(t('live'))
    setPlayerStatus('subscription')
    dispatch(handleGoLive())
  }

  //----------------------------------------------------------
  const playerCoinData = useSelector((state: RootState) => state.playercoins)

  const {
    playerData,
    allPlayersData,
    playerDetailStatus,
    playerActivationStatus,
  } = playerCoinData
  const {
    artistname,
    dateofbirth,
    email,
    givenname,
    nationality,
    surname,
    playerstatusid,
  } = playerData

  useEffect(() => {
    if (allPlayersData && allPlayersData.length > 0 && !playerInfo) {
      setPlayerInfo(allPlayersData[0])
    }
  }, [allPlayersData, playerInfo])

  const onSetNFTFile = (e: any) => {
    setImageValidationError('')
    e.preventDefault()
    let files
    if (e.dataTransfer) {
      files = e.dataTransfer.files
    } else if (e.target) {
      files = e.target.files
    }
    const reader = new FileReader()
    reader.onload = () => {
      setImage(reader.result as any)
      imgTag.setAttribute('src', reader.result ?? '')
    }
    reader.readAsDataURL(files[0])
    if (files && files.length) {
      const file = Math.round(files[0].size / 1024)
      // if (file >= 1024) {
      //   setImageValidationError(t('please select an image below 1MB'))
      // } else {
      setNFTMedia(files[0])
      // }
    }
  }

  useEffect(() => {
    setImageWidth(image === '' ? 1 : imgTag.width)
  }, [image])

  useEffect(() => {
    if (imageWidth > 1) {
      setCropStatus(true)
    }
  }, [imageWidth])

  const handleFileInput = () => {
    if (inputFile.current) {
      inputFile.current.click()
    }
  }

  useEffect(() => {
    if (nftMedia) {
      const objectUrl = URL.createObjectURL(nftMedia)
      setPictureFile(objectUrl)
      return () => URL.revokeObjectURL(objectUrl)
    }
  }, [nftMedia])

  const isPlayerPicture = (url: string) => {
    const test =
      /\.(jpg|JPG|jpeg|JPEG|png|PNG|webp|WEBP|avif|AVIF|gif|GIF|svg|SVG)$/.test(
        url,
      )
    console.log({ url, test })
    return test
  }

  //----------------------------------------------------------
  return (
    <div className="player-coin dlg-content">
      {/* <div className="player-avatar">
        <div className="icon-camera z-10">
          <CameraAltOutlinedIcon className="icon-camera-svg" />
        </div>
        <img src={playerInfo?.playerpicture} alt="" className="player-avatar" />
      </div> */}
      {!cropStatus && (
        <div className="player-avatar">
          <div className="icon-camera" onClick={handleFileInput}>
            <CameraAltOutlinedIcon className="icon-camera-svg" />
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
          </div>

          {nftMedia && cropper ? (
            <div className="player-avatar-root">
              <img
                src={
                  pictureFile
                    ? pictureFile
                    : cropper.getCroppedCanvas().toDataURL()
                }
                alt=""
                className="player-avatar-picture"
              />
            </div>
          ) : isPlayerPicture(playerInfo?.playerpicture) ? (
            <div className="player-avatar-root">
              <img
                src={playerInfo?.playerpicture}
                alt=""
                className="player-avatar-picture"
              />
            </div>
          ) : (
            <PersonOutlineIcon className="player-avatar-svg" />
          )}
        </div>
      )}
      {imageValidationError && (
        <div className="input-feedback text-center mb-20">
          {imageValidationError}
        </div>
      )}
      {cropStatus && (
        <div className="cropper-container">
          <div style={{ width: '100%' }}>
            <Cropper
              style={{ height: 400, width: '100%' }}
              zoomTo={imageWidth <= 1 ? 1 : 284.0 / imageWidth}
              // zoomTo={0.0001}
              initialAspectRatio={1}
              preview=".img-preview"
              src={image}
              viewMode={1}
              aspectRatio={1}
              minCropBoxHeight={50}
              minCropBoxWidth={50}
              background={false}
              responsive={false}
              cropBoxResizable={false}
              draggable={false}
              autoCropArea={1}
              checkOrientation={false} // https://github.com/fengyuanchen/cropperjs/issues/671
              onInitialized={instance => {
                setCropper(instance)
              }}
              guides={true}
            />
          </div>
          <div className="button-line">
            <button className="form-submit-btn" onClick={getCropData}>
              {t('upload')}
            </button>
          </div>
        </div>
      )}
      <div className="input-label">{t('status')}</div>
      <div className="input-label green-color mb-20">
        {t(playerActivationStatus)}
      </div>
      <div className="input-label">{t('player name')}</div>
      <div className="input-label white-color mb-20 name-label">
        {playerInfo?.givenname + ' ' + playerInfo?.surname}
      </div>
      <div className="input-label">{t('date of Birth')}</div>
      <div className="input-label white-color mb-20">
        {playerInfo?.dateofbirth}
      </div>
      <div className="input-label">{t('email address (not shared)')}</div>
      <div className="input-label white-color mb-20">{playerInfo?.email}</div>
      <div className="input-label">{t('nationality')}</div>
      <div className="input-label white-color mb-20">
        {playerInfo?.nationality?.countryname}
      </div>
      <div className="accordion">
        <div className="item" key={1}>
          <div className="title" onClick={() => toggle(1)}>
            <h2>{t('my contracts')}</h2>
            {selected === 1 ? <ArrowUp /> : <ArrowDown />}
          </div>
          <div className={selected === 1 ? 'content show' : 'content'}>
            <div>{t('player coin')}</div>
            <div className="contract-address">
              <a
                href={`https://polygonscan.com/search?f=0&q=0x3ddfd8df8dfuhuhu38dsadf9090d8f8sdfsf`}
                target="_blank"
              >
                0x3ddfd8df8dfuhuhu38dsadf9090d8f8sdfsf{' '}
              </a>
              <OpenInNewIcon className="green-color" />
            </div>
            <div>{t('staking contract')}</div>
            <div className="contract-address">
              <a
                href={`https://polygonscan.com/search?f=0&q=0x3ddfd8df8dfuhuhu38dsadf9090d8f8sdfsf`}
                target="_blank"
              >
                0x3ddfd8df8dfuhuhu38dsadf9090d8f8sdfsf{' '}
              </a>
              {/* 0x3ddfd8df8dfuhuhu38dsadf9090d8f8sdfsf{' '} */}
              <OpenInNewIcon className="green-color" />
            </div>
            <div>{t('nft contract')}</div>
            <div className="contract-address">
              <a
                href={`https://polygonscan.com/search?f=0&q=0x3ddfd8df8dfuhuhu38dsadf9090d8f8sdfsf`}
                target="_blank"
              >
                0x3ddfd8df8dfuhuhu38dsadf9090d8f8sdfsf{' '}
              </a>
              {/* 0x3ddfd8df8dfuhuhu38dsadf9090d8f8sdfsf{' '} */}
              <OpenInNewIcon className="green-color" />
            </div>
          </div>
        </div>
        <div className="item" key={2}>
          <div className="title" onClick={() => toggle(2)}>
            <h2>{t('player admin access accounts')}</h2>
            {selected === 2 ? <ArrowUp /> : <ArrowDown />}
          </div>
          <div className={selected === 2 ? 'content show' : 'content'}>
            <div className="account-address">
              <a
                href={`https://polygonscan.com/search?f=0&q=0x3ddfd8df8dfuhuhu38dsadf9090d8f8sdfsf`}
                target="_blank"
              >
                0x3ddfd8df8dfuhuhu38dsadf9090d8f8sdfsf{' '}
              </a>
              {/* 0x3ddfd8df8dfuhuhu38dsadf9090d8f8sdfsf{' '} */}
              <CloseIcon className="red-color" />
            </div>
            <div className="account-address">
              <a
                href={`https://polygonscan.com/search?f=0&q=0x3ddfd8df8dfuhuhu38dsadf9090d8f8sdfsf`}
                target="_blank"
              >
                0x3ddfd8df8dfuhuhu38dsadf9090d8f8sdfsf{' '}
              </a>
              {/* 0x3ddfd8df8dfuhuhu38dsadf9090d8f8sdfsf{' '} */}
              <CloseIcon className="red-color" />
            </div>
            <div className="input-label white-color">
              {t('add new admin account')}
            </div>
            <FormInput
              id="account"
              type="text"
              placeholder={t('placeholder')}
              name="artistName"
              // value={}
              handleChange={() => {
                return
              }}
              onBlur={() => {
                return
              }}
            />
            <div className="mb-20"></div>
            <SubmitButton
              isDisabled={true}
              title={t('add admin account')}
              onPress={() => console.log('')}
              className="m-0auto"
            />
          </div>
        </div>
        <div className="item" key={3}>
          <div className="title" onClick={() => toggle(3)}>
            <h2>{t('cryptocurrency available on contract')}</h2>
            {selected === 3 ? <ArrowUp /> : <ArrowDown />}
          </div>
          <div className={selected === 3 ? 'content show' : 'content'}>
            <div className="cryptocurrency-desc">
              {t(
                'those funds are currently on your contract and you have permission to withdraw them to your wallet.',
              )}
            </div>
            <FormControl>
              <RadioGroup
                aria-labelledby="demo-radio-buttons-group-label"
                defaultValue=""
                name="radio-buttons-group"
                onChange={() => setWithdrawAvailable(true)}
              >
                <FormControlLabel
                  value="matic"
                  control={
                    <Radio
                      sx={{
                        color: '#6BC909',
                        '&.Mui-checked': {
                          color: '#6BC909',
                        },
                      }}
                    />
                  }
                  label={
                    <div className="nft-item">
                      <div className="nft-image-section">
                        <div className="matic-logo">
                          <Matic />
                        </div>
                        <div className="nft-name white-color">
                          Polygon (MATIC)
                        </div>
                      </div>
                      <div className="nft-price-section">
                        <div className="white-color">0.334</div>
                      </div>
                    </div>
                  }
                />
                <FormControlLabel
                  value="player1"
                  control={
                    <Radio
                      sx={{
                        color: '#6BC909',
                        '&.Mui-checked': {
                          color: '#6BC909',
                        },
                      }}
                    />
                  }
                  label={
                    <div className="nft-item">
                      <div className="nft-image-section">
                        <div className="image-border">
                          <img
                            src={PlayerItems[0].img}
                            alt=""
                            className="nft-image"
                          />
                        </div>
                        <div className="nft-name">{PlayerItems[0].name}</div>
                      </div>
                      <div className="nft-price-section">
                        <div className="white-color">
                          {NumberFormat(PlayerItems[0].price)}
                        </div>
                        <div className="nft-price">
                          ${NumberFormat(PlayerItems[0].price)}
                        </div>
                      </div>
                    </div>
                  }
                />
              </RadioGroup>
            </FormControl>
            <SubmitButton
              isDisabled={!withdrawAvailable}
              title={t('withdraw')}
              onPress={() => console.log('')}
              className="m-0auto"
            />
          </div>
        </div>
      </div>

      {/* {playerDetailStatus === 'initial' && ( */}
      <SubmitButton
        isDisabled={false}
        title={t('go live')}
        onPress={handleLiving}
        className="m-0auto"
      />
      {/* // )} */}
      {/* {playerDetailStatus === 'live' && (
        <SubmitButton
          isDisabled={!withdrawAvailable}
          title={t('withdraw')}
          onPress={() => console.log('')}
          className="m-0auto"
        />
      )} */}
    </div>
  )
}

export default PlayerCoin
