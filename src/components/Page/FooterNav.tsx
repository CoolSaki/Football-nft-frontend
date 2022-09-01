import React, { useState, useEffect } from 'react'
import classnames from 'classnames'
import { useTranslation } from 'react-i18next'
interface Props {
  onClickPlayer: any
  onClickMyCoin: any
  onClickNFTs: any
  onClickSignin: any
  playerStyle: string
  nftsStyle: string
  signinStyle: string
  PlayersImg: any
  NFTsImg: any
  SigninIconImg: any
  SignText: string
  myCoinStyle: string
  MyCoinImg: string
  showMyCoin: boolean
}

const FooterNav: React.FC<Props> = ({
  onClickPlayer,
  onClickMyCoin,
  onClickNFTs,
  onClickSignin,
  playerStyle,
  nftsStyle,
  signinStyle,
  PlayersImg,
  NFTsImg,
  SigninIconImg,
  SignText,
  myCoinStyle,
  MyCoinImg,
  showMyCoin,
}) => {
  const { t } = useTranslation()
  const [isHovered, setIsHovered] = useState('')
  const handleMouseHover = (value: boolean) => (evt: any) => {
    if (value) {
      setIsHovered(evt.target.id)
    } else {
      setIsHovered('')
    }
  }

  useEffect(() => {
    console.log({ showMyCoin })
  }, [showMyCoin])

  return (
    <div className="footer-item-box">
      {showMyCoin ? (
        <div
          id="myCoin"
          onMouseEnter={handleMouseHover(true)}
          onMouseLeave={handleMouseHover(false)}
          className={classnames(
            !showMyCoin
              ? isHovered === 'myCoin'
                ? 'footer-nav-item-unsigned-active'
                : 'footer-nav-item-unsigned'
              : isHovered === 'myCoin'
              ? 'footer-nav-item-signed'
              : 'footer-nav-item',
            myCoinStyle,
          )}
          // className={classnames('footer-nav-item-signed', myCoinStyle)}
          onClick={onClickMyCoin}
        >
          <img loading="lazy" src={MyCoinImg} alt="" />
          {t('my coin')}
        </div>
      ) : null}

      <div
        id="players"
        onMouseEnter={handleMouseHover(true)}
        onMouseLeave={handleMouseHover(false)}
        className={classnames(
          !showMyCoin
            ? isHovered === 'players'
              ? 'footer-nav-item-unsigned-active'
              : 'footer-nav-item-unsigned'
            : isHovered === 'players'
            ? 'footer-nav-item-signed'
            : 'footer-nav-item',
          playerStyle,
        )}
        onClick={onClickPlayer}
      >
        <img loading="lazy" src={PlayersImg} alt="" />
        {t('players')}
      </div>
      <div
        id="nfts"
        onMouseEnter={handleMouseHover(true)}
        onMouseLeave={handleMouseHover(false)}
        className={classnames(
          !showMyCoin
            ? isHovered === 'nfts'
              ? 'footer-nav-item-unsigned-active'
              : 'footer-nav-item-unsigned'
            : isHovered === 'nfts'
            ? 'footer-nav-item-signed'
            : 'footer-nav-item',
          nftsStyle,
        )}
        onClick={onClickNFTs}
      >
        <img loading="lazy" src={NFTsImg} alt="" />
        NFTS
      </div>
      <div
        id="signin"
        onMouseEnter={handleMouseHover(true)}
        onMouseLeave={handleMouseHover(false)}
        className={classnames(
          !showMyCoin
            ? 'footer-nav-item-unsigned'
            : isHovered === 'signin'
            ? 'footer-nav-item-signed'
            : 'footer-nav-item',
          signinStyle,
        )}
        onClick={onClickSignin}
      >
        <img loading="lazy" src={SigninIconImg} alt="" />
        {t(SignText)}
      </div>
    </div>
  )
}

export default FooterNav
