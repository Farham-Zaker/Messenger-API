export type CreateChannelRequestBodyTypes = {
  title: string;
  bio: string;
  imagePath?: string;
};
export type AddAdminRequestBodyTypes = {
  channelId: string;
  userId: string;
};
export type GetAllChannelsRequestQueryTypes = {
  owner?: string;
  admins?: string;
  members?: string;
};
export type UploadedFileTypes = {
  status: string;
  fileName: string;
  filePath: string;
  fileType: string;
};
export type ChannelTypes = {
  channelId?: string;
  title?: string;
  bio?: string;
  ownerId?: string;
  updatedAt?: Date;
  createdAt?: Date;
  owner?: UserTypes;
  admins?: AdminTypes[];
  members?: MemberType[];
};
type UserTypes = {
  userId: string;
  firstName: string | null;
  lastName: string | null;
  username: string | null;
  areaCodeId: string;
  phoneNumber: string;
  bio: string | null;
  email: string | null;
  password: string | null;
  createdAt: Date;
};
export type AdminTypes = {
  adminId?: string;
  userId?: string;
  channelId?: string;
  createdAt?: Date;
};
export type MemberType = {
  memberId?: string;
  userId?: string;
  channelId?: string;
  createdAt?: Date;
};
export type GetAllAdminsORMembersRequestQueryTypes = {
  channelId: string;
  channel?: string;
  user?: string;
};
export type GetChannelByIdRequestQueryTypes = {
  owner?: string;
  admins?: string;
  members?: string;
};
export type GetOneChannelAdminTypes = {
  channelId: string;
  userId: string;
  channel?: string;
  user?: string;
};
export type GetOneChannelMemberTypes = {
  channelId: string;
  userId: string;
  channel?: string;
  user?: string;
};
export type UpdateChannelTypes = {
  channelId: string;
  title?: string;
  bio?: string;
  updatedAt?: Date;
};
export type RemoveAdminRequestQueryTypes = {
  channelId: string;
  userId: string;
};
export type RemoveMemberRequestQueryTypes = {
  channelId: string;
  userId: string;
};
