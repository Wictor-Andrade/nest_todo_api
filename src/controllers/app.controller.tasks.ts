import { Controller, Get, Post, Param, Query, Body, Patch, Delete } from '@nestjs/common';
import { TasksPrismaRepository } from 'src/repositories/TasksPrismaRepository';
import { Task } from 'src/entities/Task';
import { CreateTaskDTO } from 'src/dtos/entities.Task.createTaskDTO';
import { UpdateTaskDTO } from 'src/dtos/entities.Task.updateTaskDTO';
import { randomUUID } from 'crypto';


@Controller('tasks')
export class AppControllerTasks {
  constructor(
    private readonly prisma: TasksPrismaRepository
  ) { }

  //GET AREA

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

  //POST AREA

  @Post()
  async createTasks(@Body() body: CreateTaskDTO) {
    const dayId = await this.getDayIdByDate(body.day)


    return this.prisma.create({
      id: randomUUID(),
      description: body.description,
      completed: false,
      dayId: dayId ? dayId : (await this.prisma.createDay({ date: new Date(body.day) })).id
    })
  }

  //DELETE
  @Delete("/:id")
  async deleteTask(
    @Param('id') id: string,
  ) {
    return this.prisma.delete(id);
  }

  //PATCH
  @Patch("/:id")
  async updateTask(
    @Param('id') id: string,
    @Body() updateTaskDTO: UpdateTaskDTO
  ) {
    return this.prisma.update(id, updateTaskDTO);
  }
}
