import { useTranslation } from 'react-i18next'

import Twitter from '@assets/icons/icon/twitter.svg'
import Instagram from '@assets/icons/icon/Instagram.svg'
import Youtube from '@assets/icons/icon/youtube.svg'
import Discord from '@assets/icons/icon/discord.svg'
import TikTok from '@assets/images/tik-tok.png'
import Telegram from '@assets/images/telegram.png'
import { SocialUrls } from '@root/constants'

const Socials = () => {
  const { t } = useTranslation()

  const handleOpenUrl = (social: string) => {
    if (social === 'twitter') {
      window.open(SocialUrls.twitter)
    } else if (social === 'discord') {
      window.open(SocialUrls.discord)
    } else if (social === 'instagram') {
      window.open(SocialUrls.instagram)
    } else if (social === 'youtube') {
      window.open(SocialUrls.youtube)
    } else if (social === 'tiktok') {
      window.open(SocialUrls.tiktok)
    } else if (social === 'telegram') {
      window.open(SocialUrls.telegram)
    }
  }

  return (
    <div className="social-icons-group">
      <span className="blog-title h-2">{t('join the community')}</span>
      <div className="social-group">
        <img
          loading="lazy"
          src={Twitter}
          alt=""
          className="social-icons"
          onClick={() => handleOpenUrl('twitter')}
        />
        {/* <img
          loading="lazy"
          src={Discord}
          alt=""
          className="social-icons"
          onClick={() => handleOpenUrl('discord')}
        /> */}
        <div
          className="tiktok-icon social-icons"
          onClick={() => handleOpenUrl('telegram')}
        >
          <img loading="lazy" src={Telegram} alt="" />
        </div>
        <img
          loading="lazy"
          src={Instagram}
          alt=""
          className="social-icons"
          onClick={() => handleOpenUrl('instagram')}
        />
        <img
          loading="lazy"
          src={Youtube}
          alt=""
          className="social-icons"
          onClick={() => handleOpenUrl('youtube')}
        />
        <div
          className="tiktok-icon social-icons"
          onClick={() => handleOpenUrl('tiktok')}
        >
          <img loading="lazy" src={TikTok} alt="" />
        </div>
      </div>
    </div>
  )
}

export default Socials
