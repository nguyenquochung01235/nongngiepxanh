export interface IRoleOfUser {
  code: string;
  name: string;
  id_user?: number | string;
}

export interface ADDNEWUSER {
  id_user?: number | string;
}

export interface SEARCHUSER {
  phone_number: number;
}
