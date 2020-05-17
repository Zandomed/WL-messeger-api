import { Body, Controller, Get, NotFoundException, Param, Post } from '@nestjs/common';
import { CreateUserDTO } from './dto/create-user.dto';
import { isExistEmailDTO } from './dto/is-exist-email.dto';
import { isExistUsernameDTO } from './dto/is-exist-username.dto';
import { removePassword } from './helpers/remove-password';
import { UserService } from './services/user.service';

@Controller('users')
export class UserController {
  constructor(private readonly _userService: UserService) {}

  @Get('/')
  public async getUsers() {
    const users = await this._userService.findAll();
    console.log(users);
    return users;
  }

  @Get('/:id')
  public async getUser(@Param('id') _id: string) {
    const user = await this._userService.findByID(_id);
    if (!user) throw new NotFoundException(`Not found user by ID: ${_id}`);
    return user;
  }

  @Post('/')
  public async createUser(@Body() createUserDTO: CreateUserDTO) {
    return removePassword(await this._userService.create(createUserDTO));
  }

  @Post('/validate/email')
  public async isExistEmail(@Body() data: isExistEmailDTO) {
    const isExist = await this._userService.isExistEmail(data.email);
    return { isExist };
  }

  @Post('/validate/username')
  public async isExistUsername(@Body() data: isExistUsernameDTO) {
    const isExist = await this._userService.isExistUsername(data.username);
    return { isExist };
  }
}
