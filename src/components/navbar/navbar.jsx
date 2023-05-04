import { useRef } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import './styles.css';

function Navbar() {
	const navRef = useRef();

	const showNavbar = () => {
		navRef.current.classList.toggle(
			"responsive_nav"
		);
	};

	return (
		<header className="nav">
			<h3>LOGO</h3>
			<nav ref={navRef}>
				<a href="/#">Начало</a>
				<a href="/#">За нас</a>
				<a href="/list">Списание</a>
				<a href="/#">Остави мнение</a>
				<button
					className="nav-btn nav-close-btn"
					onClick={showNavbar}>
					<FaTimes />
				</button>
			</nav>
			<button
				className="nav-btn"
				onClick={showNavbar}>
				<FaBars />
			</button>
		</header>
	);
}

export default Navbar;
