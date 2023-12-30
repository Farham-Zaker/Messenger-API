import { Prisma } from "@prisma/client";

export type PrivateChatFindOneParametersTypes = {
  condition: Prisma.private_chatsWhereInput;
  selectedFields: {
    private_chats: string[];
    user1?: string[];
    user2?: string[];
    messages?: string[];
    pinned?: string;
  };
};
export type PrivateChatFindOneTypes = {
  privateChatId?: string;
  updatedAt?: Date;
  createdAt?: Date;
};
export type CreatePrivateChatParametersType = {
  user1Id: string;
  user2Id: string;
  updatedAt: Date;
};
export type CreatePrivateChatTypes = {
  privateChatId: string;
  user1Id: string;
  user2Id: string;
  updatedAt: Date;
  createdAt: Date;
};
export type FindAllPrivateChatsParametersType = {
  condition: Prisma.private_chatsWhereInput;
  selectedFields: {
    private_chats?: string[];
    user1?: string[];
    user2?: string[];
  };
};
export type PrivateChatTypes = {
  privateChatId?: string;
  updatedAt?: Date;
  createdAt?: Date;
  user1Id?: string;
  user1?: UserTypes;
  user2Id?: string;
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
export type UpdatePrivateChatParametersType = {
  condition: {
    privateChatId: string;
  };
  data: {
    updatedAt: Date;
  };
};

