import {Component} from 'react'
import Loader from 'react-loader-spinner'
import {FcRating} from 'react-icons/fc'

import {IoLocationSharp} from 'react-icons/io5'
import {BsFillEnvelopeFill, BsBoxArrowUpRight} from 'react-icons/bs'

import Cookies from 'js-cookie'
import Header from '../Header'
import './index.css'

const apiStatus = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  progress: 'IN_PROGRESS',
}

class JobItemDetails extends Component {
  state = {data: '', status: apiStatus.initial}

  componentDidMount() {
    this.getProducts()
  }

  getProducts = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params
    const token = Cookies.get('jwt_token')
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }

    const apiUrl = `https://apis.ccbp.in/jobs/${id}`
    const response = await fetch(apiUrl, options)

    if (response.ok === true) {
      const apiData = await response.json()
      const object1 = {
        jobDetails: apiData.job_details,
        similarJobs: apiData.similar_jobs,
      }
      const {jobDetails, similarJobs} = object1
      const object2 = {
        companyLogoUrl: jobDetails.company_logo_url,
        companyWebsiteUrl: jobDetails.company_website_url,
        employmentType: jobDetails.employment_type,
        id: jobDetails.id,
        jobDescription: jobDetails.job_description,
        skills: jobDetails.skills,
        title: jobDetails.title,
        lifeAtCompany: jobDetails.life_at_company,
        location: jobDetails.location,
        packagePerAnnum: jobDetails.package_per_annum,
        rating: jobDetails.rating,
      }
      const object3 = similarJobs.map(each => ({
        companyLogoUrl: each.company_logo_url,
        employmentType: each.employment_type,
        id: each.id,
        jobDescription: each.job_description,
        location: each.location,
        rating: each.rating,
        title: each.title,
      }))
      const updatedData = {jobDetails: object2, similarJobs: object3}
      this.setState({data: updatedData, status: apiStatus.success})
    } else {
      this.setState({status: apiStatus.failure})
    }
  }

  renderSuccessView = () => {
    const {data} = this.state
    console.log(data)
    const {jobDetails, similarJobs} = data
    return (
      <>
        <Header />
        <div className="bg-container">
          <div className="cardContainer">
            <div className="logoContentContainer">
              <img src={jobDetails.companyLogoUrl} className="img" alt="" />
              <div className="contentContainer1">
                <h1 className="contentHeading">{jobDetails.title}</h1>
                <div className="ratingContainer">
                  <FcRating size={30} />
                  <p className="contentParagraph">{jobDetails.rating}</p>
                </div>
              </div>
            </div>
            <div className="totalPackageIconContainer">
              <div className="totalIcons">
                <div className="iconContainer">
                  <BsFillEnvelopeFill />
                  <p className="employmentType">{jobDetails.employmentType}</p>
                </div>
                <div className="iconContainer">
                  <IoLocationSharp />
                  <p className="location">{jobDetails.location}</p>
                </div>
              </div>
              <div className="packageContainer">
                <p>{jobDetails.packagePerAnnum}</p>
              </div>
            </div>
            <hr className="horizontal-line" />
            <div className="descriptionContainer">
              <p>Description</p>
              <a className="anchor" href={jobDetails.companyWebsiteUrl}>
                visit <BsBoxArrowUpRight color="blue" size="18" />
              </a>
            </div>
            <p>{jobDetails.jobDescription}</p>

            <ul className="skillsListContainer">
              {jobDetails.skills.map(each => (
                <li className="skillListItem">
                  <div className="imgContentContainer">
                    <img src={each.image_url} alt="" />
                    <p>{each.name}</p>
                  </div>
                </li>
              ))}
            </ul>
            <h1>Life at Company</h1>
            <div className="contentAboutLife">
              <p className="companyDescription">
                {jobDetails.lifeAtCompany.description}
              </p>
              <img
                className="companyWorkingImage"
                src={jobDetails.lifeAtCompany.image_url}
                alt=""
              />
            </div>
          </div>
          <h1 className="similarHeading">Similar Jobs</h1>
          <ul className="similarJobsContainer">
            {similarJobs.map(each => (
              <li className="similarJobsListItem">
                <div className="logoContentContainer">
                  <img src={each.companyLogoUrl} className="img" alt="" />
                  <div className="contentContainer1">
                    <h1 className="contentHeading">{each.title}</h1>
                    <div className="ratingContainer">
                      <FcRating size={30} />
                      <p className="contentParagraph">{each.rating}</p>
                    </div>
                  </div>
                </div>
                <div className="totalPackageIconContainer">
                  <div className="totalIcons">
                    <div className="iconContainer">
                      <BsFillEnvelopeFill />
                      <p className="employmentType">{each.employmentType}</p>
                    </div>
                    <div className="iconContainer">
                      <IoLocationSharp />
                      <p className="location">{each.location}</p>
                    </div>
                  </div>
                </div>
                <p>descriptions</p>
                <p>{each.jobDescription}</p>
              </li>
            ))}
          </ul>
        </div>
      </>
    )
  }

  renderProgressView = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  failure = () => this.getProducts()

  renderFailureView = () => (
    <div className="failureContainer">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
      />
      <h1>Oops!Something Went Wrong</h1>
      <p>we cannot seem to find the page you are looking for.</p>
      <button className="retryButton" onClick={this.failure} type="button">
        Retry
      </button>
    </div>
  )

  render() {
    const {status} = this.state
    console.log(status)
    switch (status) {
      case 'SUCCESS':
        return this.renderSuccessView()
      case 'FAILURE':
        return this.renderFailureView()
      case 'IN_PROGRESS':
        return this.renderProgressView()
      default:
        return null
    }
  }
}

export default JobItemDetails
