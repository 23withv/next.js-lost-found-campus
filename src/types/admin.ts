export type Item = {
  _id: string;
  title: string;
  type: "LOST" | "FOUND";
  category: string;
  location: string;
  date: string;
  status: string;
  reporter?: {
    name: string;
    email: string;
    image?: string;
  };
};

export type User = {
  _id: string;
  name: string;
  email: string;
  role: "ADMIN" | "USER";
  image?: string;
};