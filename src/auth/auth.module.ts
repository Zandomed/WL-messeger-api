import { Module, forwardRef } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { UserModule } from 'src/user/user.module';
import { AuthService } from './services/auth/auth.service';

@Module({
  controllers: [AuthController],
  imports: [forwardRef(() => UserModule)],
  providers: [AuthService],
})
export class AuthModule {}
