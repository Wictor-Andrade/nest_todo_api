import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient, Task, Day } from '@prisma/client';
import { IRepository } from './IRepository';

@Injectable()
export class TasksPrismaRepository extends PrismaClient implements OnModuleInit, IRepository<Task> {

    async onModuleInit() {
        await this.$connect();
    }

    async findAll(): Promise<Task[]> {
        return this.task.findMany();
    }
    async findAllByDay(dayId: string): Promise<Task[]> {
        return this.task.findMany({ where: { dayId: dayId } })
    }

    async findOne(id: string): Promise<Task | null> {
        return this.task.findUnique({ where: { id } });
    }

    async create(data: Task): Promise<Task> {
        return this.task.create({ data });
    }

    async update(id: string, data: Partial<Task>): Promise<Task> {
        return this.task.update({ where: { id }, data });
    }

    async delete(id: string): Promise<Task> {
        return this.task.delete({ where: { id } });
    }

    async findAllDays(): Promise<Day[]> {
        return this.day.findMany();
    }

    async findDay(id: string): Promise<Day | null> {
        return this.day.findUnique({ where: { id } });
    }

    async findDayByDate(date: Date): Promise<Day | null> {
        const startOfDay = new Date(date);
        startOfDay.setHours(0, 0, 0, 0);

        const endOfDay = new Date(date);
        endOfDay.setHours(23, 59, 59, 999);


        const startUTC = new Date(Date.UTC(startOfDay.getFullYear(), startOfDay.getMonth(), startOfDay.getDate()));
        const endUTC = new Date(Date.UTC(endOfDay.getFullYear(), endOfDay.getMonth(), endOfDay.getDate(), 23, 59, 59, 999));

        return this.day.findFirst({
            where: {
                date: {
                    gte: startUTC,
                    lte: endUTC,
                },
            },
        });
    }

    async createDay(data: { date: Date }): Promise<Day> {

        const formattedDate = new Date(data.date.setHours(0, 0, 0, 0));
        return this.day.create({
            data: {
                date: formattedDate,
            },
        });
    }

    async deleteDay(id: string): Promise<Day> {
        return this.day.delete({ where: { id } });
    }
}
