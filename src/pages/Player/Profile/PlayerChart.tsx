import ArrowLeft from '@components/Svg/ArrowLeft'
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import Chart from './Chart'

interface Props {
  onCardView: any
  profileData: any
}

const PlayerChart: React.FC<Props> = ({ onCardView, profileData }) => {
  const [chartOption, setChartOption] = useState('Price')
  const [chartPeriod, setChartPeriod] = useState('1D')
  const { t } = useTranslation()

  const xAxisData: any = []
  let series = [24]

  const getCount = () => {
    if (chartPeriod === '1D') return 12
    else if (chartPeriod === '7D') return 3 * 7
    else if (chartPeriod === '1M') return 3 * 30
    else if (chartPeriod === '3M') return 3 * 30 * 3
    else if (chartPeriod === '1Y') return 1 * 365
    else if (chartPeriod === 'YTD') return 3 * 120
    else if (chartPeriod === 'ALL') return 1 * 365 * 2
    else return 12
  }
  const oneDay = 2 * 3600 * 1000
  let base = +new Date(2021, 5, 11)

  const generateData = () => {
    for (let i = 1; i < getCount(); i++) {
      const now = new Date((base += oneDay))
      xAxisData.push(
        [now.getFullYear(), now.getMonth() + 1, now.getDate()].join('/'),
      )
      let value = Math.abs(
        Math.round((Math.random() - 0.5) * 2 + series[i - 1]),
      )
      if (value > 50) {
        value = value - 2
      }
      series.push(value)
    }
  }

  useEffect(() => {
    xAxisData.length = 0
    series.length = 0
    series = [300]
    generateData()
  }, [chartPeriod])

  generateData()

  return (
    <>
      <div className="player-chart">
        <div className="flex-middle">
          <div className="fixed-content">
            <div className="chart-header">
              <div className="card-view-button" onClick={() => onCardView()}>
                <ArrowLeft />
              </div>
              <div className="player-name">
                {profileData?.name ?? 'Not found'}
              </div>
            </div>
          </div>
          <div className="chart">
            <Chart xAxisData={xAxisData} series={series} />
          </div>
          <div className="fixed-content chart-period">
            <div
              className={chartPeriod === '1D' ? 'button-hover' : ''}
              onClick={() => setChartPeriod('1D')}
            >
              1D
            </div>
            <div
              className={chartPeriod === '7D' ? 'button-hover' : ''}
              onClick={() => setChartPeriod('7D')}
            >
              7D
            </div>
            <div
              className={chartPeriod === '1M' ? 'button-hover' : ''}
              onClick={() => setChartPeriod('1M')}
            >
              1M
            </div>
            <div
              className={chartPeriod === '3M' ? 'button-hover' : ''}
              onClick={() => setChartPeriod('3M')}
            >
              3M
            </div>
            <div
              className={chartPeriod === '1Y' ? 'button-hover' : ''}
              onClick={() => setChartPeriod('1Y')}
            >
              1Y
            </div>
            <div
              className={chartPeriod === 'YTD' ? 'button-hover' : ''}
              onClick={() => setChartPeriod('YTD')}
            >
              YTD
            </div>
            <div
              className={chartPeriod === 'ALL' ? 'button-hover' : ''}
              onClick={() => setChartPeriod('ALL')}
            >
              ALL
            </div>
          </div>
          <div className="fixed-content chart-option">
            <div
              className={chartOption === 'Price' ? 'button-hover' : ''}
              onClick={() => setChartOption('Price')}
            >
              {t('price')}
            </div>
            <div
              className={chartOption === 'Market' ? 'button-hover' : ''}
              onClick={() => setChartOption('Market')}
            >
              {t('market cap')}
            </div>
            <div
              className={chartOption === 'Trading' ? 'button-hover' : ''}
              onClick={() => setChartOption('Trading')}
            >
              {t('trading view')}
            </div>
            <div
              className={chartOption === 'History' ? 'button-hover' : ''}
              onClick={() => setChartOption('History')}
            >
              {t('history')}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default PlayerChart
