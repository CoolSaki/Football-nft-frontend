/* eslint-disable no-unused-vars */
import React from 'react'
import Tooltip from '@mui/material/Tooltip'
import { makeStyles } from '@material-ui/core/styles'

interface Props {
  title: string
  children: any //React.ReactNode|undefined
}

const TooltipLabel: React.FC<Props> = ({ title, children }) => {
  const useStyles = makeStyles(theme => ({
    customTooltip: {
      // I used the rgba color for the standard "secondary" color
      backgroundColor: 'rgba(0, 0, 0, 0.8)',
    },
    customArrow: {
      color: 'rgba(0, 0, 0, 0.8)',
    },
  }))
  const classes = useStyles()
  return (
    <Tooltip
      title={title}
      placement="top"
      arrow
      classes={{
        tooltip: classes.customTooltip,
        arrow: classes.customArrow,
      }}
    >
      {children}
    </Tooltip>
  )
}

export default TooltipLabel
