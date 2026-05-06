import { useEffect, useRef } from 'react';
import { ChevronRight, Heart, ShieldCheck } from 'lucide-react';
import { motion, useReducedMotion } from 'framer-motion';
import styles from './Hero.module.css';

const MotionSection = motion.section;
const MotionDiv = motion.div;
const MotionH1 = motion.h1;
const MotionP = motion.p;
const MotionA = motion.a;

const whatsappNumber = '5521972229509';
const heroImageUrl = 'https://images.unsplash.com/photo-1544568100-847a948585b9?auto=format&fit=crop&q=80&w=1200&h=1500';

export default function Hero() {
	const sectionRef = useRef(null);
	const prefersReducedMotion = useReducedMotion();

	useEffect(() => {
		if (!sectionRef.current) return;

		sectionRef.current.scrollIntoView({ block: 'nearest' });
	}, []);

	const fadeUp = {
		hidden: { opacity: 0, y: 24 },
		visible: {
			opacity: 1,
			y: 0,
			transition: { type: 'spring', stiffness: 120, damping: 18 },
		},
	};

	const imageMotion = prefersReducedMotion
		? { hidden: { opacity: 0 }, visible: { opacity: 1 } }
		: {
				hidden: { opacity: 0, scale: 0.96 },
				visible: {
					opacity: 1,
					scale: 1,
					transition: { type: 'spring', stiffness: 90, damping: 16 },
				},
			};

	return (
		<section className={styles.heroSection} ref={sectionRef}>
			<MotionDiv
				aria-hidden="true"
				animate={prefersReducedMotion ? undefined : { y: [0, -18, 0] }}
				transition={prefersReducedMotion ? undefined : { repeat: Infinity, duration: 7, ease: 'easeInOut' }}
				className={styles.heroGlowPrimary}
			/>
			<MotionDiv
				aria-hidden="true"
				animate={prefersReducedMotion ? undefined : { y: [0, 18, 0] }}
				transition={prefersReducedMotion ? undefined : { repeat: Infinity, duration: 9, ease: 'easeInOut', delay: 1 }}
				className={styles.heroGlowSecondary}
			/>

			<div className={styles.heroContainer}>
				<MotionSection
					initial="hidden"
					animate="visible"
					variants={{
						hidden: {},
						visible: { transition: { staggerChildren: 0.16 } },
					}}
					className={styles.heroGrid}
				>
					<div className={styles.heroContent}>
						<MotionDiv variants={fadeUp} className={styles.badge}>
							<span className={styles.badgeIcon}>
								<ShieldCheck className={styles.badgeIconSvg} aria-hidden="true" />
							</span>
							<span className={styles.badgeText}>Cuidada por futura Médica Veterinária (5º período)</span>
						</MotionDiv>

						<MotionH1 variants={fadeUp} className={styles.title}>
							Cuidado <span className={styles.titleAccent}>com amor</span>
							<br /> para o seu pet!
						</MotionH1>

						<MotionP variants={fadeUp} className={styles.description}>
							Serviços especializados de Pet Sitter e Dog Walker em Curitiba, PR.
							Garantindo a alegria e o bem-estar do seu melhor amigo com segurança.
						</MotionP>

						<MotionDiv variants={fadeUp} className={styles.actions}>
							<MotionA
								whileHover={prefersReducedMotion ? undefined : { scale: 1.04 }}
								whileTap={prefersReducedMotion ? undefined : { scale: 0.98 }}
								href={`https://wa.me/${whatsappNumber}`}
								target="_blank"
								rel="noopener noreferrer"
								className={styles.ctaButton}
							>
								Agendar uma visita
								<ChevronRight className={styles.ctaIcon} aria-hidden="true" />
							</MotionA>
						</MotionDiv>
					</div>

					<MotionDiv variants={imageMotion} className={styles.heroVisual}>
						<div className={styles.imageFrame}>
							<img
								src={heroImageUrl}
								alt="Cachorro feliz"
								className={styles.heroImage}
							/>
						</div>

						<div className={styles.floatingCard}>
							<div className={styles.floatingCardIcon}>
								<Heart className={styles.floatingCardIconSvg} aria-hidden="true" />
							</div>
							<div className={styles.floatingCardContent}>
								<p className={styles.floatingCardTitle}>Tranquilidade</p>
								<p className={styles.floatingCardText}>Seu pet em boas mãos</p>
							</div>
						</div>
					</MotionDiv>
				</MotionSection>
			</div>
		</section>
	);
}
