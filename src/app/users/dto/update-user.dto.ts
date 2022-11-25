import { IsNotEmpty } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class UpdateUserDto {
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
}
