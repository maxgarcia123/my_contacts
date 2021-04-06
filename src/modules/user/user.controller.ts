import {
  Body,
  Controller, Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { UserService } from './user.service';
import { ApiModelProperty } from '@nestjs/swagger/dist/decorators/api-model-property.decorator';
import { JwtAuthGuard } from '../../config/auth/jwt-auth.guard';
import { CreateUserDto, LoginUserDto, ShowUserDto } from './dto/user.dto';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get()
  @HttpCode(200)
  @ApiOkResponse({ type: ShowUserDto })
  getUser(@Query('email') email: string) {
    return this.userService.getUser(email);
  }

  @Get('login/')
  @HttpCode(200)
  @ApiOkResponse({ type: LoginUserDto })
  login(@Query('email') email: string, @Query('password') password: string) {
    return this.userService.login(email, password);
  }

  @Post()
  @HttpCode(200)
  @ApiOkResponse({ type: CreateUserDto })
  @ApiModelProperty({ type: CreateUserDto })
  create(@Body() newUser: CreateUserDto) {
    return this.userService.createUser(newUser);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Delete(':id')
  @HttpCode(200)
  @ApiParam({
    name: 'id',
    type: Number
  })
  delete(
    @Param('id') id,
  ) {
    return this.userService.delete(id);
  }

}
