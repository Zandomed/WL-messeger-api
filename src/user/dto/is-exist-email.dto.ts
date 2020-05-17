import { IsNotEmpty, IsString, IsEmail } from 'class-validator';

export class isExistEmailDTO {
  @IsNotEmpty({ context: { errorCode: 'frm-401' } })
  @IsString({ context: { errorCode: 'frm-402' } })
  //   @IsEmail({}, { context: { errorCode: 'frm-403' } })
  /* Exist email (errorCode) frm-404 */
  readonly email: string;
}
