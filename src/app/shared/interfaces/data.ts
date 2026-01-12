
export interface email {
  email : string;
}
export interface code {
  resetCode : string;
}

export interface newPassword extends email{
  newPassword : string;
}

export interface regData extends loginData{
  name:string;
  rePassword:string;
  phone:string;
}

export interface loginData extends email {
  password:string;
}


export interface User extends regData{
  role: string;
}

export interface successResponse {
  message: string;
  user: User;
  token: string;
}

export interface ErrorResponse {
  statusMsg: string;
  message: string;
}

export interface shippingAddress {
  details : string;
  phone : string;
  city : string;
}
