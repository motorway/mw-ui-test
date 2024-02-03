import { User } from './user';

export type Car = {
  id: string;
  created_at: string;
  updated_at: string;
  color: string;
  description: string;
  alt_description: string;
  url: string;
  likes: number;
  tags: Array<string>;
  user: User;
};
