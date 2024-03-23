import { faRss } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import "./styles.scss";
export interface AppBarProps {
  className?: string;
  onIconClick?: () => void;
}

export function AppBar({ className, onIconClick }: AppBarProps) {
  const cnParts = ["app-bar"];

  if (className) {
    cnParts.push(className);
  }
  function handleIconClick() {
    if (onIconClick) {
      onIconClick();
    }
  }
  const cn = cnParts.join(" ");
  return (
    <div className={cn}>
      <nav className="app-bar-content">
        <div className="app-bar-header-icon">
          <Link to="/" className="icon-link">
            <h1 className="app-bar-title">Wal UI</h1>
            <FontAwesomeIcon icon={faRss} />
          </Link>
        </div>
        <div className="right-content">
          <Link to="/docs">Docs </Link>
          <Link to="/weather">Weather</Link>
        </div>
      </nav>
    </div>
  );
}
