import { Injectable } from '@nestjs/common';
import { PrismaService } from '../db/prisma.service';
import { MessageDTO } from './message.dto';
import { Message } from '@prisma/client';

@Injectable()
export class MessageService {
  constructor(private prismaService: PrismaService) {}

  async newMessage(message: MessageDTO) {
    await this.prismaService.message.create({
      data: {
        ...message,
        sendAt: new Date(),
      },
    });
  }

  async findById(id: number): Promise<Message> {
    return await this.prismaService.message.findUnique({ where: { id } });
  }

  async findAll(): Promise<Message[]> {
    return await this.prismaService.message.findMany();
  }

  async findManyByIssueId(issueId: number): Promise<Message[]> {
    return await this.prismaService.message.findMany({
      where: {
        issueId,
      },
    });
  }

  async findManyByClaimantId(claimantId: string): Promise<Message[]> {
    return await this.prismaService.message.findMany({
      where: {
        claimantId,
      },
    });
  }
}
