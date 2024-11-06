export interface Client {
  id: string;
  name: string;
  industry?: string;
  location: string;
  website?: string;
  linkedin?: string;
  jobCount: number;
  owner: {
    name: string;
    email: string;
  };
  contacts?: Contact[];
  guests?: Guest[];
  notes?: Note[];
  createdAt: string;
  updatedAt: string;
}