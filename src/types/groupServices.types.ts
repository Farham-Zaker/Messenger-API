export type CreateGroupParametersTypes = {
  title: string;
  bio?: string;
  ownerId: string;
  imagePath?: string;
  updatedAt: Date;
};
export type CreatedGroupTypes = {
  groupId: string;
  title: string;
  bio: string | null;
  imagePath: string | null;
  ownerId: string;
  updatedAt: Date;
  createdAt: Date;
};
export type GroupTypes = {
  groupId?: string;
  bio?: string | null;
  ownerId?: string;
  imagePath?: string | null;
  updatedAt?: Date;
  createdAt?: Date;
  admins?: AdminTypes[];
};
type AdminTypes = {
  adminId: string;
  userId: string;
  groupId: string;
};

export type AddAdmiToGroupParametersTypes = {
  groupId: string;
  userId: string;
};
export type GroupAdminTypes = {
  adminId?: string;
  userId?: string;
  groupId?: string;
};
export type AddMemberToGroupParamtersTyps = {
  userId: string;
  groupId: string;
};
export type FindOneGroupParametersTypes = {
  condition: {
    groupId?: string;
    ownerId?: string;
  };
  selectedFields: {
    groups?: string[];
    owner?: string[];
  };
};
export type FindAllGroupsPramatersTypes = {
  condition: FindAllGroupsConditionTypes;
  selectedFields: {
    groups: string[];
    owner?: string[];
  };
};
export type FindAllGroupsConditionTypes = {
  ownerId?: string;
  members?: {
    memberId: string;
    relation: "one to many" | "one to one";
  };
  admins?: {
    adminId: string;
    relation: "one to many" | "one to one";
  };
};
export type FindOneGroupAdminParamtersTypes = {
  condition: {
    adminId?: string;
    userId?: string;
    groupId?: string;
  };
  selectedFields: {
    groups_admins?: string[];
    user?: string[];
    group?: string[];
  };
};
export type FindOneGroupMemberParametersTypes = {
  condition: {
    memberId?: string;
    userId?: string;
    groupId?: string;
  };
  selectedFields: {
    groups_members: string[];
    users?: string[];
    group?: string[];
  };
};
export type GroupMemberTypes = {
  memberId?: string;
  groupId?: string;
  group?: GroupTypes;
  userId?: string;
  user?: UserTypes;
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
