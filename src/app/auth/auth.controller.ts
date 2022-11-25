import { Body, Controller, Post, Req, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import {
  ApiCreatedResponse,
  ApiHideProperty,
  ApiParam,
  ApiQuery,
  ApiTags,
  ApiUnauthorizedResponse
} from "@nestjs/swagger";
import { AuthService } from "./auth.service";
import { UserAuthenticateDto } from "./dto/user-authenticate.dto";

@ApiTags("Authentication")
@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(AuthGuard("local"))
  @ApiCreatedResponse({ description: "Logged successfully" })
  @ApiUnauthorizedResponse({ description: "Invalid email or password" })
  @Post("login")
  async login(@Req() req: any, @Body() user: UserAuthenticateDto) {
    console.log(req);
    return this.authService.login(req.user);
  }
}
