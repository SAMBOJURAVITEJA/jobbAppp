import './index.css'

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

const FilterGroup = props => {
  const renderEmploymentsList = () => {
    const {changeEmployment, employment} = props
    return employmentTypesList.map(each => {
      const onClickChangeEmployee = event =>
        changeEmployment(event.target.value)

      const isActive = employment.includes(each.employmentTypeId)

      return (
        <li key={each.employmentTypeId}>
          {isActive ? (
            <input
              checked
              onClick={onClickChangeEmployee}
              value={each.employmentTypeId}
              type="checkbox"
            />
          ) : (
            <input
              onClick={onClickChangeEmployee}
              value={each.employmentTypeId}
              type="checkbox"
            />
          )}
          <label>{each.label}</label>
        </li>
      )
    })
  }

  const renderSalaryRange = () => {
    const {changeSalary, packaging} = props
    return salaryRangesList.map(each => {
      const onClickChangeSalaryRange = event => changeSalary(event.target.value)

      const isActive = packaging.includes(each.salaryRangeId)

      return (
        <li key={each.salaryRangeId}>
          {isActive ? (
            <input
              checked
              onClick={onClickChangeSalaryRange}
              type="radio"
              value={each.salaryRangeId}
              name="salary"
            />
          ) : (
            <input
              onClick={onClickChangeSalaryRange}
              type="radio"
              value={each.salaryRangeId}
              name="salary"
            />
          )}
          <label>{each.label}</label>
        </li>
      )
    })
  }

  return (
    <div className="filtersContainer">
      <h1 className="head">Type of Employment</h1>
      <ul className="ul">{renderEmploymentsList()}</ul>
      <hr className="horizontal-line" />
      <h1 className="head">Salary Range</h1>
      <ul className="ul">{renderSalaryRange()}</ul>
    </div>
  )
}

export default FilterGroup
