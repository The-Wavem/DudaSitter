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
					<Link to="/admin" className={styles.adminLink}>
						Admin
					</Link>
				</div>
			</div>

			<div className={styles.bottomBar}>
				Feito com <Heart className={styles.heartIcon} aria-hidden="true" /> para pets felizes © {new Date().getFullYear()} Duda Sitter
			</div>
		</footer>
	);
}
