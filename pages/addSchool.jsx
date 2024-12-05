import React, { useState } from 'react';
import axios from 'axios';
import styles from '../styles/addSchool.module.css';
import Link from 'next/link';

export default function AddSchool() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [contact, setContact] = useState('');
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    setImagePreview(URL.createObjectURL(file)); // Display a preview of the selected image
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !email || !address || !city || !state || !contact || !image) {
      setErrorMessage('All fields are required');
      setSuccessMessage('');
      return;
    }

    const formData = new FormData();
    formData.append('name', name);
    formData.append('email_id', email);
    formData.append('address', address);
    formData.append('city', city);
    formData.append('state', state);
    formData.append('contact', contact);
    formData.append('image', image);

    try {
      const response = await axios.post('/api/addSchool', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      setSuccessMessage(response.data.message);
      setErrorMessage('');
      setName('');
      setEmail('');
      setAddress('');
      setCity('');
      setState('');
      setContact('');
      setImage(null);
      setImagePreview(null);
    } catch (err) {
      console.error('Error submitting form: ', err);
      setErrorMessage('Failed to add school');
      setSuccessMessage('');
    }
  };

  return (
    <div className={styles.formContainer}>
      <h1>Add School</h1>

      {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}

      <form onSubmit={handleSubmit} className={styles.form}>
        <label>Name:</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className={styles.input}
        />
        <br />

        <label>Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className={styles.input}
        />
        <br />

        <label>Address:</label>
        <input
          type="text"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          required
          className={styles.input}
        />
        <br />

        <label>City:</label>
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          required
          className={styles.input}
        />
        <br />

        <label>State:</label>
        <input
          type="text"
          value={state}
          onChange={(e) => setState(e.target.value)}
          required
          className={styles.input}
        />
        <br />

        <label>Contact Number:</label>
        <input
          type="text"
          value={contact}
          onChange={(e) => setContact(e.target.value)}
          required
          className={styles.input}
        />
        <br />

        <label>Image:</label>
        <input
          type="file"
          onChange={handleFileChange}
          required
          className={styles.input}
        />
        {imagePreview && (
          <div className={styles.imagePreview}>
            <img src={imagePreview} alt="Image preview" />
          </div>
        )}
        <br />

        <button type="submit" className={styles.submitButton}>
          Add School
        </button>
      </form>

      <Link href="/showSchools">
        <button className={styles.showSchoolsButton}>Show Schools</button>
      </Link>
    </div>
  );
}
