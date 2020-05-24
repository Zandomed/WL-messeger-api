import { Module, forwardRef } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { UserModule } from 'src/user/user.module';
import { AuthService } from './services/auth/auth.service';
import { JwtModule } from '@nestjs/jwt';
@Module({
  controllers: [AuthController],
  imports: [
    JwtModule.register({
      secret: '1234567',
      signOptions: { expiresIn: '1d', },
    }),
    forwardRef(() => UserModule),
  ],
  providers: [AuthService],
})
export class AuthModule {}
