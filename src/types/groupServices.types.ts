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
  user?: UserTypes;
  groupId?: string;
  group?: GroupTypes;
};
export type AddMemberToGroupParamtersTyps = {
  userId: string;
  groupId: string;
};
export type FindOneGroupParametersTypes = {
  condition: FindOneGroupConditionTypes;
  selectedFields: {
    groups: string[];
    owner?: string[];
    admins?: string[];
    members?: string[];
    messages?: string[];
  };
};
export type FindOneGroupConditionTypes = {
  groupId?: string;
  ownerId?: string;
  members?: {
    userId: string;
    relation: "one to many" | "one to one";
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
    userId: string;
    relation: "one to many" | "one to one";
  };
  admins?: {
    adminId: string;
    relation: "one to many" | "one to one";
  };
};
export type FindAllGroupsAdminsParametersTypes = {
  condition: FindAllGroupsAdminsConditionTypes;
  selectedFields: {
    admins: string[];
    group?: string[];
    user?: string[];
  };
};
export type FindAllGroupsAdminsConditionTypes = {
  groupId?: string;
  userId?: string;
};
export type FindAllGroupsMembersParametersTypes = {
  condition: {
    groupId?: string;
    userId?: string;
  };
  selectedFields: {
    groups_members: string[];
    group?: string[];
    user?: string[];
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
    user?: string[];
    group?: string[];
  };
};
export type GroupMemberTypes = {
  memberId?: string;
  groupId?: string;
  group?: GroupTypes;
  userId?: string;
  user?: UserTypes;
  createdAt?: Date;
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
export type UpdateGroupPramatersTypes = {
  condition: {
    groupId: string;
  };
  data: {
    title?: string;
    ownerId?: string;
    bio?: string;
    imagePath?: string;
    updatedAt?: Date;
  };
};
export type RemoveAdminParametersType = {
  userId: string;
  groupId: string;
};
export type RemoveAllAdminsParametersTypes = { groupId: string };
export type RemoveMemberParametersType = {
  userId: string;
  groupId: string;
};
