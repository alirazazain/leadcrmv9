export interface Note {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  updatedAt?: string;
  createdBy: {
    id: string;
    name: string;
    email: string;
  };
}