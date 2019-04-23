export interface User {
  uid: string;
  type: string;
  name: string;
  email: string;
  sex: string;
  location: string;
  qualification_avg?: number;
  qualification_count?: number;
  reviews: any;
}
