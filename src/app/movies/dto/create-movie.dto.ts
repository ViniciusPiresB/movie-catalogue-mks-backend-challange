import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class CreateMovieDto {
  @ApiProperty({
    title: "Name of movie",
    type: String,
    description: "This is a required property"
  })
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    title: "Director of movie",
    type: String,
    description: "This is a required property"
  })
  @IsNotEmpty()
  director: string;

  @ApiProperty({
    title: "Release Date",
    type: Number,
    description: "This is a required property"
  })
  @IsNotEmpty()
  releaseDate: number;

  @ApiProperty({
    title: "Genre of movie",
    type: String,
    description: "This is a required property"
  })
  @IsNotEmpty()
  genre: string;
}
