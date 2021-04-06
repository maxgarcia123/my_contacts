import { HttpModule, Module } from '@nestjs/common';
import { UserContactsController } from './user-contacts.controller';
import { UserContactsService } from './user-contacts.service';
import { userContactsProviders } from './user-contacts.provider';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [PassportModule, HttpModule],
  controllers: [UserContactsController],
  providers: [UserContactsService, ...userContactsProviders]
})
export class UserContactsModule {}
