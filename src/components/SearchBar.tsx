import { useState } from 'react'
import SearchIcon from '@mui/icons-material/Search'
import classNames from 'classnames'
import FilterListIcon from '@mui/icons-material/FilterList'
import SearchInput from '@components/Form/SearchInput'
import { Switch } from '@components/Form'
import '@assets/css/components/SearchBar.css'
import { useTranslation } from 'react-i18next'
import { isMobile } from '@utils/helpers'

type EditFunction = (v: string | undefined) => void
type CloseFunction = (v: boolean | undefined) => void
interface Props {
  isSwitchEnabled?: boolean | null
  isFilterDisabled?: boolean | null
  onEdit: EditFunction
  containerClass?: string
  onClose: CloseFunction
}
const SearchBar: React.FC<Props> = ({
  isSwitchEnabled,
  onEdit,
  isFilterDisabled,
  containerClass = '',
  onClose,
}) => {
  const { t } = useTranslation()
  const [isSearchEnabled, setSearchEnabled] = useState(false)

  const handleClose = () => {
    setSearchEnabled(false)
    console.log('llppuuu')
    onClose(true)
  }

  const handleSearch = () => {
    setSearchEnabled(true)
  }

  return (
    <div
      className={classNames(
        'search-bar',
        containerClass,
        // !isSearchEnabled && isMobile() ? 'p-0' : '',
      )}
    >
      {isSwitchEnabled && !isSearchEnabled ? (
        <Switch label={t('staked tokens')} />
      ) : (
        <div></div>
      )}
      <div
        className={classNames(
          'search-filter-section',
          !isSearchEnabled ? 'justify-end' : '',
        )}
      >
        {isSearchEnabled ? (
          <SearchInput
            type="text"
            placeholder={t('please enter the search words.')}
            className="in-menu-search"
            onChange={onEdit}
            onClose={handleClose}
          />
        ) : (
          <SearchIcon className="icon-color" onClick={handleSearch} />
        )}
        {!isFilterDisabled && <FilterListIcon />}
      </div>
    </div>
  )
}

export default SearchBar
