import React from 'react'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import MetamaskIcon from '@assets/icons/icon/metamask.svg'
import '@assets/css/components/MetamaskButton.css'

interface Props {
  onPress: () => void
}

const MetamaskButton: React.FC<Props> = props => {
  const { onPress } = props

  return (
    <div className="metamask-btn" onClick={onPress}>
      <img loading="lazy" src={MetamaskIcon} alt="metamask-icon" />
      <span>METAMASK</span>
      <ArrowForwardIcon fontSize="small" />
    </div>
  )
}

export default MetamaskButton
