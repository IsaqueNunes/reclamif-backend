import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Post,
  Res,
} from '@nestjs/common';
import { RegisterClaimantDTO } from './dto/register.dto';
import { ClaimantService } from './claimant.service';
import { Claimant } from '@prisma/client';
import { FindByIdDTO } from './dto/findbyid.dto';
import { LoginDTO } from './dto/login.dto';
import { Response } from 'express';

type ClaimantResponse = Omit<Claimant, 'password'>;

@Controller()
export class ClaimantController {
  constructor(private claimantService: ClaimantService) {}

  @Post('/register')
  async register(@Body() { name, email, password }: RegisterClaimantDTO) {
      // TODO verify if email already exists
    return await this.claimantService.register({ name, email, password });
  }

  @Get('/claimant/:id')
  async findById(
    @Param('id') id: string,
    @Body() { issues, messagesInIssues }: FindByIdDTO,
  ): Promise<Claimant> {
    return await this.claimantService.findById(id, issues, messagesInIssues);
  }

  @Get('claimant/all')
  async all(): Promise<Claimant[]> {
    return await this.claimantService.findMany();
  }
}
