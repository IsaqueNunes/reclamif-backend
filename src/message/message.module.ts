import { Module } from '@nestjs/common';
import { DbModule } from '../db/db.module';
import { MessageService } from './message.service';
import { MessageController } from './message.controller';

@Module({
  providers: [MessageService],
  controllers: [MessageController],
  imports: [DbModule],
})
export class MessageModule {}
