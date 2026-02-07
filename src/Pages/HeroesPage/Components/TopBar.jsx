import '../ComponentsStyle/TopBar.css'
import {Link} from 'react-router'

export function TopBar() {
  return (
    <div className="top-bar-container">
      <h1 className="page-title">Heroes</h1>
      <div className="icon-container">
        <Link to="/"><img src="/public/shared/icon.png" />
        </Link>
      </div>
    </div>
  );
}