"use client"

import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { v4 as uuidv4 } from 'uuid';

const Rogzites = () => {
  const [horseName, setHorseName] = useState('');
  const [horseColor, setHorseColor] = useState('');
  const [horseBirthYear, setHorseBirthYear] = useState('');
  const [breed, setBreed] = useState('');
  const [stable, setStable] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const removeAlert = () => {
    setTimeout(() => {
      setSuccessMessage('');
      setError('');
    }, 3000);
  };


  const handleFormSubmit = async () => {
    if (!horseName || !horseColor || !horseBirthYear || !breed || !stable) {
      setError('Hiányzó adatok');
      removeAlert();
      return;
    }

    try {

      const horseId = uuidv4();

      const response = await fetch('/api/horse', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: horseId,
          name: horseName,
          color: horseColor,
          dateofbirth: horseBirthYear,
          breed,
          stable,
        }),
      });
      if (!response.ok) {
        throw new Error('Failed to update horse');
      }
      setSuccessMessage('Művelet sikeresen végrehajtva!');
      removeAlert();
      setHorseName('');
      setHorseColor('');
      setHorseBirthYear('');
      setBreed('');
      setStable('');
      setError('');
    } catch (error) {
      console.error('Error adding horse:', error);
    }
  };

  return (
    <section className='container p-10'>
      <form>
        <div className="input-group mb-3">
          <span className="input-group-text">A ló neve:</span>
          <input
            type="text"
            className="form-control"
            aria-label="Sizing example input"
            aria-describedby="inputGroup-sizing-default"
            value={horseName}
            onChange={(e) => setHorseName(e.target.value)}
          />
        </div>
        <div className="input-group mb-3">
          <span className="input-group-text">A ló színe:</span>
          <input
            type="text"
            className="form-control"
            aria-label="Sizing example input"
            aria-describedby="inputGroup-sizing-default"
            value={horseColor}
            onChange={(e) => setHorseColor(e.target.value)}
          />
        </div>
        <div className="input-group mb-3">
          <span className="input-group-text">A ló születési éve:</span>
          <input
            type="text"
            className="form-control"
            aria-label="Sizing example input"
            aria-describedby="inputGroup-sizing-default"
            value={horseBirthYear}
            onChange={(e) => setHorseBirthYear(e.target.value)}
          />
        </div>

        <div className='mb-row'>
          <div className="input-group col-6 col-sm gap-3">
            <select
              className="form-select sm-mr-3"
              aria-label="Example select with button addon"
              value={breed}
              onChange={(e) => setBreed(e.target.value)}
            >
              <option selected>Kérem válassza ki a ló fajtáját</option>
              <option value="Lipicai">Lipicai</option>
              <option value="Muraközi">Muraközi</option>
              <option value="Kisbéri félvér">Kisbéri félvér</option>
              <option value="Shetland póni">Shetland póni</option>
            </select>
            <div className="input-group col-6 col-sm">
              <select
                className="form-select sm-ml-3"
                aria-label="Example select with button addon"
                value={stable}
                onChange={(e) => setStable(e.target.value)}
              >
                <option selected>Kérem válassza ki az istállót</option>
                <option value="A">A</option>
                <option value="B">B</option>
                <option value="C">C</option>
              </select>
            </div>
          </div>
        </div>

        <div className='row p-3'>
          <button type="button" className="btn btn-primary" onClick={handleFormSubmit}>Rögzítés</button>
        </div>
        {successMessage && <div className="alert alert-success text-center">{successMessage}</div>}
        {error && <div className="alert alert-danger text-center">{error}</div>}
      </form>
    </section>
  );
};

export default Rogzites;