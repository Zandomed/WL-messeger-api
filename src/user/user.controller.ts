import {
  Controller,
  Get,
  Res,
  Body,
  Req,
  Post,
  NotFoundException,
  InternalServerErrorException,
  HttpStatus,
  Param,
} from '@nestjs/common';
import { Response } from 'express';
import { UserService } from './services/user.service';
import { CreateUserDTO } from './dto/create-user.dto';
import { removePassword } from './helpers/remove-password';

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
}
