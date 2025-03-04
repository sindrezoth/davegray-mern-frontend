import { Link } from 'react-router-dom';

const DashHeader = () => {
  const content = (
    <header className="dash-header">
      <div className="dash-header__contanier">
        <Link to="/dash/notes">
          <h1 className="dash-header__title">TechNotes</h1>
        </Link>
        <nav className="dash-header__nav">
        </nav>
      </div>
    </header>
  );

  return content;
}

export default DashHeader;
