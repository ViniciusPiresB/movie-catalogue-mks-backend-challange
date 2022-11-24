import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
  UseGuards
} from "@nestjs/common";
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiOkResponse,
  ApiTags,
  ApiUnprocessableEntityResponse
} from "@nestjs/swagger";
import { AuthGuard } from "@nestjs/passport";
import { UsersService } from "./users.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";

@ApiTags("Users")
@Controller("users")
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @ApiCreatedResponse({ description: "Created Successfully" })
  @ApiUnprocessableEntityResponse()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  @UseGuards(AuthGuard("jwt"))
  findAll() {
    return this.usersService.findAll();
  }

  @Get(":email")
  @UseGuards(AuthGuard("jwt"))
  @ApiOkResponse({ description: "List user by email" })
  @ApiNoContentResponse({ description: "No users with this email" })
  findOne(@Param("email") email: string) {
    return this.usersService.findOneByEmail(email);
  }

  @Patch(":id")
  @UseGuards(AuthGuard("jwt"))
  @ApiCreatedResponse({ description: "User updated successfully" })
  @ApiBadRequestResponse()
  update(@Param("id") id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(":id")
  @UseGuards(AuthGuard("jwt"))
  @ApiCreatedResponse({ description: "User deleted successfully" })
  @ApiBadRequestResponse()
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param("id") id: string) {
    return this.usersService.remove(id);
  }
}
