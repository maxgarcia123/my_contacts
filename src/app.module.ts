import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './modules/user/user.module';
import { DatabaseModule } from './config/database/database.module';
import { UserAddressModule } from './modules/user-address/user-address.module';
import { UserContactsModule } from './modules/user-contacts/user-contacts.module';

@Module({
  imports: [ConfigModule.forRoot(), UserModule, DatabaseModule, UserAddressModule, UserContactsModule ],
})
export class AppModule {}
