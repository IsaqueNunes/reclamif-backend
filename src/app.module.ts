import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClaimantModule } from './claimant/claimant.module';
import { IssueModule } from './issue/issue.module';
import { MessageModule } from './message/message.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [ClaimantModule, IssueModule, MessageModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
