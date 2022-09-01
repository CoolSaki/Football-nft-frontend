import * as React from 'react'
import Switch from 'react-ios-switch'

export default function ToggleSwitch(props: any) {
  const { onToggle } = props
  const [isChecked, setChecked] = React.useState(false)

  const onChange = (checked: boolean) => {
    setChecked(checked)
    onToggle(checked)
  }
  return (
    <Switch
      checked={isChecked}
      offColor="#56596A"
      onColor="#6BC909"
      onChange={onChange}
    />
  )
}
