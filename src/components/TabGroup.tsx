import { useEffect, useState } from 'react'
import classnames from 'classnames'
import { useTranslation } from 'react-i18next'
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'

interface Props {
  defaultTab?: string
  tabSet: string[]
  tabClassName?: string
  getSwitchedTab: (tab: string) => void
  inactiveIndices?: number[]
}

const TabGroup: React.FC<Props> = ({
  tabSet,
  defaultTab,
  tabClassName = '',
  getSwitchedTab,
  inactiveIndices = [],
}) => {
  const [selectedTab, setSelectedTab] = useState(defaultTab)
  const [index, setIndex] = useState(0)
  const { t } = useTranslation()
  const handleTabSelect = (title: string) => {
    setSelectedTab(title)
    getSwitchedTab(title)
  }

  useEffect(() => {
    setSelectedTab(defaultTab?.toLowerCase())
  }, [defaultTab])

  return (
    <div className="tabs-container">
      <ArrowBackIosNewIcon
        sx={!index ? { visibility: 'hidden' } : { visibility: 'show' }}
        style={{ fontSize: 15 }}
        onClick={() => {
          setIndex(state => state - 1)
        }}
      />
      {tabSet.slice(index, index + 4).map((title, i) => (
        <div className={classnames('tab-item', tabClassName)} key={i}>
          <div
            className={
              selectedTab === title.toLowerCase()
                ? 'tab-item tab-active'
                : inactiveIndices.length > 0 && inactiveIndices.includes(i)
                ? 'tab-item disabled'
                : 'tab-item'
            }
            onClick={() => handleTabSelect(title)}
          >
            <button
              className={
                selectedTab === title.toLowerCase()
                  ? 'tab-item tab-active'
                  : inactiveIndices.length > 0 && inactiveIndices.includes(i)
                  ? 'tab-item disabled'
                  : 'tab-item'
              }
            >
              {t(title)}
            </button>
          </div>
        </div>
      ))}
      <ArrowForwardIosIcon
        sx={
          index < tabSet.length - 4
            ? { visibility: 'show' }
            : { visibility: 'hidden' }
        }
        style={{ fontSize: 15 }}
        onClick={() => {
          setIndex(state => state + 1)
        }}
      />
    </div>
  )
}

export default TabGroup
