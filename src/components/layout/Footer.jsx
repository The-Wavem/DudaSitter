import { Heart } from 'lucide-react';
import { Link } from 'react-router-dom';
import styles from './Footer.module.css';

export default function Footer() {
	return (
		<footer className={styles.footer}>
			<div className={styles.container}>
				<div className={styles.brandBlock}>
					<span className={styles.brand}>Duda Sitter</span>
					<p className={styles.description}>
						Cuidado profissional e afetuoso para o seu melhor amigo. Em Curitiba e região.
					</p>
					<a
						href="https://thewavem.web.app/"
						target="_blank"
						rel="noopener noreferrer"
						className={styles.wavemBadge}
					>
						Feito pela Wavem
					</a>
				</div>

				<div className={styles.links}>
					<Link to="/" className={styles.link}>
						Início
					</Link>
					<Link to="/sobre" className={styles.link}>
						Sobre
					</Link>
					<Link to="/contato" className={styles.link}>
						Contato
					</Link>
					{/* <Link to="/admin" className={styles.adminLink}>
						Admin
					</Link> */}
				</div>
			</div>

			<div className={styles.bottomBar}>
				<span>Feito com</span>
				<Heart className={styles.heartIcon} aria-hidden="true" />
				<span>para pets felizes © {new Date().getFullYear()} Duda Sitter</span>
			</div>
		</footer>
	);
}
