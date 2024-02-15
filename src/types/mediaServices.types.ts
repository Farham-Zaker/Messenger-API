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
