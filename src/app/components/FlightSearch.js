'use client';

import { useState } from 'react';

export default function FlightSearch({ onSearch, loading }) {
    const [flightNumber, setFlightNumber] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (flightNumber.trim()) {
            onSearch(flightNumber.trim());
        }
    };

    return (
        <form onSubmit={handleSubmit} className="search-form">
            <div className="input-group">
                <input
                    type="text"
                    className="input"
                    placeholder="Enter Flight Number (e.g., AA123)"
                    value={flightNumber}
                    onChange={(e) => setFlightNumber(e.target.value)}
                    disabled={loading}
                    aria-label="Flight Number"
                />
            </div>
            <button type="submit" className="button" disabled={loading || !flightNumber.trim()}>
                {loading ? 'Searching...' : 'Search'}
            </button>
        </form>
    );
}
