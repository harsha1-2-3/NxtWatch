import {Component} from 'react'
import {Switch, Route, Redirect} from 'react-router-dom'
import NxtWatchContext from './context/NxtWatchContext'
import ProtectedRoute from './components/ProtectedRoute'
import Login from './components/Login'
import Home from './components/Home'
import Trending from './components/Trending'
import Gaming from './components/Gaming'
import VideoItemDetails from './components/VideoItemDetails'
import SavedVideos from './components/SavedVideos'
import NotFound from './components/NotFound'
import './App.css'

const tabsList = [
  {
    tabId: 'HOME',
    tabName: 'Home',
    tabIcon: (
      <img
        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR85Q9y5LeAts1-UmIXcHzErqQkkmrpG5ImlXz5ChoXMnfxrYa18hyPLuI&s=10"
        alt="home"
        className="icon"
      />
    ),
    tabLink: '/',
  },
  {
    tabId: 'TRENDING',
    tabName: 'Trending',
    tabIcon: (
      <img
        src="https://static-00.iconduck.com/assets.00/fire-icon-1713x2048-6840f49q.png"
        alt="fire"
        className="icon"
      />
    ),
    tabLink: '/trending',
  },
  {
    tabId: 'GAMING',
    tabName: 'Gaming',
    tabIcon: (
      <img
        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ3LeP5VZF6L3f0wn8QbOu_N34T_p1G09LxiLDOKE0u0_mMLwihAJs7QYG9&s=10"
        alt="gamepad"
        className="icon"
      />
    ),
    tabLink: '/gaming',
  },
  {
    tabId: 'SAVEDVIDEOS',
    tabName: 'Saved videos',
    tabIcon: (
      <img
        src="https://cdn0.iconfinder.com/data/icons/video-kit-1/32/download-512.png"
        alt="saved"
        className="icon"
      />
    ),
    tabLink: '/saved-videos',
  },
]

class App extends Component {
  state = {
    savedVideosList: [],
    isDark: false,
  }

  onClickSaveBtn = videoObj => {
    const {savedVideosList} = this.state
    console.log('saved')
    if (savedVideosList.find(each => each.id === videoObj.id)) {
      this.setState(prevState => ({savedVideosList: prevState.savedVideosList}))
    }
    this.setState(prevState => ({
      savedVideosList: [...prevState.savedVideosList, videoObj],
    }))
  }

  onClickThemeBtn = () => {
    this.setState(prevState => ({isDark: !prevState.isDark}))
  }

  render() {
    const {savedVideosList, isDark} = this.state
    return (
      <>
        <Switch>
          <NxtWatchContext.Provider
            value={{
              tabsList,
              savedVideosList,
              isDark,
              onClickThemeBtn: this.onClickThemeBtn,
              onClickSaveBtn: this.onClickSaveBtn,
            }}
          >
            <Route exact path="/login" component={Login} />
            <ProtectedRoute exact path="/" component={Home} />
            <ProtectedRoute exact path="/trending" component={Trending} />
            <ProtectedRoute exact path="/gaming" component={Gaming} />
            <ProtectedRoute
              exact
              path="/saved-videos"
              component={SavedVideos}
            />
            <ProtectedRoute
              exact
              path="/videos/:id"
              component={VideoItemDetails}
            />
            <Route exact path="/not-found" component={NotFound} />
          </NxtWatchContext.Provider>
        </Switch>
      </>
    )
  }
}

export default App
