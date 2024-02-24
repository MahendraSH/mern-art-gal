export interface UserType {
  user: {
    _id: string;
    userName: string;
    email: string;
    password: string;
    avatar?: {
      public_id: string;
      url: string;
    };
    role: "user" | "admin";
    createdAt: string;
    updatedAt: string;
  };
}
