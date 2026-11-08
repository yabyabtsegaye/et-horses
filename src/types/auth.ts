export type UserRole = 'bettor' | 'owner' | 'breeder' | 'syndicate';

export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  role: UserRole;
  avatar?: string;
  balance: number; // in ETB
  createdAt: string;
  kycVerified?: boolean;
}

export interface Bet {
  id: string;
  raceId: string;
  raceName: string;
  horseId: string;
  horseName: string;
  odds: number;
  stake: number; // in ETB
  potentialPayout: number;
  status: 'pending' | 'won' | 'lost';
  placedAt: string;
}

export interface EventRSVP {
  id: string;
  eventId: string;
  eventTitle: string;
  eventDate: string;
  location: string;
  tier: 'General Grandstand' | 'Paddock Lounge' | 'Royal Turf Club' | 'Royal Paddock VIP Pass';
  guests: number;
  ticketCode: string;
  reservedAt: string;
}

export interface HorseInquiry {
  id: string;
  horseId: string;
  horseName: string;
  category: string;
  message: string;
  offerAmount?: number;
  submittedAt: string;
  status: 'Received' | 'Under Review' | 'Contacted';
}

export interface RaceRunner {
  id: string;
  name: string;
  number: number;
  jockey: string;
  trainer: string;
  weight: string;
  form: string;
  odds: number;
  silkColor: string; // hex
}

export interface Race {
  id: string;
  name: string;
  track: string;
  distance: string;
  purse: string;
  time: string;
  status: 'upcoming' | 'live' | 'finished';
  runners: RaceRunner[];
}
