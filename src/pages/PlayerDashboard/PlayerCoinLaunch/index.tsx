import React, { useEffect, useState, useRef } from 'react'
import SubmitButton from '@components/SubmitButton'
import classnames from 'classnames'
import { useTranslation } from 'react-i18next'
import PersonOutlineIcon from '@mui/icons-material/PersonOutline'
import CameraAltOutlinedIcon from '@mui/icons-material/CameraAltOutlined'
import {
  getPlayerData,
  setDeployed,
  setGoLive,
  updatePlayerProfile,
} from '@root/apis/playerCoins/playerCoinsSlice'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@root/store/rootReducers'
import Spinner from '@components/Spinner'
import Cropper from 'react-cropper'
import 'cropperjs/dist/cropper.css'
import Resizer from 'react-image-file-resizer'
interface Props {
  onSubmit: () => any
}
let repeat: any = null
const PlayerCoinLaunch: React.FC<Props> = ({ onSubmit }) => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const inputFile = useRef<HTMLInputElement>(null)
  const [nftMedia, setNFTMedia] = useState<any>()
  const [playerInfo, setPlayerInfo] = useState<any>()
  const [pictureFile, setPictureFile] = useState<any>()
  const [profileError, setProfileError] = useState<any>('')
  const [fileLoadStatus, setFileLoadStatus] = useState(false)
  const [cropStatus, setCropStatus] = useState(false)
  const [imageValidationError, setImageValidationError] = useState('')
  const [imageWidth, setImageWidth] = useState(1)

  const playerCoinData = useSelector((state: RootState) => state.playercoins)

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
            formData.append('id', String(newPlayerId || allPlayersData[0]?.id))
            formData.append('playerpicture', imageFile)
            dispatch(updatePlayerProfile(formData))
            setFileLoadStatus(false)
            // checkPlayerDetail()

            setImage('')
          },
          'file',
          400,
          400,
        )
      } else {
        setFileLoadStatus(true)
        setImage('')
      }
    }
    setCropStatus(false)
  }

  const {
    isLoading,
    isGetPlayerError,
    isGetPlayerSuccess,
    isUpdatePlayerProfileSuccess,
    isUpdatePlayerProfileError,
    playerData,
    newPlayerId,
    allPlayersData,
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
  const authenticationData = useSelector(
    (state: RootState) => state.authentication,
  )
  const { countriesData } = authenticationData

  useEffect(() => {
    if (allPlayersData && allPlayersData.length > 0) {
      const playerIdIndex = allPlayersData.findIndex(
        (item: any) => item.givenname === givenname,
      )
      setPlayerInfo(allPlayersData[0])
      if (
        ['Deployed', 'Cancelled'].includes(
          allPlayersData[0].playerstatusid.playerstatusname,
        ) ||
        allPlayersData[0]?.playerpicture
      ) {
        console.log('mine kampf')
        clearInterval(repeat)
      }
    }
    console.log('APD----', { allPlayersData })
  }, [allPlayersData])

  // useEffect(() => {
  //   if (isUpdatePlayerProfileSuccess || allPlayersData[0]?.playerpicture) {
  //     console.log('UPPSuccess')
  //     dispatch(setDeployed())
  //   }
  // }, [isUpdatePlayerProfileSuccess])

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
    setFileLoadStatus(false)
    if (inputFile.current) {
      inputFile.current.click()
    }
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

  const handleSubmit = async () => {
    if (nftMedia || playerCoinData.allPlayersData[0]?.playerpicture) {
      clearInterval(repeat)
      localStorage.setItem('PLAYER_STATUS', 'deployed')
      dispatch(setDeployed())
    } else {
      setFileLoadStatus(true)
    }
  }

  const checkPlayerDetail = () => {
    clearInterval(repeat)
    repeat = setInterval(() => {
      console.log('PCL_TIMER')
      dispatch(getPlayerData())
    }, 5000)
  }

  useEffect(() => {
    if (nftMedia) {
      const objectUrl = URL.createObjectURL(nftMedia)
      setPictureFile(objectUrl)
      return () => URL.revokeObjectURL(objectUrl)
    }
  }, [nftMedia])

  useEffect(() => {
    window.scrollTo(0, 0)
    dispatch(getPlayerData())
    console.log('neeet---', { allPlayersData })
    setTimeout(() => {
      if (playerCoinData && playerCoinData.allPlayersData.length > 0) {
        if (
          playerCoinData.allPlayersData[0]?.playerpicture &&
          playerCoinData.allPlayersData[0]?.playerstatusid.id !== 3
        ) {
          console.log('birt1')
          // checkPlayerDetail()
        }
      } else if (playerInfo && playerInfo.playerpicture) {
        console.log('birt2')
        // checkPlayerDetail()
      }
    }, 4000)
    return () => {
      console.log('playercoinlaunch_removed')
      clearInterval(repeat)
    }
  }, [])

  const checkVerificationStatus = () => {
    dispatch(getPlayerData())
  }

  const onSubmitHandler = () => {
    clearInterval(repeat)
    onSubmit()
  }

  const onGoLive = () => {
    dispatch(setGoLive())
  }

  const isPlayerPicture = (url: string) => {
    const test =
      /\.(jpg|JPG|jpeg|JPEG|png|PNG|webp|WEBP|avif|AVIF|gif|GIF|svg|SVG)$/.test(
        url,
      )
    console.log({ url, test })
    return test
  }

  return (
    <div className="fullwidth dlg-content player-coin-launch">
      {
        <>
          <div className="player-dashboard-title">
            {isPlayerPicture(playerInfo?.playerpicture)
              ? t('your player coin')
              : t('add profile picture and launch player coin')}
          </div>
          {!cropStatus && (
            <div className="player-avatar">
              {!isPlayerPicture(playerInfo?.playerpicture) ? (
                <div
                  className={`${
                    fileLoadStatus ? `icon-camera-error` : `icon-camera `
                  }`}
                  onClick={handleFileInput}
                >
                  {!isPlayerPicture(playerInfo?.playerpicture) ? (
                    <CameraAltOutlinedIcon className="icon-camera-svg" />
                  ) : null}
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
              ) : null}

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
          <div className="coin-details">
            <div className="input-label">{t('status')}</div>
            <div className="input-label green-color mb-20">
              {/* {t(playerInfo?.playerstatusid?.playerstatusname || 'Pending')} */}
              {/* {playerInfo?.playerpicture
                ? t('deployed')
                : t(playerInfo?.playerstatusid?.playerstatusname)} */}
              {t(playerInfo?.playerstatusid?.playerstatusname)}
            </div>
            <div className="input-label">{t('player name')}</div>
            <div className="input-label white-color mb-20 uppercase">
              {/* {givenname + ' ' + surname || playerInfo.name} */}
              {playerInfo
                ? playerInfo.artistname + ' '
                : givenname + ' ' + surname}
            </div>
            <div className="input-label">{t('date of Birth')}</div>
            <div className="input-label white-color mb-20">
              {/* {dateofbirth.replaceAll('-', '.')} */}
              {playerInfo
                ? playerInfo.dateofbirth.replaceAll('-', '.')
                : dateofbirth.replaceAll('-', '.')}
            </div>
            <div className="input-label">{t('email address (not shared)')}</div>
            <div className="input-label white-color mb-20">
              {playerInfo ? playerInfo.email : email}
            </div>
            <div className="input-label">{t('nationality')}</div>
            <div className="input-label white-color mb-20">
              {playerInfo
                ? playerInfo?.nationality?.countryname
                : countriesData[nationality]?.countryname || '--'}
            </div>
            <div className="player-dashboard-notification">
              {t(
                'the player coin will be stored on the blockchain but trading is not yet possible and requires an additional action after this step.',
              )}
            </div>
          </div>
          {fileLoadStatus ? (
            <div className="player-dashboard-error red-color">
              {t('please add a profile picture to continue')}
            </div>
          ) : isUpdatePlayerProfileError ? (
            <div className="player-dashboard-error red-color">
              {isUpdatePlayerProfileError}
            </div>
          ) : null}
          {/* { ? ( */}
          <SubmitButton
            // isLoading={isLoading}
            // isDisabled={fileLoadStatus}
            title={t('launch player coin')}
            onPress={handleSubmit}
            className={classnames(
              'm-0auto',
              // isUpdatePlayerProfileSuccess ? 'hidden' : '',
            )}
          />
          {/* // ) : null} */}
          {playerInfo?.playerstatusid?.playerstatusname === 'Cancelled' ? (
            <div className="input-feedback text-center mb-20">
              {t('your coin was rejected')}
            </div>
          ) : null}
          {/* {(isUpdatePlayerProfileSuccess ||
            isPlayerPicture(playerInfo?.playerpicture)) &&
          playerInfo?.playerstatusid?.id !== 3 ? (
            <Spinner
              spinnerStatus={
                isUpdatePlayerProfileSuccess ||
                isPlayerPicture(playerInfo?.playerpicture)
              }
              title={t('pending deployment')}
            />
          ) : null} */}
          {/* <SubmitButton
            isDisabled={false}
            title={t('check status')}
            className={classnames(
              'form-submit-btn btn-disabled mt-20 m-0auto status-check-btn',
              (isUpdatePlayerProfileSuccess ||
                isPlayerPicture(playerInfo?.playerpicture)) &&
                !['Cancelled', 'Deployed'].includes(
                  playerInfo?.playerstatusid?.playerstatusname,
                )
                ? ''
                : 'hidden',
            )}
            onPress={() => checkVerificationStatus()}
          /> */}
          {/* <SubmitButton
            isDisabled={false}
            title={t('go live')}
            className={classnames(
              'form-submit-btn mt-20 m-0auto status-check-btn',
              // playerInfo?.playerstatusid?.playerstatusname !== 'Cancelled'
              // !['Cancelled', 'Pending', 'Verified'].includes(
              //   playerInfo?.playerstatusid?.playerstatusname,
              // )
              playerInfo?.playerpicture ? '' : 'hidden',
            )}
            onPress={onGoLive}
          /> */}
          <SubmitButton
            isDisabled={false}
            title={t('okay')}
            className={classnames(
              'form-submit-btn mt-20 m-0auto status-check-btn',
              playerInfo?.playerstatusid?.playerstatusname === 'Cancelled'
                ? ''
                : 'hidden',
            )}
            onPress={onSubmitHandler}
          />
        </>
      }
    </div>
  )
}

export default PlayerCoinLaunch
