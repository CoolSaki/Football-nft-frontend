import React, { useState } from 'react'
import { PlayerCardData as PlayerItems } from '@root/constants'
import SearchBar from '@components/SearchBar'
import PlayerItem from './PlayerItem'
import DialogBox from '@components/DialogBox'
import StakedForm from './StakedForm'
import { isMobile } from '@utils/helpers'
import { useNavigate } from 'react-router-dom'

const PlayerCoins: React.FC = () => {
  const [showFormPopup, setShowFormPopup] = useState(false)
  const navigate = useNavigate()

  const handleClose = (event: any) => {
    event.stopPropagation()
    setShowFormPopup(false)
  }

  const handleStake = () => {
    if (isMobile()) {
      navigate('/staked')
    } else {
      setShowFormPopup(true)
    }
  }

  const handleSearch = (value: string | undefined) => {
    console.log('searchKeys---', value)
  }

  return (
    <>
      <SearchBar
        isSwitchEnabled={true}
        onEdit={handleSearch}
        onClose={() => console.log('')}
      />
      <DialogBox
        isOpen={showFormPopup}
        onClose={handleClose}
        contentClass=""
        closeBtnClass="close-purchase"
      >
        <StakedForm />
      </DialogBox>
      <div className="fixed-content dlg-content border-top">
        {PlayerItems.map((item, index) => (
          <PlayerItem
            item={item}
            key={index}
            index={index}
            handleStake={handleStake}
          />
        ))}
      </div>
    </>
  )
}

export default PlayerCoins
