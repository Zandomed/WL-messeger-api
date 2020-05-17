import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { CreateUserDTO } from 'src/user/dto/create-user.dto';
import { UserService } from 'src/user/services/user.service';
import { removePassword } from 'src/user/helpers/remove-password';

@Controller('auth')
export class AuthController {
  constructor(private readonly _userService: UserService) {}

  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  public async register(@Body() createUserDTO: CreateUserDTO) {
    return removePassword(await this._userService.create(createUserDTO));
  }
}
