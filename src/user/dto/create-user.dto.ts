import { IsAlpha, IsEmail, IsNotEmpty, IsString, Contains } from 'class-validator';
export class CreateUserDTO {
  @IsNotEmpty({ context: { errorCode: "frm-101" } })
  @IsString({ context: { errorCode: "frm-102" } })
  @IsAlpha('es-ES', { context: { errorCode: "frm-103" } })
  readonly name: string;

  @IsNotEmpty({ context: { errorCode: "frm-201" } })
  @IsString({ context: { errorCode: "frm-202" } })
  @IsAlpha('es-ES', { context: { errorCode: "frm-203" } })
  readonly lastName: string;

  @IsNotEmpty({ context: { errorCode: "frm-301" } })
  @IsString({ context: { errorCode: "frm-302" } })
  /* Exist email (errorCode) frm-303 */
  
  readonly username: string;

  @IsNotEmpty({ context: { errorCode: "frm-401" } })
  @IsString({ context: { errorCode: "frm-402" } })
  @IsEmail({}, { context: { errorCode: "frm-403" } })
  /* Exist email (errorCode) frm-404 */
  readonly email: string;

  @IsNotEmpty({ context: { errorCode: "frm-501" } })
  @IsString({ context: { errorCode: "frm-502" } })
  readonly password: string;

  @IsNotEmpty({ context: { errorCode: "frm-601" } })
  @IsString({ context: { errorCode: "frm-602" } })
  readonly birthday: string;

  @IsNotEmpty({ context: { errorCode: "frm-701" } })
  @IsString({ context: { errorCode: "frm-702" } })
  readonly country: string;

  @IsNotEmpty({ context: { errorCode: "frm-801" } })
  @IsString({ context: { errorCode: "frm-802" } })
  readonly gender: string;
}
