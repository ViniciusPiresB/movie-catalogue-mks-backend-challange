import { Controller, Post, Req, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import {
  ApiCreatedResponse,
  ApiParam,
  ApiTags,
  ApiUnauthorizedResponse
} from "@nestjs/swagger";
import { AuthService } from "./auth.service";

@ApiTags("Authentication")
@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(AuthGuard("local"))
  @ApiParam({ name: "email", description: "E-mail to login on system." })
  @ApiParam({ name: "password", description: "Password of email inserted" })
  @ApiCreatedResponse({ description: "Logged successfully" })
  @ApiUnauthorizedResponse({ description: "Invalid email or password" })
  @Post("login")
  async login(@Req() req: any) {
    return this.authService.login(req.user);
  }
}
