import IPagination from '@shared/dtos/IPagination';

export default interface IFindUserGroupDTO extends IPagination {
  user_id: string;
}
