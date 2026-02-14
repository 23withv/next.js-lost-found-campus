export interface Reporter {
  _id: string;
  name: string;
  email: string;
  image?: string;
}

export interface Item {
  _id: string;
  title: string;
  description: string;
  type: "LOST" | "FOUND";
  category: string;
  location: string;
  date: string;
  status: "PENDING" | "PUBLISHED" | "RESOLVED";
  images: string[];
  reporter: Reporter;
  createdAt: string;
}