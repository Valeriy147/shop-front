export interface IAuthInitialState {
  loginAgain: boolean;
  loading: boolean;
  userLogin: string;
  userName: string;
}

export interface IUserCreation {
  email: string;
  name?: string;
  password: string;
  returnSecureToken?: boolean;
}

export interface IUser {
  email: string;
  id: number;
  name: string;
}

export interface AuthResponse {
  idToken: string;
  expiresIn: string;
}
