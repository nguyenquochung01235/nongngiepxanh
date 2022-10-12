export interface ADDACTIVITY {
  id_lichmuavu: string | number;
  name_hoatdong: string;
  description_hoatdong: string;
  date_start?: any;
  date_end?: any;
}

export interface ListActivity {
  id_hoatdongmuavu: number;
  id_lichmuavu: number;
  name_hoatdong: string;
  description_hoatdong: string;
  date_start: any;
  date_end: any;
  status: string;
  attach: string;
  created_at: any;
  updated_at: any;
}
