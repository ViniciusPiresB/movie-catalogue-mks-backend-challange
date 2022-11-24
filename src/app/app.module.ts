import { Module } from "@nestjs/common";
import { UsersModule } from "./users/users.module";
import { MoviesModule } from "./movies/movies.module";

@Module({
  imports: [UsersModule, MoviesModule],
  controllers: [],
  providers: []
})
export class AppModule {}
