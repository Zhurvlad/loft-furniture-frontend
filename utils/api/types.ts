



export type CreateUserDto = {
  username: string,
} & LoginUserDto


export type LoginUserDto = {
  email: string,
  password: string
}


export type ResponseCreateUser = {
  id: number,
  username: string,
  email: string,
  createdAt: string,
  updatedAt: string
}
