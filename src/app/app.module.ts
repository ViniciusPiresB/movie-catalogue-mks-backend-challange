import { Module } from "@nestjs/common";
import { UsersModule } from "./users/users.module";
import { MoviesModule } from "./movies/movies.module";
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [UsersModule, MoviesModule, AuthModule],
  controllers: [],
  providers: []
})
export class AppModule {}
