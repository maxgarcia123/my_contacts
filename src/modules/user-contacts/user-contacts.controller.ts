import { Body, Controller, Delete, Get, HttpCode, Param, Post, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiParam, ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from '../user/dto/user.dto';
import { ApiModelProperty } from '@nestjs/swagger/dist/decorators/api-model-property.decorator';
import { UserContactsService } from './user-contacts.service';
import { CreateContactDto, SearchDto, ShowContactDto } from './dto/user-contact.dto';
import { JwtAuthGuard } from '../../config/auth/jwt-auth.guard';
import { ContactNumbersModels } from './models/contact-numbers.models';

@ApiTags('Contacts')
@Controller('user/contacts')
export class UserContactsController {
  constructor(private userContactsService: UserContactsService) {
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get()
  @HttpCode(200)
  getContacts(@Query('user_id') user_id: number) {
    return this.userContactsService.getContacts(user_id);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get('/group')
  @HttpCode(200)
  getContactsGroup(@Query('user_id') user_id: number, @Query('group_code') grope_code: number) {
    return this.userContactsService.getContactsByGroup(grope_code, user_id);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get('/info')
  @HttpCode(200)
  @ApiOkResponse({ type: ShowContactDto })
  getContactInfo(@Query('contact_id') contact_id: number) {
    return this.userContactsService.getContactInfo(contact_id);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Post('/search')
  @HttpCode(200)
  getComplementSearch(@Body() search: SearchDto) {
    return this.userContactsService.ComplementSearch(search);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Post()
  @HttpCode(200)
  @ApiOkResponse({ type: CreateContactDto })
  @ApiModelProperty({ type: [CreateContactDto] })
  create(@Body() newContact: CreateContactDto) {
    return this.userContactsService.createContact(newContact);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Delete(':contact_id')
  @HttpCode(200)
  @ApiParam({
    name: 'contact_id',
    type: Number
  })
  delete(
    @Param('contact_id') contact_id,
  ) {
    return this.userContactsService.delete(contact_id);
  }
}
