import {MapType} from '@angular/compiler';

export type Option = {
  choice: string,
  votes: number
}[];
export type Poll = {
  count: number,
  topic: string,
  options: Option
};
export type UserProfile = {
  name: string,
  NoOfPolls: Number,
  polls: {key: string, topic: string}[]
};
