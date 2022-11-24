import { ApiProperty } from "@nestjs/swagger";

export class CreateMovieDto {
  @ApiProperty({
    title: "Name of movie",
    type: String,
    description: "This is a required property"
  })
  name: string;

  @ApiProperty({
    title: "Director of movie",
    type: String,
    description: "This is a required property"
  })
  director: string;

  @ApiProperty({
    title: "Release Date",
    type: Number,
    description: "This is a required property"
  })
  releaseDate: number;

  @ApiProperty({
    title: "Genre of movie",
    type: String,
    description: "This is a required property"
  })
  genre: string;
}
