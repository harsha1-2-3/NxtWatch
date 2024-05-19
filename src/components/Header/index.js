import {Component} from 'react'
import Cookies from 'js-cookie'
import {withRouter, Link} from 'react-router-dom'
import Popup from 'react-popup'
import TabItem from '../TabItem'
import NxtWatchContext from '../../context/NxtWatchContext'
import {BgHeader} from './styledComponents'
import './index.css'

class Header extends Component {
  state = {
    isDark: false,
    activeTabId: 'HOME',
  }

  clickedLogout = () => {
    Cookies.remove('jwt_token')
    const {history} = this.props
    history.replace('/login')
  }

  onClickTab = tabId => {
    this.setState({activeTabId: tabId})
  }

  render() {
    const {activeTabId} = this.state

    return (
      <NxtWatchContext.Consumer>
        {value => {
          const {isDark, onClickThemeBtn, tabsList} = value
          const smLiDropDark = isDark ? 'smLiDropDark' : ''
          const activeSmTabDark = isDark ? 'activeSmTabDark' : ''
          const smIconDark = isDark ? 'smIconDark' : ''
          const lgLogoutBtnDark = isDark ? 'lgLogoutBtnDark' : ''
          const bgPopupDark = isDark ? 'bgPopupDark' : ''
          const headerLogoImg = isDark
            ? 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-dark-theme-img.png'
            : 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png'

          const clickedThemeBtn = () => {
            onClickThemeBtn()
          }
          return (
            <BgHeader isDark={isDark}>
              <div className="headerSm">
                <button type="button" className="headerLogoBtn">
                  <Link className="link" to="/">
                    <img
                      className="headerLogo"
                      alt="nxt watch logo"
                      src={`${headerLogoImg}`}
                    />
                  </Link>
                </button>
                <ul className="smTabsUl">
                  <li className="smTabLi">
                    <button
                      onClick={clickedThemeBtn}
                      type="button"
                      data-testid="theme"
                      className={`headThemeBtn ${smLiDropDark} smIcon`}
                    >
                      {isDark ? (
                        <img
                          className="icon"
                          src="https://w7.pngwing.com/pngs/487/562/png-transparent-sun-logo-sunlight-silhouette-thumbnail.png"
                          alt="theme"
                        />
                      ) : (
                        <img
                          className="icon"
                          src="https://t4.ftcdn.net/jpg/05/40/49/35/360_F_540493592_NXamBERmgRt7ugpQbkmKMITMTZHeIdfz.jpg"
                          alt="theme"
                        />
                      )}
                    </button>
                  </li>
                  <li className="smTabLi">
                    <Popup
                      modal
                      trigger={
                        <button
                          type="button"
                          className={`headThemeBtn ${smLiDropDark} smIcon`}
                        >
                          <img
                            src="https://static.thenounproject.com/png/4530406-200.png"
                            alt="bars"
                            className="icon"
                          />
                        </button>
                      }
                    >
                      {close => (
                        <>
                          <ul className="bgSmUlDrop ">
                            {tabsList.map(eachTab => (
                              <TabItem
                                eachTab={eachTab}
                                key={eachTab.id}
                                onClickTab={this.onClickTab}
                                activeTabClassN={activeTabId === eachTab.tabId}
                              />
                            ))}
                            <li className={`smLiDrop ${smLiDropDark} `}>
                              Profile{' '}
                            </li>
                            <li className={`smLiDrop ${smLiDropDark}`}>
                              <button
                                onClick={() => close()}
                                type="button"
                                className="menuClsBtn"
                              >
                                {' '}
                                Close{' '}
                              </button>
                            </li>
                          </ul>
                        </>
                      )}
                    </Popup>
                  </li>
                  <li className="smTabLi">
                    <Popup
                      modal
                      trigger={
                        <button
                          type="button"
                          className={`smLogoutBtn ${smLiDropDark}`}
                        >
                          <img
                            className="icon"
                            src="https://cdn1.iconfinder.com/data/icons/heroicons-ui/24/logout-512.png"
                            alt="logout"
                          />
                        </button>
                      }
                    >
                      {close => (
                        <div className={`bgPopup ${bgPopupDark}`}>
                          <p className={`logoutPara ${smLiDropDark}`}>
                            Are you sure you want to logout?
                          </p>
                          <div className="logoutBtns">
                            <button
                              onClick={() => close()}
                              type="button"
                              className={`cancelBtn ${lgLogoutBtnDark}`}
                            >
                              Cancel
                            </button>
                            <button
                              onClick={this.clickedLogout}
                              type="button"
                              className="confirmBtn"
                            >
                              Confirm
                            </button>
                          </div>
                        </div>
                      )}
                    </Popup>
                  </li>
                </ul>
              </div>
              <div className="headerLg">
                <button type="button" className="headerLogoBtn">
                  <Link className="link" to="/">
                    <img
                      className="headerLogo"
                      alt="nxt watch logo"
                      src={`${headerLogoImg}`}
                    />
                  </Link>
                </button>
                <ul className="lgTabsUl">
                  <li className="lgTabLi">
                    <button
                      onClick={clickedThemeBtn}
                      type="button"
                      data-testid="theme"
                      className={`headThemeBtn ${smLiDropDark} smIcon`}
                    >
                      {isDark ? (
                        <img
                          className="icon"
                          src="https://w7.pngwing.com/pngs/487/562/png-transparent-sun-logo-sunlight-silhouette-thumbnail.png"
                          alt="theme"
                        />
                      ) : (
                        <img
                          className="icon"
                          src="https://t4.ftcdn.net/jpg/05/40/49/35/360_F_540493592_NXamBERmgRt7ugpQbkmKMITMTZHeIdfz.jpg"
                          alt="theme"
                        />
                      )}{' '}
                    </button>
                  </li>
                  <li className="lgTabLi">
                    <img
                      className="smIconProfile"
                      alt="profile"
                      src="https://assets.ccbp.in/frontend/react-js/nxt-watch-profile-img.png"
                    />
                  </li>
                  <li className="lgTabLi">
                    <Popup
                      modal
                      trigger={
                        <button
                          type="button"
                          className={`lgLogoutBtn ${lgLogoutBtnDark}`}
                        >
                          Logout
                        </button>
                      }
                    >
                      {close => (
                        <div className="bgPopup">
                          <p className="logoutPara">
                            Are you sure you want to logout?
                          </p>
                          <div className="logoutBtns">
                            <button
                              onClick={() => close()}
                              type="button"
                              className="cancelBtn"
                            >
                              Cancel
                            </button>
                            <button
                              onClick={this.clickedLogout}
                              type="button"
                              className="confirmBtn"
                            >
                              Confirm
                            </button>
                          </div>
                        </div>
                      )}
                    </Popup>
                  </li>
                </ul>
              </div>
            </BgHeader>
          )
        }}
      </NxtWatchContext.Consumer>
    )
  }
}
export default withRouter(Header)
