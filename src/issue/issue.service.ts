import { Injectable } from '@nestjs/common';
import { PrismaService } from '../db/prisma.service';
import { IssueDTO } from './issue.dto';
import { Issue } from '@prisma/client';

const messageSelect = {
  id: true,
  message: true,
  sendAt: true,
  editedAt: true,
  claimantId: true,
};

@Injectable()
export class IssueService {
  constructor(private prismaService: PrismaService) {}

  async newIssue(issue: IssueDTO) {
    await this.prismaService.issue.create({
      data: {
        ...issue,
        createdAt: new Date(),
      },
    });
  }

  async findAll(): Promise<Issue[]> {
    return await this.prismaService.issue.findMany({
      include: {
        Message: {
          select: { ...messageSelect },
        },
      },
    });
  }

  async findById(id: number): Promise<Issue> {
    return await this.prismaService.issue.findUnique({
      where: { id },
      include: {
        Message: {
          select: { ...messageSelect },
        },
      },
    });
  }
}
