import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styles from '../styles/showSchools.module.css';

export default function ShowSchools() {
  const [schools, setSchools] = useState([]);

  useEffect(() => {
    // Fetch schools data from the API
    const fetchSchools = async () => {
      try {
        const response = await axios.get('/api/getSchools');
        setSchools(response.data.schools);
      } catch (error) {
        console.error('Error fetching schools:', error);
      }
    };

    fetchSchools();
  }, []);

  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>Schools List</h1>
      <div className={styles.grid}>
        {schools.map((school) => (
          <div key={school.id} className={styles.card}>
            <img
              src={school.image ? `/uploads/${school.image}` : '/default-image.jpg'}
              alt={school.name}
              className={styles.image}
            />
            <h2 className={styles.name}>{school.name}</h2>
            <p className={styles.address}>{school.address}</p>
            <p className={styles.city}>{school.city}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
