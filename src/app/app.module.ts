import { CacheModule, Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ConfigModule } from "@nestjs/config";
import { Movie } from "./movies/entities/movie.entity";
import { MoviesModule } from "./movies/movies.module";
import { UsersModule } from "./users/users.module";
import { AuthModule } from "./auth/auth.module";

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: "postgres",
      url: process.env.DATABASE_URL,
      autoLoadEntities: true,
      entities: [Movie]
    }),
    CacheModule.register({ isGlobal: true }),
    MoviesModule,
    UsersModule,
    AuthModule
  ],
  controllers: [],
  providers: []
})
export class AppModule {}
