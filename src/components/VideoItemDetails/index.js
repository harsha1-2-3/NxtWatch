import {Component} from 'react'
import Cookies from 'js-cookie'
import ReactPlayer from 'react-player'
import Loader from 'react-loader-spinner'
import NxtWatchContext from '../../context/NxtWatchContext'
import {BgVideoItem} from './styledComponents'
import './index.css'

const apiConstants = {
  intial: 'INITIAL',
  success: 'SUCCESS',
  loading: 'LOADING',
  failure: 'FAILURE',
}

class VideoItemDetails extends Component {
  state = {
    apiStatus: apiConstants.intial,
    videoObj: {},
    clickedLike: false,
    clikedDislike: false,
    clikedSave: false,
  }

  componentDidMount() {
    this.getVideoDetails()
  }

  getVideoDetails = async () => {
    this.setState({apiStatus: apiConstants.loading})
    const jwtToken = Cookies.get('jwt_token')
    const {match} = this.props
    const {params} = match
    const {id} = params
    const url = `https://apis.ccbp.in/videos/${id} `
    const options = {
      method: 'GET',
      Authorization: `Bearer ${jwtToken}`,
    }
    const response = await fetch(url, options)
    const data = await response.json()

    if (response.ok === true) {
      const videoDetails = data.video_details
      const updatedVideoDetails = {
        id: videoDetails.id,
        title: videoDetails.title,
        videoUrl: videoDetails.video_url,
        thumbnailUrl: videoDetails.thumbnail_url,
        channel: {
          name: videoDetails.channel.name,
          profileImageUrl: videoDetails.channel.profile_image_url,
          subscriberCount: videoDetails.channel.subscriber_count,
        },
        viewCount: videoDetails.view_count,
        publishedAt: videoDetails.published_at,
        description: videoDetails.description,
      }

      this.setState({
        apiStatus: apiConstants.success,
        videoObj: updatedVideoDetails,
      })
    } else {
      this.setState({apiStatus: apiConstants.failure})
    }
  }

  onClickRetryFailure = () => {
    this.getVideoDetails()
  }

  onClickLikeBtn = () => {
    this.setState({clickedLike: true, clikedDislike: false})
  }

  onClickDisLikeBtn = () => {
    this.setState({clickedLike: false, clikedDislike: true})
  }

  renderVideoSuccess = () => {
    const {videoObj, clikedDislike, clickedLike, clikedSave} = this.state
    const {title, videoUrl, channel, viewCount, publishedAt, description} =
      videoObj
    const {name, profileImageUrl, subscriberCount} = channel

    return (
      <>
        <NxtWatchContext.Consumer>
          {value => {
            const {onClickSaveBtn, isDark} = value
            const playerHeadDark = isDark ? 'playerHeadDark' : ''
            const dateLiDark = isDark ? 'dateLiDark' : ''
            const likeBtnDark = isDark ? 'likeBtnDark' : ''
            const hrLineDark = isDark ? 'hrLineDark' : ''
            const channelTitleDark = isDark ? 'channelTitleDark' : ''
            const channelSubDark = isDark ? 'channelSubDark' : ''
            const descriptionDark = isDark ? 'descriptionDark' : ''

            const clickedSaveBtn = () => {
              this.setState(prevState => ({
                clickedSave: !prevState.clickedSave,
              }))
              onClickSaveBtn(videoObj)
            }
            const classLikeBtn = clickedLike ? 'activeLike' : ''
            const classDislikeBtn = clikedDislike ? 'activeLike' : ''
            const classSaveBtn = clikedSave ? 'activeLike' : ''
            const saveText = clikedSave ? 'Saved' : 'Save'

            return (
              <BgVideoItem isDark={isDark} data-testid="videoItemDetails">
                <div className="videoItem">
                  <div className="playerCont">
                    <ReactPlayer className="playerImg" url={videoUrl} />
                  </div>
                  <h1 className={`playerHead ${playerHeadDark}`}>{title}</h1>
                  <div className="datesLikesCont">
                    <ul className="datesUl">
                      <li className={`dateLi ${dateLiDark}`}>
                        {viewCount}K views
                      </li>
                      <li className={`dateLi ${dateLiDark}`}>
                        {}, 2 years ago
                      </li>
                    </ul>
                    <ul className="likesUl">
                      <li className="likeLi">
                        <button
                          onClick={this.onClickLikeBtn}
                          type="button"
                          className={`likeBtn ${likeBtnDark} ${classLikeBtn}`}
                        >
                          <img
                            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSY6P6IkYtyf-BKnpm4n9o39I3WltMqbIokMEuE1ioHkMR6uVcENpOij7w&s=10"
                            className="icon"
                            alt="like"
                          />
                          <p className="likePara">Like</p>
                        </button>
                      </li>
                      <li className="likeLi">
                        <button
                          onClick={this.onClickDisLikeBtn}
                          type="button"
                          className={`likeBtn ${likeBtnDark} ${classDislikeBtn}`}
                        >
                          <img
                            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTJ-oXLn9tvfapcsW2ncuczUhYqCvsBg5Yixg&usqp=CAU"
                            alt="dislike"
                            className="icon"
                          />
                          <p className="likePara">Dislike</p>
                        </button>
                      </li>
                      <li className="likeLi">
                        <button
                          onClick={this.clickedSaveBtn}
                          type="button"
                          className={`likeBtn ${likeBtnDark} ${classSaveBtn}`}
                        >
                          <img
                            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR85Q9y5LeAts1-UmIXcHzErqQkkmrpG5ImlXz5ChoXMnfxrYa18hyPLuI&s=10"
                            alt="saved"
                            className="icon"
                          />{' '}
                          <p className="likePara">{saveText}</p>
                        </button>
                      </li>
                    </ul>
                  </div>
                  <hr className={`hrLine ${hrLineDark}`} />
                  <div className="channelCont">
                    <img
                      className="channelImg"
                      src={profileImageUrl}
                      alt="channel logo"
                    />
                    <div className="titleSubCont">
                      <p className={`channelTitle ${channelTitleDark}`}>
                        {name}
                      </p>
                      <p className={`channelSub ${channelSubDark}`}>
                        {subscriberCount}K subscribers
                      </p>
                      <p className={`description ${descriptionDark}`}>
                        {description}
                      </p>
                    </div>
                  </div>
                </div>
              </BgVideoItem>
            )
          }}
        </NxtWatchContext.Consumer>
      </>
    )
  }

  renderLoading = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderVideoFailure = () => (
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

  renderAllVideoPages = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiConstants.success:
        return this.renderVideoSuccess()

      case apiConstants.loading:
        return this.renderLoading()

      case apiConstants.failure:
        return this.renderVideoFailure()

      default:
        return null
    }
  }

  render() {
    return <>{this.renderAllVideoPages()}</>
  }
}

export default VideoItemDetails
