import { Controller, Get, Post, Param, Query, Body } from '@nestjs/common';
import { TasksPrismaRepository } from 'src/repositories/TasksPrismaRepository';
import { Task } from 'src/entities/Task';


@Controller('days')
export class AppControllerDays {
  constructor(
    private readonly prisma: TasksPrismaRepository
  ) { }

  @Get()
  async getAllTasks() {
    return this.prisma.findAllDays()
  }

}
