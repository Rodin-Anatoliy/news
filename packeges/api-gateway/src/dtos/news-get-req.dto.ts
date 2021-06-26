import { IsString } from 'class-validator';

export class NewsGetReqDto {
  @IsString()
  query: string;
}
