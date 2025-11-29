export interface FlightEndpoint {
    airport: string;
    timezone: string;
    iata: string;
    icao: string;
    terminal: string | null;
    gate: string | null;
    delay: number | null;
    scheduled: string;
    estimated: string;
    actual: string | null;
    estimated_runway: string | null;
    actual_runway: string | null;
}

export interface Airline {
    name: string;
    iata: string;
    icao: string;
}

export interface FlightInfo {
    number: string;
    iata: string;
    icao: string;
    codeshared: any | null;
}

export interface Aircraft {
    registration: string;
    iata: string;
    icao: string;
    icao24: string;
}

export interface LiveData {
    updated: string;
    latitude: number;
    longitude: number;
    altitude: number;
    direction: number;
    speed_horizontal: number;
    speed_vertical: number;
    is_ground: boolean;
}

export interface FlightData {
    flight_date: string;
    flight_status: string;
    departure: FlightEndpoint;
    arrival: FlightEndpoint;
    airline: Airline;
    flight: FlightInfo;
    aircraft: Aircraft | null;
    live: LiveData | null;
}

export interface Pagination {
    limit: number;
    offset: number;
    count: number;
    total: number;
}

export interface FlightResponse {
    pagination: Pagination;
    data: FlightData[];
}
