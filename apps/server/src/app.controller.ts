import { Controller, Get, Query } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { IUser } from "@server/models/user.model";
import { Model } from "mongoose";

import { AppService } from "./app.service";

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    @InjectModel("User") private readonly userModel: Model<IUser>
  ) {}

  @Get("role")
  async getUserRole(@Query("email") email: string) {
    const user = await this.userModel.findOne({ email });
    if (!user) {
      return { success: false, message: "User not found" };
    }
    return { success: true, role: user.role };
  }
}
