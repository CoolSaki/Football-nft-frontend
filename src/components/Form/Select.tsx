import React, { useEffect } from 'react'
import MenuItem from '@material-ui/core/MenuItem'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'
import '@assets/css/components/Select.css'
interface option {
  id: number | string
  name: string
}
interface Props {
  placeholder?: string
  data?: option[]
  disabled?: boolean
  fieldName?: string
  onChange?: any
  handleBlur?: any
  title: string
  defaultValue?: string
}

const SelectBox: React.FC<Props> = ({
  placeholder,
  data = [],
  disabled = false,
  fieldName = undefined,
  onChange = null,
  handleBlur = null,
  title,
  defaultValue = '',
}) => {
  const [value, setValue] = React.useState('')

  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    onChange(event)
    setValue(event.target.value as string)
  }

  useEffect(() => {
    if (defaultValue) {
      setValue(defaultValue)
    }
    console.log({ defaultValue })
  }, [defaultValue])

  return (
    <FormControl>
      {!value && <p className="select-placeholder">{title}</p>}
      <Select
        name={fieldName}
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={value}
        onChange={handleChange}
        onBlur={handleBlur}
        disabled={disabled}
      >
        {data.map((item: any) => (
          <MenuItem key={item.iso2 || item.id} value={item.iso2 || item.id}>
            {item.countryname || item.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  )
}

export default SelectBox
