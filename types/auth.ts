//@ts-ignore
import {UseFormRegister} from 'react-hook-form/dist/types/form';
//@ts-ignore
import {FieldErrors} from 'react-hook-form/dist/types/errors';

export interface IInputs {
  username: string,
  email: string,
  password: string
}

export interface IRegister {
  username: string,
  email: string,
  password: string
}

export interface ResponseRegisterData {
  id: number,
  username: string,
  email: string,
  updatedAt: Date,
  createdAt: Date
}

export interface IAuthInput {
  register: UseFormRegister<IInputs>
  errors: FieldErrors<IInputs>

}

export interface IAuthFrom {
  setOpen: () => void,
  toggleRegister: () => void
}

export type ResponseLoginUser = {
  user: LoginUserResponse,
  msg: string
}

export type LoginUserResponse = {
  userId: number
  username: string,
  email: string,
}

export type LoginUser = {
  username: string,
  password: string
}

export type ResponseCreateUser = {
  id: number,
  username: string,
  email: string,
  createdAt: string,
  updatedAt: string
}


export type CreateUserDto = {
  username: string,
} & LoginUserDto


export type LoginUserDto = {
  email: string,
  password: string
}
