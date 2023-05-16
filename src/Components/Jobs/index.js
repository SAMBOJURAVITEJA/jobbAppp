import {Component} from 'react'

import {Link} from 'react-router-dom'

import Loader from 'react-loader-spinner'

import Cookies from 'js-cookie'

import {FcRating} from 'react-icons/fc'

import {IoLocationSharp} from 'react-icons/io5'

import {BsSearch, BsFillEnvelopeFill} from 'react-icons/bs'

import FilterGroup from '../FilterGroup'

import Header from '../Header'

import Profile from '../Profile'

import './index.css'

const apiStatus = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  progress: 'IN_PROGRESS',
}

class Jobs extends Component {
  state = {
    searchInput: '',
    productData: '',
    status: apiStatus.initial,
    packaging: '',
    employment: [],
    search: '',
  }

  componentDidMount() {
    this.getProducts()
  }

  changeEmployment = value => {
    this.setState(
      prevState => ({employment: [...prevState.employment, value]}),
      this.getProducts,
    )
  }

  changeSalary = value => {
    this.setState({packaging: value}, this.getProducts)
  }

  renderNotProductsView = () => {
    const {packaging, employment} = this.state
    return (
      <>
        <Header />
        <div className="jobsContainer">
          <div className="searchInputProfileContainer">
            <form className="searchContainer" onSubmit={this.submitting}>
              <input
                className="searchInput"
                onChange={this.searchInputting}
                type="search"
              />
              <button
                className="searchButton"
                type="submit"
                data-testid="searchButton"
              >
                <BsSearch className="search-icon" size={20} />
              </button>
            </form>
            <div className="profileContainer">
              <Profile />
            </div>
          </div>

          <div className="noJobsContainer">
            <FilterGroup
              packaging={packaging}
              employment={employment}
              changeEmployment={this.changeEmployment}
              changeSalary={this.changeSalary}
            />
            <div className="content">
              <img
                className="noJobsImage"
                src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
                alt="no jobs"
              />
              <h1>No Jobs Found</h1>
              <p>We could not find any jobs.Try other filters </p>
            </div>
          </div>
        </div>
      </>
    )
  }

  searchInputting = event => {
    this.setState({searchInput: event.target.value})
  }

  retrying = () => {
    this.getProducts()
  }

  submitting = event => {
    event.preventDefault()
    const {searchInput} = this.state
    console.log(searchInput)
    this.setState({search: searchInput}, this.getProducts)
  }

