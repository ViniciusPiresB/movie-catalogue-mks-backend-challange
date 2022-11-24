import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  UnprocessableEntityException
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
// import { getRedis, setRedis } from "src/config/redis";
import { Repository } from "typeorm";
import { CreateMovieDto } from "./dto/create-movie.dto";
import { UpdateMovieDto } from "./dto/update-movie.dto";
import { Movie } from "./entities/movie.entity";

@Injectable()
export class MovieService {
  constructor(
    @InjectRepository(Movie)
    private movieRepository: Repository<Movie>
  ) {}

  create(createMovieDto: CreateMovieDto) {
    const { name, director, releaseDate, genre } = createMovieDto;

    if (!name || !director || !releaseDate || !genre)
      throw new UnprocessableEntityException("Bad Request");

    const createdMovie = this.movieRepository.create(createMovieDto);

    return this.movieRepository.save(createdMovie);
  }

  findAll() {
    return this.movieRepository.find();
  }

  async findOne(id: number) {
    const movie = await this.movieRepository.findOneBy({ id });

    if (!movie)
      throw new HttpException("Movie not found", HttpStatus.NO_CONTENT);

    return movie;
  }

  async update(id: number, updateMovieDto: UpdateMovieDto) {
    const movieToBeUpdated = await this.movieRepository.findOneBy({ id });

    if (!movieToBeUpdated)
      throw new BadRequestException({ error: "Movie not found" });

    const updateResult = await this.movieRepository.update(
      { id },
      updateMovieDto
    );

    if (!updateResult["affected"])
      throw new BadRequestException({ error: "Something went wrong" });

    return { message: "Movie updated successfully" };
  }

  async remove(id: number) {
    const deleteResult = await this.movieRepository.delete({ id });

    if (!deleteResult["affected"])
      throw new BadRequestException({ error: "Movie not found" });

    return { message: `Movie deleted successfully!` };
  }
}
