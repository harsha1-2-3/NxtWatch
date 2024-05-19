import NxtWatchContext from '../../context/NxtWatchContext'
import './index.css'

const NotFound = () => (
  <NxtWatchContext.Consumer>
    {value => {
      const {isDark} = value
      const bgnfDark = isDark ? 'bgnfDark' : ''
      const nfHeadDark = isDark ? 'nfHeadDark' : ''
      const nfParaDark = isDark ? 'nfParaDark' : ''

      return (
        <div className={`bgnf ${bgnfDark}`}>
          <div className="nf">
            <img
              className="nfImg"
              src="https://assets.ccbp.in/frontend/react-js/nxt-watch-not-found-light-theme-img.png"
              alt="not found"
            />
            <h1 className={`nfHead ${nfHeadDark}`}>Page Not Found</h1>
            <p className={`nfPara ${nfParaDark}`}>
              We are sorry, the page you requested could not be found.
            </p>
          </div>
        </div>
      )
    }}
  </NxtWatchContext.Consumer>
)
export default NotFound
