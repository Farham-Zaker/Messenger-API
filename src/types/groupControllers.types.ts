export type CreateGroupRequestBodyTypes = {
  title: string;
  bio?: string;
  imagePath?: string;
};
export type GroupTypes = {
  groupId?: string;
  title?: string;
  bio?: string | null;
  ownerId?: string;
  imagePath?: string | null;
  owner?: OwnerTypes;
  updatedAt?: Date;
  createdAt?: Date;
};
export type AddAdminRequestBodyTypes = {
  userId: string;
  groupId: string;
};
export type AddMemberToGroupRequestBodyTypes = {
  userId: string;
  groupId: string;
};
export type GetAllGroupsRequestQueryTypes = {
  owner: string;
};
export type OwnerTypes = {
  userId: string;
  firstName: string;
  lastName: string;
  username: string;
  phoneNumber: string;
  bio: string | null;
  email: string;
  areaCodeId: string;
  createdAt: Date;
};

export type GetAdminsRequestQueryTypes = {
  groupId: string;
  group?: string;
  user?: string;
};
export type GroupAdminTypes = {
  adminId?: string;
  groupId?: string;
  group?: GroupTypes;
  userId?: string;
  user?: UserTypes;
};
type UserTypes = {
  userId?: string;
  firstName?: string | null;
  lastName?: string | null;
  username?: string | null;
  phoneNumber?: string;
  areaCodeId?: string;
  email?: string | null;
  createdAt?: Date;
};
export type GetAllMembersRequestQueryTypes = {
  groupId: string;
  group?: string;
  user?: string;
};
export type GroupMemberTypes = {
  memberId?: string;
  groupId?: string;
  group?: GroupTypes;
  userId?: string;
  user?: UserTypes;
};
export type GetGroupByIdRequestParamsTypes = {
  groupId: string;
};
export type GetGroupByIdRequestQueryTypes = {
  owner?: string;
  admins?: string;
  members?: string;
  messages?: string;
};
export type GetOneGroupAdminRequestQueryRequestTypes = {
  userId: string;
  user?: string;
  groupId: string;
  group?: string;
};
export type GetOneGroupMemberRequestQueryTypes = {
  userId: string;
  user?: string;
  groupId: string;
  group?: string;
};
export type UpdateGroupRequestBodyTypes = {
  groupId: string;
  title?: string;
  bio?: string;
  imagePath?: string;
  updatedAt?: Date;
};
export type DeleteAdminRequestQueryTypes = {
  userId: string;
  groupId: string;
};
