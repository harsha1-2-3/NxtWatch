import {Component} from 'react'
import {Link} from 'react-router-dom'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {formatDistanceToNow} from 'date-fns'
import TabItem from '../TabItem'
import NxtWatchContext from '../../context/NxtWatchContext'
import Header from '../Header'
import {BgHome, BgVideosBannerCont} from './styledComponents'
import './index.css'

const apiConstants = {
  intial: 'INITIAL',
  success: 'SUCCESS',
  loading: 'LOADING',
  failure: 'FAILURE',
}

class Home extends Component {
  state = {
    searchInput: '',
    homeVideosList: [],
    showBanner: true,
    apiStatus: apiConstants.intial,
    activeTab: 'HOME',
  }

  componentDidMount() {
    this.getHomeVideos()
  }

  getHomeVideos = async () => {
    const {searchInput} = this.state
    this.setState({apiStatus: apiConstants.loading})
    const url = `https://apis.ccbp.in/videos/all?search=${searchInput}`
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      method: 'GET',
      Authorization: `Bearer ${jwtToken}`,
    }
    const response = await fetch(url, options)
    const data = await response.json()
    console.log(response)
    if (response.ok === true) {
      const updatedVideosData = data.videos.map(eachVideo => ({
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
        homeVideosList: updatedVideosData,
      })
    } else {
      this.setState({apiStatus: apiConstants.failure})
    }
  }

  onChangeSearchInput = event => {
    this.setState({searchInput: event.target.value})
  }

  onClickSearchBtn = () => {
    const {searchInput, homeVideosList} = this.state
    const searchResults = homeVideosList.filter(
      eachSearch => eachSearch.title.toLowercase() === searchInput,
    )
    this.setState({homeVideosList: searchResults})
  }

  onClickRetryFailure = () => {
    this.getHomeVideos()
  }

  renderBannerHome = () => {
    this.setState({showBanner: false})
  }

