import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { MovieService } from "./movies.service";
import { MovieController } from "./movies.controller";
import { Movie } from "./entities/movie.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Movie])],
  controllers: [MovieController],
  providers: [MovieService]
})
export class MoviesModule {}
