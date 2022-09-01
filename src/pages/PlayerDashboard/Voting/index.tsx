import SubmitButton from '@components/SubmitButton'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import CreatePoll from './CreatePoll'
import PollList from './PollList'

const Voting = () => {
  const { t } = useTranslation()
  const [status, setStatus] = useState('list')
  const handleNewCreate = () => {
    setStatus('create')
  }
  return (
    <div className="fixed-content-without-margin dlg-content no-scroll">
      <div className="fixed-content">
        <div className="alert-wrapper">
          <div className="heading-title unverified-alert popup-alert">
            {t('your status must be pro')}
          </div>
        </div>
      </div>
      {/* <div className="nft-tab-title">{t('create a new voting poll')}</div>
      {status !== 'create' ? (
        <SubmitButton
          title={t('new voting poll')}
          className="nft-create-btn"
          onPress={handleNewCreate}
        />
      ) : (
        <></>
      )}
      {status === 'list' ? (
        <PollList />
      ) : status === 'create' ? (
        <CreatePoll />
      ) : (
        <></>
      )} */}
    </div>
  )
}

export default Voting
