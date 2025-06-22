import './Header.css';
import { Link } from "react-router-dom"

function Header() {
    return (
        <header className="header">
            <Link to="/" className="logo title">My <span className="heart">❤️</span> English</Link>
            <nav className="nav">
                <Link to="/">📚 Главная</Link>
                <Link to="/cards">🃏 Карточки</Link>
                <a href="#">Plans</a>
                <a href="#">Level</a>
            </nav>
        </header>
    );
}

export default Header;

