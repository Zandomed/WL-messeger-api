import { IsAlpha, IsEmail, IsNotEmpty, IsString } from "class-validator";
export class CreateUserDTO {
  @IsNotEmpty({ context: { errorCode: 1001 } })
  @IsString({ context: { errorCode: 1002 } })
  @IsAlpha("es-ES", { context: { errorCode: 1003 } })
  readonly name: string;

  @IsNotEmpty({ context: { errorCode: 1004 } })
  @IsString({ context: { errorCode: 1005 } })
  @IsAlpha("es-ES", { context: { errorCode: 1006 } })
  readonly lastName: string;

  @IsNotEmpty({ context: { errorCode: 1007 } })
  @IsString({ context: { errorCode: 1008 } })
  readonly username: string;

  @IsNotEmpty({ context: { errorCode: 1009 } })
  @IsString({ context: { errorCode: 1010 } })
  @IsEmail({}, { context: { errorCode: 1011 } })
  readonly email: string;

  @IsNotEmpty({ context: { errorCode: 1012 } })
  @IsString({ context: { errorCode: 1013 } })
  readonly password: string;
}
