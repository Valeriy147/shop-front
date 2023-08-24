import jwtDecode from 'jwt-decode';
import { IUser } from '../auth/store/interfaces';

export const getUserData = () => {
  try {
    const token = localStorage.getItem('token')!.toString();
    return jwtDecode(token) as IUser;
  } catch (e) {
    return { name: '', email: '', id: 1 };
  }
};
