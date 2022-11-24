import { IsNotEmpty, IsEmail, Matches } from "class-validator";
import { messagesHelper } from "../../helper/message.helper";
import { regExHelper } from "../../helper/regex.helper";

export class CreateUserDto {
  @IsNotEmpty()
  firstName: string;

  @IsNotEmpty()
  lastName: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @Matches(regExHelper.password, { message: messagesHelper.PASSWORD_VALID })
  password: string;
}
