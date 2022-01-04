import styles from '../styles/components/footer.module.css'
import Link from 'next/link'

export default function Footer(props) {
  return (
    <div className={styles.footer}>
      <div>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" preserveAspectRatio='none' className={styles.svgBlock}>
          <path d="M 0 0 L 0 600 L 800 600 Q 625 200 0 0" fill="var(--w-5)"></path>
        </svg>
      </div>
      <div className={styles.bound}>
        <div className={styles.links}>
          <Link href="/">Home</Link>
          <Link href="/about">About</Link>
          <Link href="/gallery">Gallery</Link>
          <Link href="/contact">Contact</Link>
          <Link href="/blog">Blog</Link>
        </div>
        <hr />
        <div>&copy; Kuhn Hong 2021</div>
      </div>
    </div>
  );
}