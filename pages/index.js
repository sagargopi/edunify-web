// pages/index.jsx
import Link from 'next/link';
import styles from '../styles/Home.module.css'; // Import the CSS module

const Home = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Welcome to Edunify!</h1>
      <p className={styles.description}>Manage and view schools with ease.</p>
      <div className={styles.linkContainer}>
        <Link href="/addSchool" className={styles.linkButton}>
          Add a new school
        </Link>
      </div>
      <div className={styles.linkContainer}>
        <Link href="/showSchools" className={styles.linkButton}>
          Show all schools
        </Link>
      </div>
    </div>
  );
};

export default Home;
