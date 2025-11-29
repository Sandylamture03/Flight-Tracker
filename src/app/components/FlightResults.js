export default function FlightResults({ data }) {
    if (!data) return null;

    // Helper to format time
    const formatTime = (isoString) => {
        if (!isoString) return '--:--';
        return new Date(isoString).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    };

    const formatDate = (isoString) => {
        if (!isoString) return '';
        return new Date(isoString).toLocaleDateString();
    };

    const generateCalendarUrl = () => {
        const title = encodeURIComponent(`${data.airline?.name} ${data.flight?.iata}`);

        // Format dates for Google Calendar (YYYYMMDDTHHmmSSZ)
        const formatDateForCalendar = (isoString) => {
            if (!isoString) return '';
            const date = new Date(isoString);
            return date.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
        };

        const start = formatDateForCalendar(data.departure?.scheduled);
        const end = formatDateForCalendar(data.arrival?.scheduled);

        const location = encodeURIComponent(`${data.departure?.iata} to ${data.arrival?.iata}`);

        let details = `Flight: ${data.airline?.name} ${data.flight?.iata}\n`;
        if (data.departure?.terminal) details += `Departure Terminal: ${data.departure.terminal}\n`;
        if (data.departure?.gate) details += `Departure Gate: ${data.departure.gate}\n`;
        if (data.arrival?.terminal) details += `Arrival Terminal: ${data.arrival.terminal}\n`;
        if (data.arrival?.gate) details += `Arrival Gate: ${data.arrival.gate}`;

        const detailsEncoded = encodeURIComponent(details);

        return `https://www.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${start}/${end}&details=${detailsEncoded}&location=${location}`;
    };

    return (
        <a
            href={generateCalendarUrl()}
            target="_blank"
            rel="noopener noreferrer"
            style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}
        >
            <div className="card" style={{ transition: 'transform 0.2s', cursor: 'pointer' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                    <div>
                        <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>
                            {data.airline?.name} {data.flight?.iata}
                        </h2>
                        <p style={{ color: '#94a3b8', fontSize: '0.875rem' }}>
                            {data.flight_date}
                        </p>
                    </div>
                    <span className="status-badge" style={{ textTransform: 'capitalize' }}>
                        {data.flight_status}
                    </span>
                </div>

                <div className="results-grid">
                    <div className="result-item">
                        <span className="label">Departure</span>
                        <span className="value">{formatTime(data.departure?.scheduled)}</span>
                        <span style={{ color: '#94a3b8' }}>{formatDate(data.departure?.scheduled)}</span>
                        <span style={{ marginTop: '0.25rem', fontWeight: 'bold' }}>{data.departure?.iata}</span>
                        <span style={{ fontSize: '0.875rem' }}>{data.departure?.airport}</span>
                        {data.departure?.terminal && <span style={{ fontSize: '0.875rem', color: '#64748b' }}>Term {data.departure.terminal}</span>}
                        {data.departure?.gate && <span style={{ fontSize: '0.875rem', color: '#64748b' }}>Gate {data.departure.gate}</span>}
                    </div>

                    <div className="result-item" style={{ alignItems: 'center', justifyContent: 'center' }}>
                        <div style={{ width: '100%', height: '2px', background: '#334155', position: 'relative', margin: '1rem 0' }}>
                            <div style={{ position: 'absolute', top: '-4px', right: '0', width: '10px', height: '10px', borderRadius: '50%', background: '#3b82f6' }}></div>
                            <div style={{ position: 'absolute', top: '-4px', left: '0', width: '10px', height: '10px', borderRadius: '50%', background: '#3b82f6' }}></div>
                            {/* Plane Icon could go here */}
                        </div>
                        <span style={{ fontSize: '0.875rem', color: '#94a3b8' }}>
                            {data.departure?.timezone} &rarr; {data.arrival?.timezone}
                        </span>
                    </div>

                    <div className="result-item" style={{ alignItems: 'flex-end' }}>
                        <span className="label">Arrival</span>
                        <span className="value">{formatTime(data.arrival?.scheduled)}</span>
                        <span style={{ color: '#94a3b8' }}>{formatDate(data.arrival?.scheduled)}</span>
                        <span style={{ marginTop: '0.25rem', fontWeight: 'bold' }}>{data.arrival?.iata}</span>
                        <span style={{ fontSize: '0.875rem', textAlign: 'right' }}>{data.arrival?.airport}</span>
                        {data.arrival?.terminal && <span style={{ fontSize: '0.875rem', color: '#64748b' }}>Term {data.arrival.terminal}</span>}
                        {data.arrival?.gate && <span style={{ fontSize: '0.875rem', color: '#64748b' }}>Gate {data.arrival.gate}</span>}
                    </div>
                </div>
            </div>
        </a>
    );
}
