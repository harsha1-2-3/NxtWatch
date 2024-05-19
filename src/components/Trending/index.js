import {Component} from 'react'
import Cookies from 'js-cookie'
import {Link} from 'react-router-dom'
import Loader from 'react-loader-spinner'
import NxtWatchContext from '../../context/NxtWatchContext'
import {BgVideosBannerCont} from './styledComponents'
import './index.css'

const apiConstants = {
  intial: 'INITIAL',
  success: 'SUCCESS',
  loading: 'LOADING',
  failure: 'FAILURE',
}

class Trending extends Component {
  state = {
    trendingList: [],
    apiStatus: apiConstants.intial,
  }

  componentDidMount() {
    this.getTrendingVideos()
  }

  getTrendingVideos = async () => {
    this.setState({apiStatus: apiConstants.loading})
    const jwtToken = Cookies.get('jwt_token')
    const url = 'https://apis.ccbp.in/videos/trending'
    const options = {
      method: 'GET',
      Authorization: `Bearer ${jwtToken}`,
    }
    const response = await fetch(url, options)
    const data = await response.json()

    if (response.ok === true) {
      const updatedTrendList = data.videos.map(eachVideo => ({
        id: eachVideo.id,
        title: eachVideo.title,
        thumbnailUrl: eachVideo.thumbnail_url,
        channel: {
          name: eachVideo.channel.name,
          profileImageUrl: eachVideo.channel.profile_image_url,
        },
        viewCount: eachVideo.view_count,
        publishedAt: eachVideo.published_at,
      }))

      this.setState({
        apiStatus: apiConstants.success,
        trendingList: updatedTrendList,
      })
    } else {
      this.setState({apiStatus: apiConstants.failure})
    }
  }

  renderTrendSuccess = () => {
    const {trendingList} = this.state
    const {channel} = trendingList
    const {profileImageUrl, name} = channel

    return (
      <NxtWatchContext.Consumer>
        {value => {
          const {isDark} = value
          const trendBannerDark = isDark ? 'trendBannerDark' : ''
          const trendLogoContDark = isDark ? 'trendLogoContDark' : ''
          const trendHeadDark = isDark ? 'trendHeadDark' : ''
          const titleHeadDark = isDark ? 'titleHeadDark' : ''
          const viewsDateLiDark = isDark ? 'viewsDateLiDark' : ''

          return (
            <BgVideosBannerCont data-testid="trending" isDark={isDark}>
              <div className="homeVideosCont">
                <div
                  data-testid="banner"
                  className={`trendBanner ${trendBannerDark}`}
                >
                  <div className={`trendLogoCont ${trendLogoContDark}`}>
                    <img
                      src="https://static-00.iconduck.com/assets.00/fire-icon-1713x2048-6840f49q.png"
                      alt="fire"
                      className="icon"
                    />{' '}
                  </div>
                  <h1 className={`trendHead ${trendHeadDark}`}>Trending</h1>
                </div>
                <ul className="videosCont">
                  {trendingList.map(eachTrend => (
                    <Link
                      to={`/videos/${eachTrend.id} `}
                      key={eachTrend.id}
                      className="link"
                    >
                      <li className="videoLi">
                        <img
                          className="videoImg"
                          alt="video thumbnail"
                          src={eachTrend.thumbnailUrl}
                        />
                        <div className="videoDetailsCont">
                          <img
                            className="channelLogo"
                            src={profileImageUrl}
                            alt="channel logo"
                          />
                          <div className="titleViewsDateCont">
                            <h1 className={`titleHead ${titleHeadDark}`}>
                              {eachTrend.title}
                            </h1>
                            <ul className="viewsDateUl">
                              <li className={`viewsDateLi ${viewsDateLiDark}`}>
                                {name}
                              </li>
                              <li className={`viewsDateLi ${viewsDateLiDark}`}>
                                {eachTrend.viewCount}K views
                              </li>
                              <li className={`viewsDateLi ${viewsDateLiDark}`}>
                                {}, 2 years ago
                              </li>
                            </ul>
                          </div>
                        </div>
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

  renderLoading = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#000000" height="50" width="50" />
    </div>
  )

  onClickRetryFailure = () => {
    this.getTrendingVideos()
  }

  renderTrendFail = () => (
    <NxtWatchContext.Consumer>
      {value => {
        const {isDark} = value
        const nvfHeadDark = isDark ? 'nvfHeadDark' : ''
        const nvfParaDark = isDark ? 'nvfParaDark' : ''

        return (
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
                We are having some trouble to complete your request. Please try
                again.
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
        )
      }}
    </NxtWatchContext.Consumer>
  )

  renderAllTrendPages = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiConstants.success:
        return this.renderTrendSuccess()

      case apiConstants.loading:
        return this.renderLoading()

      case apiConstants.failure:
        return this.renderTrendFail()

      default:
        return null
    }
  }

  render() {
    return <>{this.renderAllTrendPages()}</>
  }
}
export default Trending
