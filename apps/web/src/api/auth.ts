import apiClient from './client';

// types
import {
  LoginResponseType,
  LoginUserDtoType,
  CreateUserResponseType,
  CreateUserDtoType,
} from '@repo/validation';
import {} from '@repo/validation';

export const userLogin = async (
  loginData: LoginUserDtoType,
): Promise<LoginResponseType> => {
  const response: LoginResponseType = await apiClient.post(
    '/auth/login',
    loginData,
  );
  return response;
};

export const userRegister = async (
  registerData: CreateUserDtoType,
): Promise<CreateUserResponseType> => {
  const response: CreateUserResponseType = await apiClient.post(
    '/auth/register',
    registerData,
  );
  return response;
};
