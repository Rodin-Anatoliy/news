import { IsString } from 'class-validator';

export class NewsGetByIdReqDto {
  @IsString()
  searchId: string;
}
