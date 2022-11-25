import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsEmail } from "class-validator";

export class UserAuthenticateDto {
  @ApiProperty({
    title: "Email of user",
    type: String,
    description: "This is a required property"
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    title: "Password of user",
    type: String,
    description: "This is a required property"
  })
  @IsNotEmpty()
  password: string;
}
