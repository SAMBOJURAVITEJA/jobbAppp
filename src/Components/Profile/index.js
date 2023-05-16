import {Component} from 'react'

import Loader from 'react-loader-spinner'

import Cookies from 'js-cookie'

import './index.css'

const apiStatus = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  progress: 'IN_PROGRESS',
}

class Profile extends Component {
  state = {profileData: '', status: apiStatus.initial}

  componentDidMount() {
    this.getProduct()
  }

  renderProgressView = () => (
    <div className="profileContainer">
      <div className="loader-container" data-testid="loader">
        <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
      </div>
    </div>
  )

  retryButton = () => {
    this.getProduct()
  }

  renderFailureView = () => (
    <div className="profileContainer">
      <button className="retryButton" onClick={this.retryButton} type="button">
        Retry
      </button>
    </div>
  )

  renderSuccessView = () => {
    const {profileData} = this.state
    return (
      <div className="profileContainer">
        <div className="profileImage">
          <img src={profileData.profileImageUrl} alt="" />
        </div>
        <h1 className="profileHead">{profileData.name}</h1>
        <p className="profilePara">{profileData.shortBio}</p>
      </div>
    )
  }

  getProduct = async () => {
    const token = Cookies.get('jwt_token')
    this.setState({status: apiStatus.progress})
    const options = {
      method: 'GET',
      headers: {
        authorization: `Bearer ${token}`,
      },
    }
    const response = await fetch('https://apis.ccbp.in/profile', options)
    if (response.ok === true) {
      const data = await response.json()
      const updatedData = {
        profileDetails: data.profile_details,
      }
      const {profileDetails} = updatedData
      const purifiedData = {
        name: profileDetails.name,
        profileImageUrl: profileDetails.profile_image_url,
        shortBio: profileDetails.short_bio,
      }
      this.setState({profileData: purifiedData, status: apiStatus.success})
    } else {
      this.setState({status: apiStatus.failure})
    }
  }

  render() {
    const {status} = this.state

    switch (status) {
      case 'FAILURE':
        return this.renderFailureView()
      case 'SUCCESS':
        return this.renderSuccessView()
      case 'IN_PROGRESS':
        return this.renderProgressView()
      default:
        return null
    }
  }
}

export default Profile
