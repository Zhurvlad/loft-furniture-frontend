import {UseFormRegister} from 'react-hook-form/dist/types/form';
import {FieldErrors} from 'react-hook-form/dist/types/errors';

export interface IInputs {
  name: string,
  email: string,
  password: string
}

export interface IAuthInput {
  register: UseFormRegister<IInputs>
  errors: FieldErrors<IInputs>
  /*darkModeClass: string*/
}

export interface Interface {

}
