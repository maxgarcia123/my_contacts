import { HttpModule, Module } from '@nestjs/common';
import { UserAddressService } from './user-address.service';
import { UserAddressController } from './user-address.controller';
import { userAddressProviders } from './user-address.provider';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [PassportModule, HttpModule],
  providers: [UserAddressService, ...userAddressProviders ],
  controllers: [UserAddressController]
})
export class UserAddressModule {}
