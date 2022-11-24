import { Test, TestingModule } from "@nestjs/testing";
import { UsersService } from "../users/users.service";
import { CreateMovieDto } from "./dto/create-movie.dto";
import { UpdateMovieDto } from "./dto/update-movie.dto";
import { MovieController } from "./movies.controller";
import { MovieService } from "./movies.service";

const mockMovieService = {
  create: jest.fn((dto) => {
    return {
      id: Date.now(),
      ...dto
    };
  }),
  update: jest.fn().mockImplementation((id, dto) => ({
    id,
    ...dto
  }))
};

describe("MoviesController", () => {
  let controller: MovieController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MovieController],
      providers: [MovieService]
    })
      .overrideProvider(MovieService)
      .useValue(mockMovieService)
      .compile();

    controller = module.get<MovieController>(MovieController);
  });

  it("Should be defined", () => {
    expect(controller).toBeDefined();
  });

  it("Should create a movie successfully", () => {
    const movieToBeCreated: CreateMovieDto = {
      name: "Movie Name Test",
      director: "John Doe",
      releaseDate: 2000,
      genre: "action"
    };

    const result = controller.create(movieToBeCreated);

    expect(result).toEqual({
      id: expect.any(Number),
      name: movieToBeCreated.name,
      director: movieToBeCreated.director,
      releaseDate: movieToBeCreated.releaseDate,
      genre: movieToBeCreated.genre
    });
    expect(typeof result).toBe("object");
    expect(mockMovieService.create).toHaveBeenCalledWith(movieToBeCreated);
    expect(mockMovieService.create).toHaveBeenCalledTimes(1);
  });

  it("Should update a movie", () => {
    const dto: UpdateMovieDto = {
      name: "Movie Name Test",
      director: "John Doe",
      releaseDate: 2000,
      genre: "action"
    };

    const updatedMovie = controller.update("1", dto);

    expect(typeof updatedMovie).toBe("object");
    expect(mockMovieService.update).toHaveBeenCalledTimes(1);
    expect(updatedMovie).toEqual({
      id: 1,
      ...dto
    });
  });
});
