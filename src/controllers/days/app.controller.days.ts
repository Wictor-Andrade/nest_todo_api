import { Controller, Get, Post, Param, Query, Body, Delete } from '@nestjs/common';
import { TasksPrismaRepository } from 'src/repositories/TasksPrismaRepository';
import { Task } from 'src/entities/Task';


@Controller('days')
export class AppControllerDays {
  constructor(
    private readonly prisma: TasksPrismaRepository
  ) { }

  // get area
  @Get()
  async getAllDays() {
    return this.prisma.findAllDays()
  }

  //delete area

  @Delete("/:id")
  async deleteDay(
    @Param('id') id: string,
  ) {
    return this.prisma.deleteDay(id);
  }

}
