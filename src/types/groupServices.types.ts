export type CreateGroupParametersTypes = {
  title: string;
  bio?: string;
  ownerId: string;
  imagePath?: string;
  updatedAt: Date;
};
export type GroupTypes = {
  groupId: string;
  bio: string | null;
  ownerId: string;
  imagePath: string | null;
  updatedAt: Date;
  createdAt: Date;
};
export type AddMemberToGroupParamtersTyps = {
  userId: string;
  groupId: string;
};
export type AddedMemberTypes = {
  memberId: string;
  groupId: string;
  userId: string;
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
