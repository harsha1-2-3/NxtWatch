import {Redirect} from 'react-router-dom'
import {Component} from 'react'
import Cookies from 'js-cookie'
import NxtWatchContext from '../../context/NxtWatchContext'
import {BgLogin} from './styledComponents'
import './index.css'

class Login extends Component {
  state = {
    username: '',
    password: '',
    showPassword: false,
    errorMsg: '',
    isError: false,
  }

  onChangeCheckbox = () => {
    this.setState(prevState => ({showPassword: !prevState.showPassword}))
  }

  onChangeUsername = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  onSuccessLogin = jwtToken => {
    Cookies.set('jwt_token', jwtToken, {expires: 30})
    const {history} = this.props
    history.replace('/')
  }

  onFailureLogin = data => {
    this.setState({isError: true, errorMsg: data.error_msg})
  }

  onSubmitForm = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userDetails = {
      username,
      password,
    }
    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok === true) {
      this.onSuccessLogin(data.jwt_token)
    } else {
      this.onFailureLogin(data)
    }
    console.log('Logged In')
  }

  render() {
    const {username, password, errorMsg, isError, showPassword} = this.state
    const passwordType = showPassword ? 'text' : 'password'
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }

    return (
      <>
        <NxtWatchContext.Consumer>
          {value => {
            const {isDark} = value
            const classLogin = isDark ? 'loginDark' : ''
            const classLabelPara = isDark ? 'labelParaDark' : ''
            const classInputBox = isDark ? 'inputBoxDark' : ''

            return (
              <>
                <div>
                  <BgLogin isDark={isDark}>
                    <form
                      onSubmit={this.onSubmitForm}
                      className={`login ${classLogin}`}
                    >
                      <img
                        className="loginLogo"
                        alt="website logo"
                        src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png"
                      />
                      <div className="inputCont">
                        <label
                          className={`labelPara ${classLabelPara}`}
                          htmlFor="username"
                        >
                          USERNAME
                        </label>
                        <input
                          value={username}
                          onChange={this.onChangeUsername}
                          id="username"
                          className={`inputBox ${classInputBox}`}
                          placeholder="Username"
                          type="text"
                        />
                      </div>
                      <div className="inputCont">
                        <label
                          className={`labelPara ${classLabelPara}`}
                          htmlFor="password"
                        >
                          PASSWORD
                        </label>
                        <input
                          value={password}
                          onChange={this.onChangePassword}
                          id="password"
                          className={`inputBox ${classInputBox}`}
                          placeholder="Password"
                          type={passwordType}
                        />
                      </div>
                      <div className="inputContCheck">
                        <input
                          onChange={this.onChangeCheckbox}
                          className="inputCheckbox"
                          id="checkbox"
                          type="checkbox"
                        />
                        <label
                          htmlFor="checkbox"
                          className={`labelParaCheck ${classLabelPara}`}
                        >
                          Show Password
                        </label>
                      </div>
                      <button className="loginBtn" type="submit">
                        Login
                      </button>
                      {isError && <p className="errorLogin">*{errorMsg}</p>}
                    </form>
                  </BgLogin>
                </div>
              </>
            )
          }}
        </NxtWatchContext.Consumer>
      </>
    )
  }
}
export default Login
