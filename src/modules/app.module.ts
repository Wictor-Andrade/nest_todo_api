import { Module } from '@nestjs/common';
import { AppControllerTasks } from '../controllers/app.controller.tasks';
import { AppService } from '../services/app.service';
import { TasksPrismaRepository } from 'src/repositories/TasksPrismaRepository';
import { AppControllerDays } from 'src/controllers/days/app.controller.days';

@Module({
  imports: [],
  controllers: [AppControllerTasks, AppControllerDays],
  providers: [AppService, TasksPrismaRepository],
})
export class AppModule { }
