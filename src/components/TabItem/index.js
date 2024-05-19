import {Link} from 'react-router-dom'
import NxtWatchContext from '../../context/NxtWatchContext'
import './index.css'

const TabItem = props => {
  const {onClickTab, activeTabClass, eachTab} = props
  const activeTabClassN = activeTabClass ? 'lgSideIconActive' : ''
  const activeTabBtnClass = activeTabClass ? 'lgSideLiActive' : ''
  const {tabId, tabName, tabIcon, tabLink} = eachTab

  const clickedTab = () => {
    onClickTab(tabId)
  }

  return (
    <NxtWatchContext.Consumer>
      {value => {
        const {isDark} = value
        const lgLiSideTabDark = isDark ? 'lgLiSideTabDark' : ''
        const lgSideTabParaDark = isDark ? 'lgSideTabParaDark' : ''
        return (
          <li className={`lgLiSideTab ${lgLiSideTabDark} ${activeTabClassN}`}>
            <Link to={tabLink} className="link">
              <button
                onClick={clickedTab}
                type="button"
                className={`lgLiTabBtn ${activeTabBtnClass}`}
              >
                {tabIcon}
                <p
                  className={`lgSideTabPara ${lgSideTabParaDark} ${activeTabClassN} `}
                >
                  {tabName}
                </p>
              </button>
            </Link>
          </li>
        )
      }}
    </NxtWatchContext.Consumer>
  )
}
export default TabItem
