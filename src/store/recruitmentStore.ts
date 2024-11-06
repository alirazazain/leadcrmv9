import { create } from 'zustand';

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
  createdAt: string;
  updatedAt: string;
}

interface RecruitmentState {
  clients: Client[];
  addClient: (client: Omit<Client, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updateClient: (id: string, client: Partial<Client>) => void;
  deleteClient: (id: string) => void;
}

export const useRecruitmentStore = create<RecruitmentState>((set) => ({
  clients: [],
  
  addClient: (clientData) => {
    const now = new Date().toISOString();
    const newClient: Client = {
      ...clientData,
      id: crypto.randomUUID(),
      createdAt: now,
      updatedAt: now
    };
    
    set((state) => ({
      clients: [newClient, ...state.clients]
    }));
  },
  
  updateClient: (id, clientData) => {
    set((state) => ({
      clients: state.clients.map((client) =>
        client.id === id
          ? { ...client, ...clientData, updatedAt: new Date().toISOString() }
          : client
      )
    }));
  },
  
  deleteClient: (id) => {
    set((state) => ({
      clients: state.clients.filter((client) => client.id !== id)
    }));
  }
}));