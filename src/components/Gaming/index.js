import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {Link} from 'react-router-dom'
import NxtWatchContext from '../../context/NxtWatchContext'
import {BgVideosBannerCont} from './styledComponents'
import './index.css'

const apiConstants = {
  intial: 'INITIAL',
  success: 'SUCCESS',
  loading: 'LOADING',
  failure: 'FAILURE',
}

class Gaming extends Component {
  state = {
    gamingList: [],
    apiStatus: apiConstants.intial,
  }

  componentDidMount() {
    this.getGamingVideos()
  }

  getGamingVideos = async () => {
    this.setState({apiStatus: apiConstants.loading})
    const jwtToken = Cookies.get('jwt_token')
    const url = 'https://apis.ccbp.in/videos/gaming'
    const options = {
      method: 'GET',
      Authorization: `Bearer ${jwtToken}`,
    }
    const response = await fetch(url, options)
    const data = await response.json()

    if (response.ok === true) {
      const updatedGameList = data.videos.map(eachVideo => ({
        id: eachVideo.id,
        title: eachVideo.title,
        thumbnailUrl: eachVideo.thumbnail_url,
        viewCount: eachVideo.view_count,
      }))

      this.setState({
        apiStatus: apiConstants.success,
        gamingList: updatedGameList,
      })
    } else {
      this.setState({apiStatus: apiConstants.failure})
    }
  }

  renderGameSuccess = () => {
    const {gamingList} = this.state

    return (
      <NxtWatchContext.Consumer>
        {value => {
          const {isDark} = value
          const gameHeadDark = isDark ? 'gameHeadDark' : ''
          const gameParaDark = isDark ? 'gameParaDark' : ''
          const trendBannerDark = isDark ? 'trendBannerDark' : ''
          const trendLogoContDark = isDark ? 'trendLogoContDark' : ''
          const trendHeadDark = isDark ? 'trendHeadDark' : ''

          return (
            <BgVideosBannerCont isDark={isDark} data-testid="gaming">
              <div className="homeVideosCont">
                <div
                  data-testid="banner"
                  className={`trendBanner ${trendBannerDark}`}
                >
                  <div className={`trendLogoCont ${trendLogoContDark}`}>
                    <img
                      src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ3LeP5VZF6L3f0wn8QbOu_N34T_p1G09LxiLDOKE0u0_mMLwihAJs7QYG9&s=10"
                      alt="gamepad"
                      className="icon"
                    />{' '}
                  </div>
                  <h1 className={`trendHead ${trendHeadDark}`}>Gaming</h1>
                </div>
                <ul className="gamesCont">
                  {gamingList.map(eachGame => (
                    <Link
                      to={`/videos/${eachGame.id}`}
                      key={eachGame.id}
                      className="link"
                    >
                      <li className="gameLi">
                        <img
                          className="gameImg"
                          src={eachGame.thumbnailUrl}
                          alt="video thumbnail"
                        />
                        <h1 className={`gameHead ${gameHeadDark}`}>
                          {eachGame.title}
                        </h1>
                        <p className={`gamePara ${gameParaDark}`}>
                          {eachGame.viewCount}K Watching Worldwide
                        </p>
                      </li>
                    </Link>
                  ))}
                </ul>
              </div>
            </BgVideosBannerCont>
          )
        }}
      </NxtWatchContext.Consumer>
    )
  }

  onClickRetryFailure = () => {
    this.getGamingVideos()
  }

  renderLoading = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#000000" height="50" width="50" />
    </div>
  )

  renderGameFail = () => (
    <NxtWatchContext.Consumer>
      {value => {
        const {isDark} = value
        const nvfHeadDark = isDark ? 'nvfHeadDark' : ''
        const nvfParaDark = isDark ? 'nvfParaDark' : ''

        return (
          <>
            <div className="bgnvf">
              <div className="nvf">
                <img
                  className="nvfImg"
                  src="https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-light-theme-img.png"
                  alt="failure view"
                />
                <h1 className={`nvfHead ${nvfHeadDark}`}>
                  Oops! Something Went Wrong
                </h1>
                <p className={`nvfPara ${nvfParaDark}`}>
                  We are having some trouble to complete your request. Please
                  try again.
                </p>
                <button
                  onClick={this.onClickRetryFailure}
                  type="button"
                  className="nvfRetryBtn"
                >
                  Retry
                </button>
              </div>
            </div>
          </>
        )
      }}
    </NxtWatchContext.Consumer>
  )

  renderAllGamePages = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiConstants.success:
        return this.renderGameSuccess()

      case apiConstants.loading:
        return this.renderLoading()

      case apiConstants.failure:
        return this.renderGameFail()

      default:
        return null
    }
  }

  render() {
    return <>{this.renderAllGamePages()}</>
  }
}

export default Gaming
