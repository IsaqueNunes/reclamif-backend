import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { MessageDTO } from './message.dto';
import { MessageService } from './message.service';
import { Message } from '@prisma/client';

@Controller('message')
export class MessageController {
  constructor(private messageService: MessageService) {}

  @Post()
  async newIssue(@Body() { claimantId, issueId, message }: MessageDTO) {
    return this.messageService.newMessage({ claimantId, issueId, message });
  }

  @Get('all')
  async list(): Promise<Message[]> {
    return await this.messageService.findAll();
  }

  @Get(':id')
  async findById(@Param('id') id: number): Promise<Message> {
    return await this.messageService.findById(+id);
  }
}
