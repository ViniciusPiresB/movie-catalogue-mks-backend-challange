import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsEmail, Matches } from "class-validator";
import { messagesHelper } from "../../helper/message.helper";
import { regExHelper } from "../../helper/regex.helper";

export class CreateUserDto {
  @ApiProperty({
    title: "First name of User",
    type: String,
    description: "This is a required property"
  })
  @IsNotEmpty()
  firstName: string;

  @ApiProperty({
    title: "Last name of User",
    type: String,
    description: "This is a required property"
  })
  @IsNotEmpty()
  lastName: string;

  @ApiProperty({
    title: "Email of User",
    type: String,
    description: "This is a required property"
  })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({
    title: "Password of User",
    type: String,
    description: "This is a required property"
  })
  @IsNotEmpty()
  @Matches(regExHelper.password, { message: messagesHelper.PASSWORD_VALID })
  password: string;
}
