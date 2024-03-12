"use client"

import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

interface Breed {
  name: string;
  count: number;
}

const Adatok = () => {
  const [breeds, setBreeds] = useState<Breed[]>([]);

  const fetchBreeds = async () => {
    try {
      const response = await fetch('/api/breeds-count');
      if (!response.ok) {
        throw new Error('Failed to fetch breeds');
      }
      const data = await response.json();
      setBreeds(data.breeds);
    } catch (error) {
      console.error('Error fetching breeds:', error);
    }
  };

  useEffect(() => {
    fetchBreeds();
  }, []); 

  return (
    <section>
      <div className='container p-10'>
        <table className="table table-striped">
          <thead>
            <tr>
              <th scope="col">Fajta neve</th>
              <th scope="col">Lovak száma</th>
            </tr>
          </thead>
          <tbody>
            {breeds.map((breed, index) => (
              <tr key={index}>
                <td>{breed.name}</td>
                <td>{breed.count}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default Adatok;
