import { Module } from '@nestjs/common';
import { DbModule } from '../db/db.module';
import { IssueService } from './issue.service';
import { IssueController } from './issue.controller';

@Module({
  providers: [IssueService],
  controllers: [IssueController],
  imports: [DbModule],
})
export class IssueModule {}