  renderProducts = () => {
    const {productData, employment, packaging} = this.state
    return (
      <>
        <Header />
        <div className="jobsContainer">
          <div className="searchInputProfileContainer">
            <form className="searchContainer" onSubmit={this.submitting}>
              <input
                className="searchInput"
                onChange={this.searchInputting}
                type="search"
              />
              <button
                className="searchButton"
                type="submit"
                data-testid="searchButton"
              >
                <BsSearch className="search-icon" size={20} />
              </button>
            </form>
            <div className="profileContainer">
              <Profile />
            </div>
          </div>
          <div className="filterJobsContainer">
            <FilterGroup
              packaging={packaging}
              employment={employment}
              changeEmployment={this.changeEmployment}
              changeSalary={this.changeSalary}
            />
            <ul className="jobsList-container">
              {productData.map(each => (
                <li className="jobsListLi" key={each.id}>
                  <Link to={`jobs/${each.id}`} className="Link">
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
                          <p className="employmentType">
                            {each.employmentType}
                          </p>
                        </div>
                        <div className="iconContainer">
                          <IoLocationSharp />
                          <p className="location">{each.location}</p>
                        </div>
                      </div>
                      <div className="packageContainer">
                        <p>{each.packagePerAnnum}</p>
                      </div>
                    </div>
                    <hr className="horizontal-line" />
                    <p>Description</p>
                    <p>{each.jobDescription}</p>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </>
    )
  }

  renderSuccessView = () => {
    const {productData} = this.state
    const result =
      productData.length > 0
        ? this.renderProducts()
        : this.renderNotProductsView()
    return result
  }

  renderFailureView = () => {
    const {packaging, employment} = this.state
    return (
      <>
        <Header />
        <div className="jobsContainer">
          <div className="searchInputProfileContainer">
            <form className="searchContainer" onSubmit={this.submitting}>
              <input
                className="searchInput"
                onChange={this.searchInputting}
                type="search"
              />
              <button
                className="searchButton"
                type="submit"
                data-testid="searchButton"
              >
                <BsSearch className="search-icon" size={20} />
              </button>
            </form>
            <div className="profileContainer">
              <Profile />
            </div>
          </div>
          <div className="failure">
            <FilterGroup
              packaging={packaging}
              employment={employment}
              changeEmployment={this.changeEmployment}
              changeSalary={this.changeSalary}
            />

            <div className="failureContainer">
              <img
                src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
                alt="failure view"
              />
              <h1>Oops!Something Went Wrong</h1>
              <p>we cannot seem to find the page you are looking for.</p>
              <button
                className="retryButton"
                onClick={this.retrying}
                type="button"
              >
                Retry
              </button>
            </div>
          </div>
        </div>
      </>
    )
  }

  renderProgressView = () => {
    const {packaging, employment} = this.state
    return (
      <>
        <Header />
        <div className="jobsContainer">
          <div className="searchInputProfileContainer">
            <form className="searchContainer" onSubmit={this.submitting}>
              <input
                className="searchInput"
                onChange={this.searchInputting}
                type="search"
              />
              <button
                className="searchButton"
                type="submit"
                data-testid="searchButton"
              >
                <BsSearch className="search-icon" size={20} />
              </button>
            </form>
            <div className="profileContainer">
              <Profile />
            </div>
          </div>

          <div className="progressContainer">
            <FilterGroup
              packaging={packaging}
              employment={employment}
              changeEmployment={this.changeEmployment}
              changeSalary={this.changeSalary}
            />
            <div className="loader-container" data-testid="loader">
              <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
            </div>
          </div>
        </div>
      </>
    )
  }

  getProducts = async () => {
    this.setState({status: apiStatus.progress})
    const {employment, search, packaging} = this.state
    const token = Cookies.get('jwt_token')
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }

    if (employment.length > 0) {
      const employmentData = employment.join()

      const apiUrl = `https://apis.ccbp.in/jobs?employment_type=${employmentData}&minimum_package=${packaging}&search=${search}`
      const response = await fetch(apiUrl, options)
      console.log(response)
      if (response.ok === true) {
        this.setState({status: apiStatus.success})
        const data = await response.json()
        const {jobs} = data
        if (jobs.length > 0) {
          const updatedData = jobs.map(each => ({
            companyLogoUrl: each.company_logo_url,
            employmentType: each.employment_type,
            id: each.id,
            jobDescription: each.job_description,
            location: each.location,
            packagePerAnnum: each.package_per_annum,
            rating: each.rating,
            title: each.title,
          }))
          this.setState({productData: updatedData})
        } else {
          this.setState({productData: data})
        }
      } else {
        this.setState({productData: apiStatus.failure})
      }
    } else {
      const employmentData = ''
      const apiUrl = `https://apis.ccbp.in/jobs?employment_type=${employmentData}&minimum_package=${packaging}&search=${search}`
      const response = await fetch(apiUrl, options)

      if (response.ok === true) {
        this.setState({status: apiStatus.success})
        const data = await response.json()
        const {jobs} = data
        if (jobs.length > 0) {
          const updatedData = jobs.map(each => ({
            companyLogoUrl: each.company_logo_url,
            employmentType: each.employment_type,
            id: each.id,
            jobDescription: each.job_description,
            location: each.location,
            packagePerAnnum: each.package_per_annum,
            rating: each.rating,
            title: each.title,
          }))
          this.setState({productData: updatedData})
        } else {
          this.setState({status: apiStatus.failure})
        }
      }
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

export default Jobs
