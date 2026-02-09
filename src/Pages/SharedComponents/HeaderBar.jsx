import './HeaderBar.css'
import {Link} from 'react-router'

export function HeaderBar({title}) {
  return (
    <div className="header-bar-container">
      <h1 className="page-title">{title}</h1>
      <div className="icon-container">
        <Link to="/"><img src="/shared/icon.png" />
        </Link>
      </div>
    </div>
  );
}