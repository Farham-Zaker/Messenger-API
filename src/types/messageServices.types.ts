import { Prisma } from "@prisma/client";
export type CreateMessageParametersTypes = {
  text: string;
  senderId: string;
  updatedAt: Date;
  createdAt: Date;
  replyOf?: string | null;
  mediaId?: string | null;
  privateChatId?: null;
  groupId?: string | null;
  channelId?: string | null;
};
export type MessageTypes = {
  messageId?: string;
  text?: string;
  senderId?: string;
  createdAt?: Date;
  replyOf?: string | null;
  mediaId?: string | null;
  privateChatId?: string | null;
  groupId?: string | null;
  channelId?: string | null;
  sender?: UserTypes;
  privateChat?: PrivateChatTypes;
  media?: MediaTypes;
  group?: GroupTypes;
  channel?: ChannrlTypes;
};
type UserTypes = {
  userId: string;
  firstName: string;
  lastName: string;
  username: string;
  phoneNumber: string;
  bio: string;
  email: string;
  password: string;
  createdAt: Date;
  areaCodeId: string;
};
type MediaTypes = {
  mediaId: string;
  filePath: string;
  fileType: string;
};
type PrivateChatTypes = {
  privateChatId: string;
  user1Id: string;
  user2Id: string;
  updatedAt: Date;
  createdAt: Date;
};
type GroupTypes = {
  groupId: string;
  title: string;
  bio: string;
  ownerId: string;
  imagePath: string;
  updatedAt: Date;
  createdAt: Date;
};
type ChannrlTypes = {
  channelId: string;
  title: string;
  bio: string;
  ownerId: string;
  imagePath: string;
  updatedAt: Date;
  createdAt: Date;
};
export type FindAllMessageParametersTypes = {
  condition: Prisma.messagesWhereInput;
  take: number;
  selectedFields: {
    messages: string[];
    sender?: string[];
    media?: string[];
    privateChat?: string[];
    group?: string[];
    channel?: string[];
    replies?: string[];
  };
};
export type FindOneMessageParametersTypes = {
  condition: Prisma.messagesWhereInput;
  selectedFields: {
    messages: string[];
    sender?: string[];
    media?: string[];
    privateChat?: string[];
    group?: string[];
    channel?: string[];
    replies?: string[];
  };
};
export type UpdateMessageParametersTypes = {
  condition: Prisma.messagesWhereUniqueInput;
  data: {
    text?: string;
    senderId?: string;
    updatedAt?: Date;
    createdAt?: Date;
    replyOf?: string;
    mediaId?: string;
    privateChatId?: string;
    groupId?: string;
    channelId?: string;
  };
};
