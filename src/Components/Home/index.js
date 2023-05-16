import {Link} from 'react-router-dom'
import Header from '../Header'

import './index.css'

const Home = () => (
  <>
    <Header />
    <div className="homeContainer">
      <h1 className="heading">
        Find the Job That <br /> Fits Your Life
      </h1>
      <p className="paragraph">
        Millions of people are searching for jobs,
        <br /> salary information,company reviews
      </p>
      <Link to="/jobs" className="link">
        <button className="findJob" type="button">
          Find Jobs
        </button>
      </Link>
    </div>
  </>
)

export default Home
