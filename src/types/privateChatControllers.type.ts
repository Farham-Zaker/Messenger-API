export type PrivateChatTypes = {
  privateChatId?: string;
  updatedAt?: Date;
  createdAt?: Date;
  user1?: UserTypes;
  user2?: UserTypes;
};
type UserTypes = {
  userId?: string;
  firstName?: string;
  lastName?: string;
  username?: string | null;
  phoneNumber?: string;
  areaCodeId?: string;
  bio?: string | null;
  email?: string | null;
  password?: string | null;
  createdAt?: Date;
};
export type GetAllPrivateChatRequestTypes = {
  Querystring: { user1: "true"; user2: "true" };
};
export type GetPrivateChatByIdRequestTypes = {
  Querystring: {
    user1: "true";
    user2: "true";
  };
  Params: { privateChatId: string };
};
export type UpdatePrivateChatRequestTypes = {
  Body: {
    privateChatId: string;
    updatedAt: Date;
    createdAt: Date;
  };
};
