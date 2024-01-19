export type CreateGroupBodyRequestTypes = {
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
export type AddAdminBodyRequestTypes = {
  userId: string;
  groupId: string;
};
export type AddMemberToGroupBodyRequestTyps = {
  userId: string;
  groupId: string;
};
export type GetAllGroupsQueryTypes = {
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

export type GetAdminsQueryRequestTypes = {
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
export type GetAllMembersQueryRequestTypes = {
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
export type GetGroupByIdParamsRequestTypes = {
  groupId: string;
};
export type GetGroupByIdQueryRequestTypes = {
  owner?: string;
  admins?: string;
  members?: string;
  messages?: string;
};
export type GetOneGroupAdminQueryRequestRequestTypes = {
  userId: string;
  user?: string;
  groupId: string;
  group?: string;
};
