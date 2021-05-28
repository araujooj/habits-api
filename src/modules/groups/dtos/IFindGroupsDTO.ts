import IPagination from '@shared/dtos/IPagination';

export default interface IFindGroupsDTO extends IPagination {
  category: string;
}
