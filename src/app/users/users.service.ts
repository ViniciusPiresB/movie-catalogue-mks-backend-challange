import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { User } from "./entities/user.entity";

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>
  ) {}

  create(createUserDto: CreateUserDto) {
    console.log(createUserDto);
    const user = this.userRepository.create(createUserDto);
    return this.userRepository.save(user);
  }

  findAll() {
    return this.userRepository.find({
      select: ["id", "firstName", "lastName", "email"]
    });
  }

  async findOneByEmail(email: string) {
    const user = await this.userRepository.findOneByOrFail({ email });

    if (!user) throw new HttpException("User not found", HttpStatus.NO_CONTENT);

    return user;
  }

  async findOne(id: string) {
    const user = await this.userRepository.findOneByOrFail({ id });

    if (!user) throw new HttpException("User not found", HttpStatus.NO_CONTENT);

    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const user = await this.findOne(id);
    this.userRepository.merge(user, updateUserDto);
    return this.userRepository.save(user);
  }

  async remove(id: string) {
    const deleteResult = this.userRepository.delete({ id });

    if (!deleteResult["affected"])
      throw new BadRequestException({ error: "User not found" });
  }
}
