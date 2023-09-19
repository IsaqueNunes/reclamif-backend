import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { IssueDTO } from './issue.dto';
import { IssueService } from './issue.service';
import { Issue } from '@prisma/client';

@Controller('issue')
export class IssueController {
  constructor(private issueService: IssueService) {}

  @Post()
  async newIssue(@Body() { claimantId, title, description }: IssueDTO) {
    return this.issueService.newIssue({ claimantId, title, description });
  }

  @Get('all')
  async list(): Promise<Issue[]> {
    return await this.issueService.findAll();
  }

  @Get(':id')
  async findById(@Param('id') id: number): Promise<Issue> {
    return await this.issueService.findById(+id);
  }
}
