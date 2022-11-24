import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
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
import { MovieService } from "./movies.service";
import { CreateMovieDto } from "./dto/create-movie.dto";
import { UpdateMovieDto } from "./dto/update-movie.dto";

@ApiTags("Movie")
@UseGuards(AuthGuard("jwt"))
@Controller("movie")
export class MovieController {
  constructor(private readonly movieService: MovieService) {}

  @Post()
  @ApiCreatedResponse({ description: "Created Successfully" })
  @ApiUnprocessableEntityResponse({ description: "Missing some fields" })
  create(@Body() createMovieDto: CreateMovieDto) {
    return this.movieService.create(createMovieDto);
  }

  @Get()
  @ApiOkResponse({ description: "List all movies in database" })
  findAll() {
    return this.movieService.findAll();
  }

  @Get(":id")
  @ApiOkResponse({ description: "List movie by id" })
  @ApiNoContentResponse({ description: "No movies with this id" })
  findOne(@Param("id") id: string) {
    return this.movieService.findOne(+id);
  }

  @Patch(":id")
  @ApiCreatedResponse({ description: "Movie updated successfully" })
  @ApiBadRequestResponse({ description: "Movie not found" })
  update(@Param("id") id: string, @Body() updateMovieDto: UpdateMovieDto) {
    return this.movieService.update(+id, updateMovieDto);
  }

  @Delete(":id")
  @ApiCreatedResponse({ description: "Movie deleted successfully" })
  @ApiBadRequestResponse({ description: "Movie not found" })
  remove(@Param("id") id: string) {
    return this.movieService.remove(+id);
  }
}
