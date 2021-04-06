import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { USER_ADDRESS_REPOSITORY, USER_REPOSITORY } from '../../utils/constants';
import { UserModel } from './user.models';
import { CreateUserDto, LoginUserDto, ShowUserDto } from './dto/user.dto';
import { genSalt, hash, compare } from 'bcrypt';
import { sign } from 'jsonwebtoken';
import { JwtPayload } from '../../config/auth/jwt-payload.model';
import { UserAddressService } from '../user-address/user-address.service';

@Injectable()
export class UserService {
  private readonly jwtPrivateKey: string;

  constructor(
    @Inject(USER_REPOSITORY)
    private userRepository: typeof UserModel,
    private userAddressService: UserAddressService,
  ) {
    this.jwtPrivateKey =
      '316D96A1D5436DD77E9184EE3E3789DC76585AAF479B3025385BB3D7E63176B7';
  }

  async signToken(email: string) {
    const payload: JwtPayload = {
      email: email,
    };
    return sign(payload, this.jwtPrivateKey);
  }

  async login(email: string, password: string) {
    const user = await this.getByEmail(email);

    if(!user || user.status === false){
      throw new NotFoundException();
    }
    const isMatch = await compare(password, user.password);
    if (!isMatch) {
      throw new BadRequestException();
    }
      const token = await  this.signToken(user.email);

    return new LoginUserDto(user, token);
  }

  async getByEmail(email: string) {
    return await this.userRepository.findOne({ where: { email} });
  }

  async getUser(email) {
    const user = await this.userRepository.findOne({ where: { email, status: true } });

    if (!user) {
      throw new NotFoundException();
    }

    user.addresses  = await this.userAddressService.getUserAddresses(user.id)



    return new ShowUserDto(user);
  }

  async createUser(createUser: CreateUserDto) {
    const emailExist = await this.getByEmail(createUser.email);

    if(emailExist?.email){
      throw new BadRequestException({ error: 'email já cadastrado!!' })
    }
    const newUser = createUser;
    const salt = await genSalt(5);
    newUser.password = await hash(createUser.password, salt);
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore

    return await this.userRepository.create(newUser);
  }

  async delete(id: number){
    const user = await this.userRepository.findOne({where:{id}})
    if (!user) {
      throw  new NotFoundException()
    }
    user.status = false;
    try {
      await user.save();
      return  user
    } catch (err) {
      throw new BadRequestException(err)
    }
  }
}
