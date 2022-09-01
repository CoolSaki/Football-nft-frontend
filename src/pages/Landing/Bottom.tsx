/* eslint-disable @typescript-eslint/no-non-null-assertion */
import React, { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Formik } from 'formik'
import * as Yup from 'yup'
import { Input } from '@components/Form'
import ContactUs from '@components/Page/Navigation/ContactUs'
import SocialGroup from '@components/Page/Navigation/SocialGroup'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@root/store/rootReducers'
import { contactUs, contactUsReset } from '@root/apis/careers/careersSlice'
import CheckCircleOutlinedIcon from '@mui/icons-material/CheckCircleOutlined'
import { isMobile } from 'web3modal'
import classNames from 'classnames'

const Bottom: React.FC = () => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const careerData = useSelector((state: RootState) => state.careers)
  const blogVisible = useSelector(
    (state: RootState) => state.authentication.blogVisible,
  )
  const { isLoading, isContactUsError, isContactUsSuccess } = careerData
  const dib_id = 'a6b5476b-a8e1-46f3-bee8-2447a0140751'
  const dib_recent_posts = 4
  const [isLoaded, setLoaded] = useState(false)

  const getTranslation = (text: string) => {
    const translation = t(text)
    if (translation === text) {
      // return '!__no_translation__!'
      return text
    } else {
      return translation
    }
  }

  useEffect(() => {
    if (!isLoaded) {
      new Promise<void>(resolve => {
        const script: any = document.createElement('script')
        script.type = 'text/javascript'
        if (script.readyState) {
          // only required for IE <9
          script.onreadystatechange = function () {
            if (
              script.readyState === 'loaded' ||
              script.readyState === 'complete'
            ) {
              script.onreadystatechange = null
              resolve()
            }
          }
        } else {
          //Others
          script.onload = function () {
            resolve()
          }
        }
        script.src = 'https://io.dropinblog.com/js/embed.js'
        document.getElementsByTagName('head')[0].appendChild(script)
      }).then(() => {
        setTimeout(function () {
          if (
            document.querySelector('title')!.innerText !==
            'Home of the Football Metaverse'
          ) {
            document.querySelector('title')!.innerText =
              'Home of the Football Metaverse'
          }
        }, 1000)
        setLoaded(true)
      })
    }
  }, [])

  return (
    <div className="bottom">
      <div>
        {blogVisible ? (
          <div>
            <span className="blog-title bottom-title">
              {t('latest blog posts')}
            </span>
            <span className="blog-content bottom-content">
              <div id="dib-recent-posts"></div>
            </span>
            <span className="button-line">
              <a className="button-box" href="/blog">
                {t('see more Blogs')}
              </a>
            </span>
            <div className="bottom-line"></div>
          </div>
        ) : (
          ''
        )}
        <SocialGroup />
        <div className="bottom-line"></div>
        <span className="blog-title company-title h-2">meCarreira.com</span>
        {/* <span className="blog-content company-content pg-lg">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nisi
          condimentum platea enim sit id.
        </span> */}

        <span className="blog-content company-content pg-lg">
          {t('buy_title') +
            ' ' +
            t('player coins') +
            ' ' +
            t('favorite player')}
        </span>
        <ContactUs />
        <div className="bottom-line"></div>
        <div className="blog-content copyright pg-lg">
          © 2022 meCarreira.com
        </div>
      </div>
    </div>
  )
}

export default Bottom
