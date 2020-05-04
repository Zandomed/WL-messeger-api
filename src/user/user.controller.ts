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

@Controller('user')
export class UserController {
  constructor(private readonly _userService: UserService) {}

  @Post('/')
  // @UsePipes(new ValidationPipe())
  async createUser(
    @Req() req,
    @Res() res: Response,
    @Body() createUserDTO: CreateUserDTO,
  ) {
    // console.log(req.user);
    const user = await this._userService.createUser(createUserDTO);
    console.log(user);

    // delete user.password;
    if (user) {
      res.json({
        message: 'User Successfully Created',
        user,
      });
    } else {
      throw new InternalServerErrorException(
        'An error occurred while creating the user',
      );
    }
  }

  @Get('/')
  async getUsers(@Res() res: Response) {
    const products = await this._userService.getUsers();
    return res.status(HttpStatus.OK).json(products);
  }

  @Get('/:userID')
  async getUser(@Res() res: Response, @Param('userID') userID: string) {
    const user = await this._userService.getUserByID(userID);
    if (!user) throw new NotFoundException('User does not exist!');
    return res.status(HttpStatus.OK).json(user);
  }
}
