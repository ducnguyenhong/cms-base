import { UserType } from "./user.type";
export interface ApplicationType {
  id: number;
  name: string;
  owner: UserType;
  editor: UserType[];
  points: number;
  logo: string | null;
  createdAt: number;
  type: string;
  updatedAt: number | null;
}
