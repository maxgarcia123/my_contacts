import { HttpModule, Module } from '@nestjs/common';
import { JwtStrategy } from '../../config/auth/jwt-strategy';
import { userProviders } from './user.provider';
import { PassportModule } from '@nestjs/passport';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { UserAddressService } from '../user-address/user-address.service';

@Module({
  imports: [PassportModule, HttpModule],
  providers: [UserService, ...userProviders, JwtStrategy, UserAddressService],
  controllers: [UserController],
})
export class UserModule {}
