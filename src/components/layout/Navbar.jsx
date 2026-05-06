import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, PawPrint, X } from 'lucide-react';
import styles from './Navbar.module.css';

export default function Navbar() {
	const [isOpen, setIsOpen] = useState(false);
	const location = useLocation();

	const links = [
		{ name: 'Início', path: '/' },
		{ name: 'Sobre Mim', path: '/sobre' },
		{ name: 'Contato', path: '/contato' },
	];

	const isActive = (path) => location.pathname === path;

	return (
		<nav className={styles.navbar}>
			<div className={styles.container}>
				<div className={styles.topBar}>
					<div className={styles.brandArea}>
						<Link to="/" className={styles.brandLink} onClick={() => setIsOpen(false)}>
							<PawPrint className={styles.brandIcon} aria-hidden="true" />
							<span className={styles.brandText}>Duda Sitter</span>
						</Link>
					</div>

					<div className={styles.desktopMenu}>
						{links.map((link) => (
							<Link
								key={link.name}
								to={link.path}
								className={`${styles.navLink} ${isActive(link.path) ? styles.navLinkActive : ''}`}
							>
								{link.name}
							</Link>
						))}

						<Link to="/contato" className={styles.ctaLink}>
							Agendar
						</Link>
					</div>

					<div className={styles.mobileToggleArea}>
						<button
							type="button"
							onClick={() => setIsOpen((prev) => !prev)}
							className={styles.mobileToggle}
							aria-label={isOpen ? 'Fechar menu' : 'Abrir menu'}
							aria-expanded={isOpen}
							aria-controls="mobile-menu"
						>
							{isOpen ? <X className={styles.toggleIcon} aria-hidden="true" /> : <Menu className={styles.toggleIcon} aria-hidden="true" />}
						</button>
					</div>
				</div>
			</div>

			{isOpen && (
				<div id="mobile-menu" className={styles.mobileMenu}>
					<div className={styles.mobileMenuInner}>
						{links.map((link) => (
							<Link
								key={link.name}
								to={link.path}
								onClick={() => setIsOpen(false)}
								className={`${styles.mobileLink} ${isActive(link.path) ? styles.mobileLinkActive : ''}`}
							>
								{link.name}
							</Link>
						))}
					</div>
				</div>
			)}
		</nav>
	);
}
