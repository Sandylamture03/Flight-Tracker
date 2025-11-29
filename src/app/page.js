'use client';

import { useState } from 'react';
import FlightSearch from './components/FlightSearch';
import FlightResults from './components/FlightResults';

export default function Home() {
  const [flightData, setFlightData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = async (flightNumber) => {
    setLoading(true);
    setError(null);
    setFlightData(null);

    try {
      const response = await fetch(`/api/flights?flightNumber=${flightNumber}`);
      const data = await response.json();

      if (response.ok) {
        setFlightData(data);
      } else {
        setError(data.error || 'An error occurred');
      }
    } catch (err) {
      setError('Failed to fetch flight data');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="container">
      <h1 className="title">Flight Lookup</h1>
      <FlightSearch onSearch={handleSearch} loading={loading} />

      {error && (
        <div className="error-message">
          {error}
        </div>
      )}

      <FlightResults data={flightData} />
    </main>
  );
}
