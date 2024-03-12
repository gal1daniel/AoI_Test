"use client"

import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState, useEffect } from 'react';

interface Horse {
  id: string;
  name: string;
  color: string;
  dateofbirth: string;
  breed: string;
  stable: string;
}

const Modositas: React.FC = () => {
  const [horses, setHorses] = useState<Horse[]>([]);
  const [selectedHorseId, setSelectedHorseId] = useState<string>('');
  const [newStable, setNewStable] = useState<string>('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    fetchHorses();
  }, []);

  const fetchHorses = async () => {
    try {
      const response = await fetch('/api/horse/[id]');
      if (!response.ok) {
        throw new Error('Horses could not be fetched');
      }
      const data = await response.json();
      setHorses(data.horses);
    } catch (error) {
      console.error('Error fetching horses:', error);
    }
  };

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedHorseId(event.target.value);
  };

  const handleNewStableChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setNewStable(event.target.value);
  };

  const removeAlert = () => {
    setTimeout(() => {
      setSuccessMessage('');
      setError('');
    }, 3000);
  };

  const handleUpdateHorse = async () => {
    try {
      if (!newStable) {
        throw new Error('Stable selection is empty');
      }
  
      const selectedHorse = horses.find((horse) => horse.id === selectedHorseId);
      if (!selectedHorse) {
        throw new Error('Selected horse not found');
      }
      const updatedHorse = { ...selectedHorse, stable: newStable };
  
      const response = await fetch(`/api/horse/${selectedHorseId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedHorse),
      });
  
      if (!response.ok) {
        throw new Error('Failed to update horse');
      }
      
      setSuccessMessage('Művelet sikeresen végrehajtva!');
      removeAlert();
  
      const data = await response.json();
      console.log(data.message);
      
    } catch (error) {
      console.error('Error updating horse:', error);
      setError('Hiányzó adatok');
      removeAlert();
    }
  };

  return (
    <section className="container p-10">
      <form>
        <div className="input-group mb-3">
          <label className="input-group-text">Jelenlegi adatok</label>
          <select className="form-select" onChange={handleSelectChange}>
            <option value=""></option>
            {horses.map((horse) => (
              <option key={horse.id} value={horse.id}>
                {horse.name}, {horse.dateofbirth}, {horse.stable}
              </option>
            ))}
          </select>
        </div>
        <div className="input-group mb-3">
          <label className="input-group-text">Új istálló kiválasztása</label>
          <select className="form-select" onChange={handleNewStableChange}>
            <option value=""></option>
            <option value="A">A</option>
            <option value="B">B</option>
            <option value="C">C</option>
          </select>
        </div>

        <div className="row p-3">
          <button type="button" className="btn btn-primary" onClick={handleUpdateHorse}>
            Módosítás
          </button>
        </div>
        {successMessage && <div className="alert alert-success text-center">{successMessage}</div>}
        {error && <div className="alert alert-danger text-center">{error}</div>}
      </form>
    </section>
  );
};

export default Modositas;