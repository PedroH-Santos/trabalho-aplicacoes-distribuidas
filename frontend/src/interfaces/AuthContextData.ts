import { SignInData } from "./SignInData";
import { User } from "./User";

export interface AuthContextData {
  signed: boolean;
  user: User | null;
  loading: boolean;
  signIn(data: SignInData): Promise<void>;
  signOut(): void;
  updateUser(clientId: number): void;
}