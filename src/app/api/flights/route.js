import { NextResponse } from 'next/server';
import { fetchFlightData } from '../../../services/aviation-stack';

export async function GET(request) {
    const { searchParams } = new URL(request.url);
    const flightNumber = searchParams.get('flightNumber');

    if (!flightNumber) {
        return NextResponse.json({ error: 'Flight number is required' }, { status: 400 });
    }

    try {
        const flights = await fetchFlightData(flightNumber);

        if (flights && flights.length > 0) {
            return NextResponse.json(flights[0]);
        } else {
            return NextResponse.json({ error: 'Flight not found' }, { status: 404 });
        }
    } catch (error) {
        console.error('API Error:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
