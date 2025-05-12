import axiosClient from 'src/requests/ApplicationRequest';
import { LoginPayloadType } from '@/types';

export const loginApi = {
  login: (data: LoginPayloadType) => axiosClient.post('/auth/login', data),
};
