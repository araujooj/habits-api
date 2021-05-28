import IPagination from '@shared/dtos/IPagination';

export default interface IFindEventsDTO extends IPagination {
  group_id: string;
}
