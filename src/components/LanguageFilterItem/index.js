// Write your code here
const LanguageFilterItem = props => {
  const {languageValid, languageFilter, selectLanguageAndGetGit} = props

  const btnClick = languageValid ? 'btn-click' : 'btn-btn'

  const onClickIt = () => {
    selectLanguageAndGetGit(languageFilter.id)
  }

  return (
    <li className="list">
      <button className={btnClick} onClick={onClickIt} type="button">
        {languageFilter}
      </button>
    </li>
  )
}

export default LanguageFilterItem
