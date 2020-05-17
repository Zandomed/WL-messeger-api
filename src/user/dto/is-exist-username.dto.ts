import { IsNotEmpty, IsString, IsEmail } from 'class-validator';

export class isExistUsernameDTO {
  @IsNotEmpty({ context: { errorCode: 'frm-301' } })
  @IsString({ context: { errorCode: 'frm-302' } })
  /* Exist email (errorCode) frm-303 */
  readonly username: string;
}
