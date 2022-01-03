import styles from '../styles/components/nav.module.css';
import text from '../styles/text.module.css'
import Link from 'next/link';
import cs from '../scripts/multiclass'
export default function Nav() {
  return (
    <div className={styles.nav}>
      <div className={styles.linkGroup}>
        <Link href="/" passHref>
          <span className={cs(text.link, styles.link)}>Home</span>
        </Link>
        <Link href="/about" passHref>
          <span className={cs(text.link, styles.link)}>About</span>
        </Link>
      </div>
      <div className={styles.bigLink}>
        <Link href="/gallery" passHref>
          <span className={text.link}>Gallery</span>
        </Link>
      </div>
      <div className={styles.linkGroup}>
      <Link href="/contact" passHref>
          <span className={cs(text.link, styles.link)}>Contact</span>
        </Link>
        <Link href="/blog" passHref>
          <span className={cs(text.link, styles.link)}>Blog</span>
        </Link>
      </div>
    </div>
  );
}