import Loader from 'react-loader-spinner'
import {Component} from 'react'
import './index.css'
import LanguageFilterItem from '../LanguageFilterItem'
import RepositoryItem from '../RepositoryItem'

const languageFiltersData = [
  {id: 'ALL', language: 'All'},
  {id: 'JAVASCRIPT', language: 'Javascript'},
  {id: 'RUBY', language: 'Ruby'},
  {id: 'JAVA', language: 'Java'},
  {id: 'CSS', language: 'CSS'},
]
const apiUrl = 'https://apis.ccbp.in/popular-repos?language='

class GithubPopularRepos extends Component {
  state = {
    isLoading: true,
    languageId: 'ALL',
    gitList: [],
  }

  componentDidMount() {
    this.renderData(languageFiltersData[0].id)
  }

  setRepo = (updatedData, loadingStatus) => {
    this.setState({
      gitList: updatedData,
      isLoading: loadingStatus,
    })
  }

  renderData = async languageId => {
    const response = await fetch(`${apiUrl}${languageId}`)
    const data = await response.json()
    const updatedData = data.popular_repos.map(eachRepository => ({
      id: eachRepository.id,
      imageUrl: eachRepository.avatar_url,
      name: eachRepository.name,
      starsCount: eachRepository.stars_count,
      forksCount: eachRepository.forks_count,
      issuesCount: eachRepository.issues_count,
    }))
    this.setRepo(updatedData, false)
  }

  selectLanguageAndGetGit = filteredId => {
    this.setState({languageId: filteredId})
    this.renderData(filteredId)
  }

  renderListLanguages = () => {
    const {languageId} = this.state
    return (
      <ul className="un-list">
        {languageFiltersData.map(eachLanguage => (
          <LanguageFilterItem
            key={eachLanguage.id}
            languageValid={eachLanguage.id === languageId}
            languageFilter={eachLanguage}
            selectLanguageAndGetGit={this.selectLanguageAndGetGit}
          />
        ))}
      </ul>
    )
  }

  getListOfRepo = () => {
    const {gitList} = this.state
    return (
      <ul className="list">
        {gitList.map(eachGit => (
          <RepositoryItem key={eachGit.id} gitDetails={eachGit} />
        ))}
      </ul>
    )
  }

  renderLoader = () => (
    <div className="loader">
      <Loader type="ThreeDots" height={80} width={80} color="blue" />
    </div>
  )

  render() {
    const {isLoading} = this.state

    return (
      <div className="main-cont">
        <h1>popular</h1>
        {this.renderListLanguages()}
        {isLoading ? this.renderLoader() : this.getListOfRepo()}
      </div>
    )
  }
}

export default GithubPopularRepos
