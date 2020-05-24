import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/services/user.service';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcrypt';
import { User } from 'src/user/interfaces/user.interface';

@Injectable()
export class AuthService {
  constructor(
    private readonly _userService: UserService,
    private readonly _jwtService: JwtService,
  ) {}

  /**
   * @name loginWithCredentials
   * @param {string} emailOrUsername
   * @param {string} password
   */
  public async loginWithCredentials(
    emailOrUsername: string,
    password: string,
  ): Promise<User> {
    const user = await this._userService.findOne({
      $or: [{ username: emailOrUsername }, { email: emailOrUsername }],
    });

    // console.log(user);

    const isPasswordValid = await compare(password, user.password);

    if (isPasswordValid) {
      const access_token = this.singJWT(user._id, user.email);
    //   user.overwrite({ access_token });
    }

    // console.log(user);
    return isPasswordValid ? user : null;

    // return this._jwtService.sign({ emailOrUsername, password });
  }

  /**
   * loginWithToken
   */
  public loginWithToken(beareToken: string) {}

  private singJWT(_id: string, email: string) {
    return this._jwtService.sign({ _id, email });
  }
}
