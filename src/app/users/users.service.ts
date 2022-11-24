import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { getRedis, setRedis } from "src/config/redis";
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
    const user = await this.userRepository.findOneBy({ email });

    if (!user) throw new BadRequestException("User not found.");

    setRedis(email, JSON.stringify(user));

    return user;
  }

  async findOne(id: string) {
    const cachedUser = JSON.parse(getRedis(id));
    if (cachedUser) return cachedUser;
    try {
      const user = await this.userRepository.findOneByOrFail({ id });

      setRedis(id, JSON.stringify(user));
      return user;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const user = await this.findOne(id);
    this.userRepository.merge(user, updateUserDto);
    setRedis(id, "");
    return this.userRepository.save(user);
  }

  async remove(id: string) {
    const deleteResult = this.userRepository.delete({ id });

    if (!deleteResult["affected"])
      throw new BadRequestException({ error: "User not found" });
  }
}
