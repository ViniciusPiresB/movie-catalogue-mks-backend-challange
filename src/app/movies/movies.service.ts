import {
  BadRequestException,
  CACHE_MANAGER,
  HttpException,
  HttpStatus,
  Inject,
  Injectable
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Cache } from "cache-manager";
import { Repository } from "typeorm";
import { CreateMovieDto } from "./dto/create-movie.dto";
import { UpdateMovieDto } from "./dto/update-movie.dto";
import { Movie } from "./entities/movie.entity";

@Injectable()
export class MovieService {
  constructor(
    @InjectRepository(Movie)
    private movieRepository: Repository<Movie>,
    @Inject(CACHE_MANAGER)
    private readonly cacheManager: Cache
  ) {}

  async create(createMovieDto: CreateMovieDto) {
    try {
      const createdMovie = this.movieRepository.create(createMovieDto);

      await this.cacheManager.set(String(createdMovie.id), createdMovie);

      return this.movieRepository.save(createdMovie);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  findAll() {
    return this.movieRepository.find();
  }

  async findOne(id: number) {
    const cachedItem: Movie = await this.cacheManager.get(String(id));
    if (cachedItem) return cachedItem;

    const movie = await this.movieRepository.findOneBy({ id });

    if (!movie)
      throw new HttpException("Movie not found", HttpStatus.NO_CONTENT);

    return movie;
  }

  async update(id: number, updateMovieDto: UpdateMovieDto) {
    const movieToBeUpdated = await this.movieRepository.findOneBy({ id });

    if (!movieToBeUpdated)
      throw new BadRequestException({ error: "Movie not found" });

    await this.cacheManager.del(String(id));

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

    await this.cacheManager.del(String(id));

    return { message: `Movie deleted successfully!` };
  }
}
