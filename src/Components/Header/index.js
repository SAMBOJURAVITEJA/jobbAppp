import {Link, withRouter} from 'react-router-dom'

import Cookies from 'js-cookie'

import {IoBagSharp} from 'react-icons/io5'

import './index.css'

const Header = props => {
  const onClickLogOut = () => {
    Cookies.remove('jwt_token')
    const {history} = props
    console.log(history)
    history.replace('/login')
  }

  return (
    <nav>
      <div className="mobile-view-container">
        <Link to="/">
          <img
            className="headerImage"
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
          />
        </Link>

        <IoBagSharp size={30} />
        <button
          type="button"
          className="navLogOutButton"
          onClick={onClickLogOut}
        >
          <img
            className="headerImage"
            src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-log-out-img.png"
            alt="nav logout"
          />
        </button>
      </div>
      <div className="large-view-container">
        <Link to="/">
          <img
            className="headerImage"
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
          />
        </Link>

        <ul>
          <li>
            <Link className="link" to="/">
              Home
            </Link>
          </li>
          <li>
            <Link className="link" to="/jobs">
              Jobs
            </Link>
          </li>
        </ul>
        <div className="logoutButtonsContainer">
          <button
            type="button"
            className="logoutButton"
            onClick={onClickLogOut}
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  )
}

export default withRouter(Header)
