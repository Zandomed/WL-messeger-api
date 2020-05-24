import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  BadRequestException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { CreateUserDTO } from 'src/user/dto/create-user.dto';
import { UserService } from 'src/user/services/user.service';
import { removePassword } from 'src/user/helpers/remove-password';
import { LoginDataDTO } from './dto/login-data.dto';
import { AuthService } from './services/auth/auth.service';
import { isExistEmailDTO } from 'src/user/dto/is-exist-email.dto';
import { isExistUsernameDTO } from 'src/user/dto/is-exist-username.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly _userService: UserService,
    private readonly _authService: AuthService,
  ) {}

  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  public async register(@Body() createUserDTO: CreateUserDTO) {
    const isExistEmail = await this._userService.isExistEmail(
      createUserDTO.email,
    );

    const isExistUsername = await this._userService.isExistUsername(
      createUserDTO.username,
    );
    if (isExistEmail)
      throw new BadRequestException({
        message: 'This email already exists',
        errorCode: 'frm-404',
      });

    if (isExistUsername)
      throw new BadRequestException({
        message: 'This username already exists',
        errorCode: 'frm-303',
      });

    return removePassword(await this._userService.create(createUserDTO));
  }

  @Post('/login')
  public async loginWithCredentials(
    @Body() { emailOrUsername, password }: LoginDataDTO,
  ) {
    const isExistEmail = await this._userService.isExistEmail(emailOrUsername);

    const isExistUsername = await this._userService.isExistUsername(
      emailOrUsername,
    );

    if (!isExistEmail && !isExistUsername) {
      throw new UnprocessableEntityException({
        message: 'This credentials not exists',
        errorCode: 'lgnacctn-101',
      });
    }

    const user = await this._authService.loginWithCredentials(
      emailOrUsername,
      password,
    );
    if (!user)
      throw new UnprocessableEntityException({
        message: 'this email/password is invalid',
        errorCode: 'lgnacctn-102',
      });

    return removePassword(user);
  }
}
