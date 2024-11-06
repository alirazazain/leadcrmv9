// ... (previous interfaces remain the same)

export interface PersonResult {
  name: string;
  email: string[];
  phone?: string[];
  company?: string;
  designation?: string;
  location?: string;
  linkedin?: string;
  about?: string;
}

export interface BusinessPerson {
  name: string;
  designation: string;
  email: string[];
  phone?: string[];
  linkedin?: string;
  location?: string;
  about?: string;
}

export interface BusinessResult {
  name: string;
  industry?: string;
  size?: string;
  location?: string;
  website?: string;
  linkedin?: string;
  about?: string;
  founded?: string;
  revenue?: string;
  people?: BusinessPerson[];
}