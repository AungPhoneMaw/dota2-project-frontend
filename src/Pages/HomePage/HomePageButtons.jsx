import './HomePageButtons.css'
import { Link } from 'react-router'

function HomePageButton({ buttonName }) {
  return (
    <div className="button-container">
      <Link to={`/${buttonName.toLowerCase()}`}>
        <button className={`${buttonName}-button`}>
          {buttonName}
        </button>
      </Link>
    </div>
  );
}

export function HomePageButtons() {
  return (
    <>
      <HomePageButton buttonName="Heroes" />
      <HomePageButton buttonName="Draft" />
      <HomePageButton buttonName="Setting" />
    </>
  );
}