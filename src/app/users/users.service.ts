import {
  BadRequestException,
  CACHE_MANAGER,
  Inject,
  Injectable
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Cache } from "cache-manager";
import { Repository } from "typeorm";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { User } from "./entities/user.entity";

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @Inject(CACHE_MANAGER)
    private readonly cacheManager: Cache
  ) {}

  async create(createUserDto: CreateUserDto) {
    const user = this.userRepository.create(createUserDto);

    await this.cacheManager.set(user.email, user);
    await this.cacheManager.set(user.id, user);

    return this.userRepository.save(user);
  }

  findAll() {
    return this.userRepository.find({
      select: ["id", "firstName", "lastName", "email"]
    });
  }

  async findOneByEmail(email: string) {
    const cachedUser: User = await this.cacheManager.get(email);
    if (cachedUser) return cachedUser;

    const user = await this.userRepository.findOneBy({ email });

    if (!user) throw new BadRequestException("User not found.");

    return user;
  }

  async findOne(id: string) {
    try {
      const cachedUser: User = await this.cacheManager.get(String(id));
      if (cachedUser) return cachedUser;

      const user = await this.userRepository.findOneByOrFail({ id });
      return user;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const user: User = await this.findOne(id);
    this.userRepository.merge(user, updateUserDto);

    await this.cacheManager.del(String(id));
    await this.cacheManager.del(user.email);

    return this.userRepository.save(user);
  }

  async remove(id: string) {
    const deleteResult = this.userRepository.delete({ id });

    await this.cacheManager.del(id);

    if (!deleteResult["affected"])
      throw new BadRequestException({ error: "User not found" });
  }
}
