import { Controller, Get, Query } from '@nestjs/common';
import { AppService } from './app.service';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IUser } from '@server/models/user.model';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    @InjectModel('User') private readonly userModel: Model<IUser>,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('role')
  async getUserRole(@Query('email') email: string) {
    const user = await this.userModel.findOne({ email });
    if (!user) {
      return { success: false, message: 'User not found' };
    }
    return { success: true, role: user.role };
  }
}