  renderSuccesVideos = () => {
    const {homeVideosList, searchInput, showBanner} = this.state
    const {channel} = homeVideosList
    const {profileImageUrl, name} = channel

    return (
      <>
        {homeVideosList.length === 0 ? (
          this.renderNovideos()
        ) : (
          <NxtWatchContext.Consumer>
            {value => {
              const {isDark} = value
              const searchContDark = isDark ? 'searchContDark' : ''
              const searchInputDark = isDark ? 'searchInputDark' : ''
              const searchIconDark = isDark ? 'searchIconDark' : ''
              const titleHeadDark = isDark ? 'titleHeadDark' : ''
              const viewsDateLiDark = isDark ? 'viewsDateLiDark' : ''

              return (
                <BgVideosBannerCont data-testid="home" isDark={isDark}>
                  {showBanner && (
                    <div className="bgBanner">
                      <div data-testid="banner" className="logoCloseBtnCont">
                        <img
                          className="bannerLogo"
                          src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png"
                          alt="website logo"
                        />
                        <button
                          onClick={this.renderBannerHome}
                          data-testid="close"
                          type="button"
                          className="closeBannerBtn"
                        >
                          <img
                            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSRYmkjdjtDr94BqOMiPYq4lhEdm9pj3yhTrEGBjHOAPT7AD5DKpQ3F8nS3&s=10"
                            alt="xmark"
                            className="icon"
                          />
                        </button>
                      </div>
                      <p className="bannerPara">
                        Buy Nxt Watch Premium prepaid plans with UPI
                      </p>
                      <button type="button" className="bannerGetBtn">
                        GET IT NOW
                      </button>
                    </div>
                  )}
                  <div className="homeVideosCont">
                    <div className={`searchCont ${searchContDark}`}>
                      <input
                        value={searchInput}
                        onChange={this.onChangeSearchInput}
                        className={`searchInput ${searchInputDark}`}
                        placeholder="Search..."
                        type="search"
                      />
                      <button
                        onClick={this.onClickSearchBtn}
                        type="button"
                        className="searchBtn"
                      >
                        <img
                          className={`searchIcon ${searchIconDark}`}
                          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTTFmAkj0WNGARfTCfS1cTRDjQQeYwqIjkdBMlN27p88egxxF_M1lAxCWA&s=10"
                          alt="search"
                          className="icon"
                        />
                      </button>
                    </div>

                    <ul className="videosCont">
                      {homeVideosList.map(videoDetails => (
                        <Link
                          to={`/videos/${videoDetails.id} `}
                          className="link"
                          key={videoDetails.id}
                        >
                          <li key={videoDetails.id} className="videoLi">
                            <img
                              data-testid="video thumbnail"
                              className="videoImg"
                              alt="title"
                              src={videoDetails.thumbnailUrl}
                            />
                            <div className="videoDetailsCont">
                              <img
                                className="channelLogo"
                                data-testid="channel logo"
                                src={profileImageUrl}
                                alt="channel logo"
                              />
                              <div className="titleViewsDateCont">
                                <h1 className={`titleHead ${titleHeadDark}`}>
                                  {videoDetails.title}
                                </h1>
                                <ul className="viewsDateUl">
                                  <li
                                    className={`viewsDateLi ${viewsDateLiDark}`}
                                  >
                                    {name}
                                  </li>
                                  <li
                                    className={`viewsDateLi ${viewsDateLiDark}`}
                                  >
                                    {videoDetails.viewCount}K views
                                  </li>
                                  <li
                                    className={`viewsDateLi ${viewsDateLiDark}`}
                                  >
                                    {videoDetails.publishedAt}, 2 years ago
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
        )}
      </>
    )
  }

  renderFailureVideos = () => (
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
              <h1 className={` nvfHead ${nvfHeadDark}`}>
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

  renderNovideos = () => (
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
                src="https://assets.ccbp.in/frontend/react-js/nxt-watch-no-search-results-img.png"
                alt="no videos"
              />
              <h1 className={` nvfHead ${nvfHeadDark}`}>
                No Search results found
              </h1>
              <p className={`nvfPara ${nvfParaDark}`}>
                Try different key words or remove search filter
              </p>
              <button
                onClick={this.onClickSearchBtn}
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

  renderLoading = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#000000" height="100" width="100" />
    </div>
  )

  renderAllHomePages = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiConstants.success:
        return this.renderSuccesVideos()
      case apiConstants.loading:
        return this.renderLoading()
      case apiConstants.failure:
        return this.renderFailureVideos()
      default:
        return null
    }
  }

  onClickTab = tabId => {
    this.setState({activeTab: tabId})
  }

  render() {
    const {activeTab} = this.state
    return (
      <NxtWatchContext.Consumer>
        {value => {
          const {isDark, tabsList} = value
          const bgLgSidebarDark = isDark ? 'bgLgSidebarDark' : ''
          const contactHeadDark = isDark ? 'contactHeadDark' : ''
          const contactParaDark = isDark ? 'contactParaDark' : ''

          return (
            <BgHome data-testid="home" isDark={isDark}>
              <Header />
              <div data-testid="home" className="home">
                <div className={`bgLgSidebar ${bgLgSidebarDark}`}>
                  <ul className="lgUlSideTabs">
                    {tabsList.map(eachTab => (
                      <TabItem
                        eachTab={eachTab}
                        onClickTab={this.onClickTab}
                        key={eachTab.id}
                        activeTabClassN={activeTab === eachTab.id}
                      />
                    ))}
                  </ul>
                  <div className="bgContact">
                    <h1 className={`contactHead ${contactHeadDark}`}>
                      CONTACT US
                    </h1>
                    <div className="contactLogosCont">
                      <img
                        className="contactLogo"
                        src="https://assets.ccbp.in/frontend/react-js/nxt-watch-facebook-logo-img.png"
                        alt="facebook logo"
                      />
                      <img
                        className="contactLogo"
                        src="https://assets.ccbp.in/frontend/react-js/nxt-watch-twitter-logo-img.png"
                        alt="twitter logo"
                      />
                      <img
                        className="contactLogo"
                        src="https://assets.ccbp.in/frontend/react-js/nxt-watch-linked-in-logo-img.png"
                        alt="linked in logo"
                      />
                    </div>
                    <p className={`contactPara ${contactParaDark}`}>
                      Enjoy! Now to see your channels and recommendations!
                    </p>
                  </div>
                </div>
                {this.renderAllHomePages()}
              </div>
            </BgHome>
          )
        }}
      </NxtWatchContext.Consumer>
    )
  }
}
export default Home
