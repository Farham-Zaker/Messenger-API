export type CreateMediaParamersTypes = {
  mediaId?: string;
  filePath: string;
  fileType: string;
  updatedAt: Date;
  createdAt: Date;
  privateChatId?: string;
  channelId?: string;
  groupId?: string;
};
export type CreatedMediaType = {
  mediaId: string;
  filePath: string;
  fileType: string;
  updatedAt: Date;
  createdAt: Date;
  privateChatId?: string;
  channelId?: string;
  groupId?: string;
};
export type FindAllMediaParametersTypes = {
  condition: {
    privateChatId?: string;
    groupId?: string;
    channelId?: string;
  };
  selectedFields: {
    medias: string[];
  };
};
export type MediaType = {
  mediaId?: string;
  filePath?: string;
  fileType?: string;
  createdAt?: Date;
  updatedAt?: Date;
  privateChatId?: string;
  privateChat?: PrivateChatTypes;
  channelId?: string;
  channel?: ChannelTypes;
  groupId?: string;
  group?: GroupTypes;
  messageId?: string;
  message?: MediaType | null;
};
type PrivateChatTypes = {
  privateChatId: string;
  user1Id: string;
  user2Id: string;
  updatedAt: Date;
  createdAt: Date;
};
type ChannelTypes = {
  channelId?: string;
  title?: string;
  bio?: string;
  imagePath?: string | null;
  ownerId?: string;
  updatedAt?: Date;
  createdAt?: Date;
};
type GroupTypes = {
  groupId?: string;
  title?: string;
  bio?: string | null;
  ownerId?: string;
  imagePath?: string | null;
  updatedAt?: Date;
  createdAt?: Date;
};
type MessageTypes = {
  messageId?: string;
  text?: string;
  senderId?: string;
  createdAt?: Date;
  replyOf?: string | null;
  mediaId?: string | null;
  privateChatId?: string | null;
  groupId?: string | null;
  channelId?: string | null;
};
