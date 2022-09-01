import React from 'react'
import { useTranslation } from 'react-i18next'

const Heading: React.FC = () => {
  const { t } = useTranslation()
  return (
    <div className="heading-container">
      <div>
        <div className="heading-header">mecarriera:</div>
        <div className="heading-title">{t('players_fans_talents')}</div>
      </div>
      <div className="heading-desc">
        <div>{t('global_trendsetter')}</div>
        <br />
        <div>{t('enabling_footballers_from_pros')}</div>
        <br />
        <div>{t('family_friends_acquaintances')}</div>
        <br />
        <div className="heading-header">{t('the player dao')}</div>
        <div className="mt-10">
          {t('the_player_coins_are_a_blockchain_based_assembly')}
        </div>
        <br />
        <div className="heading-header">{t('the new social media')}</div>
        <div className="mt-10">
          {t('instead_of_making_profit_for_the_big_tech_companies')}
        </div>
      </div>
    </div>
  )
}

export default Heading
