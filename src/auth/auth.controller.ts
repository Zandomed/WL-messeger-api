import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  BadRequestException,
} from '@nestjs/common';
import { CreateUserDTO } from 'src/user/dto/create-user.dto';
import { UserService } from 'src/user/services/user.service';
import { removePassword } from 'src/user/helpers/remove-password';

@Controller('auth')
export class AuthController {
  constructor(private readonly _userService: UserService) {}

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
}
