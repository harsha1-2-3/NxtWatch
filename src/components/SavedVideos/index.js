import {Link} from 'react-router-dom'
import NxtWatchContext from '../../context/NxtWatchContext'
import {BgVideosBannerCont} from './styledComponents'
import './index.css'

const SavedVideos = () => {
  const renderNoSavedVideos = () => (
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
                src="https://assets.ccbp.in/frontend/react-js/nxt-watch-no-saved-videos-img.png"
                alt="no saved videos"
              />
              <h1 className={`nvfHead ${nvfHeadDark}`}>
                No saved videos found
              </h1>
              <p className={`nvfPara ${nvfParaDark}`}>
                You can save your videos while watching them
              </p>
            </div>
          </div>
        )
      }}
    </NxtWatchContext.Consumer>
  )

  return (
    <NxtWatchContext.Consumer>
      {value => {
        const {savedVideosList, isDark} = value
        const trendBannerDark = isDark ? 'trendBannerDark' : ''
        const trendLogoContDark = isDark ? 'trendLogoContDark' : ''
        const trendHeadDark = isDark ? 'trendHeadDark' : ''
        const videoTitleDark = isDark ? 'videoTitleDark' : ''
        const channelNameDark = isDark ? 'channelNameDark' : ''
        const datesViewLiDark = isDark ? 'datesViewLiDark' : ''

        return (
          <>
            {savedVideosList.length === 0 ? (
              renderNoSavedVideos()
            ) : (
              <BgVideosBannerCont data-testid="savedVideos" isDark={isDark}>
                <div className="homeVideosCont">
                  <div
                    data-testid="banner"
                    className={`trendBanner ${trendBannerDark}`}
                  >
                    <div className={`trendLogoCont ${trendLogoContDark}`}>
                      <img
                        src="https://cdn0.iconfinder.com/data/icons/video-kit-1/32/download-512.png"
                        alt="saved"
                        className="icon"
                      />{' '}
                    </div>
                    <h1 className={`trendHead ${trendHeadDark}`}>
                      Saved videos
                    </h1>
                  </div>
                  <ul className="savedVideosUl">
                    {savedVideosList.map(eachSave => (
                      <Link
                        to={`/videos/${eachSave.id}`}
                        key={eachSave.id}
                        className="link"
                      >
                        <li className="savedVideoLi">
                          <img
                            className="savedImg"
                            src={eachSave.thumbnailUrl}
                            alt="video thumbnail"
                          />
                          <div className="detailsCont">
                            <h1 className={`videoTitle ${videoTitleDark}`}>
                              {eachSave.title}
                            </h1>
                            <p className={`channelName ${channelNameDark}`}>
                              {eachSave.channel.name}
                            </p>
                            <ul className="datesViewsUl">
                              <li className={`datesViewLi ${datesViewLiDark}`}>
                                {eachSave.viewCount}K views
                              </li>
                              <li className={`datesViewLi ${datesViewLiDark}`}>
                                {}, 2 years ago
                              </li>
                            </ul>
                          </div>
                        </li>
                      </Link>
                    ))}
                  </ul>
                </div>
              </BgVideosBannerCont>
            )}
          </>
        )
      }}
    </NxtWatchContext.Consumer>
  )
}
export default SavedVideos
