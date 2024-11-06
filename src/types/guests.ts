export type GuestStatus = 'PENDING' | 'ACTIVE' | 'INACTIVE';

export interface GuestAccess {
  jobs: 'ALL' | string[];
  invoices: boolean;
}

export interface Guest {
  id: string;
  name: string;
  email: string;
  description?: string;
  access: GuestAccess;
  status: GuestStatus;
  createdAt: string;
}