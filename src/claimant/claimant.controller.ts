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
    return await this.claimantService.register({ name, email, password });
  }

  @Post('/login')
  async login(
    @Body() { email, password }: LoginDTO,
    @Res() response: Response,
  ) {
    const user = await this.claimantService.findByEmail(email);

    if (!user) {
      response.status(HttpStatus.NOT_FOUND).send();
    }

    if (user.password !== password) {
      response.status(HttpStatus.UNAUTHORIZED).send();
    }

    delete user.password;
    response.status(HttpStatus.OK).send({ ...user });
  }

  @Get('claimant/all')
  async all(): Promise<Claimant[]> {
    return await this.claimantService.findMany();
  }

  @Get('/claimant:id')
  async findById(
    @Param('id') id: string,
    @Body() { issues, messagesInIssues }: FindByIdDTO,
  ): Promise<Claimant> {
    return await this.claimantService.findById(id, issues, messagesInIssues);
  }
}
