import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styles from '../styles/showSchools.module.css';
import Link from 'next/link'; // Import the Link component

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
      {/* Home Button */}
      <Link href="/">
        <button className={styles.homeButton}>Home</button>
      </Link>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>School Name</th>
            <th>Address</th>
            <th>City</th>
            <th>Image</th>
          </tr>
        </thead>
        <tbody>
          {schools.map((school) => (
            <tr key={school.id}>
              <td>{school.name}</td>
              <td>{school.address}</td>
              <td>{school.city}</td>
              <td>
                <img
                  src={school.image ? `/uploads/${school.image}` : '/default-image.jpg'}
                  alt={school.name}
                  className={styles.image}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
