import { Injectable } from '@nestjs/common';
import { PrismaService } from '../db/prisma.service';
import { RegisterClaimantDTO } from './dto/register.dto';
import { Claimant } from '@prisma/client';
import { hash } from 'bcrypt';

const messageSelect = {
  id: true,
  message: true,
  sendAt: true,
  editedAt: true,
  claimantId: true,
};

@Injectable()
export class ClaimantService {
  constructor(private prismaService: PrismaService) {}

  async register(claimant: RegisterClaimantDTO): Promise<void> {
    hash(claimant.password, 10, async (err, encrypted) => {
      await this.prismaService.claimant.create({
        data: { ...claimant, password: encrypted },
      });
    });
  }

  async findById(
    id: string,
    issues?: boolean,
    messagesInIssues?: boolean,
  ): Promise<Claimant> {
    return await this.prismaService.claimant.findUnique({
      where: { id },
      include: {
        Issue: issues
          ? {
              include: {
                Message: messagesInIssues
                  ? { select: { ...messageSelect } }
                  : false,
              },
            }
          : false,
      },
    });
  }

  async findByEmail(email: string): Promise<Claimant> {
    return await this.prismaService.claimant.findUnique({
      where: { email },
    });
  }

  async findMany(): Promise<Claimant[]> {
    return await this.prismaService.claimant.findMany();
  }
}
