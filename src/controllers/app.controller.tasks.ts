import { Controller, Get, Post, Param, Query, Body } from '@nestjs/common';
import { TasksPrismaRepository } from 'src/repositories/TasksPrismaRepository';
import { Task } from 'src/entities/Task';


@Controller('tasks')
export class AppControllerTasks {
  constructor(
    private readonly prisma: TasksPrismaRepository
  ) { }

  @Get()
  async getAllTasks() {
    return this.prisma.findAll();
  }

  @Get('/day/')
  async getTasksByDay(@Query('dayParam') dayParam: string): Promise<Task[]> {
    if (!dayParam || dayParam.length !== 8) {
      return [];
    }
    const year = parseInt(dayParam.substring(0, 4), 10);
    const month = parseInt(dayParam.substring(4, 6), 10) - 1; // Mês é baseado em zero
    const day = parseInt(dayParam.substring(6, 8), 10);
    const date = new Date(year, month, day);

    const dayId = await this.getDayIdByDate(date);
    if (!dayId) {
      return [];
    }

    return this.prisma.findAllByDay(dayId);
  }

  private async getDayIdByDate(date: Date): Promise<string | null> {
    const day = await this.prisma.findDayByDate(date);
    return day ? day.id : null;
  }
}
