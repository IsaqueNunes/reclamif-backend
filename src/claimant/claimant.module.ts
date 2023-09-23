import { Module } from '@nestjs/common';
import { DbModule } from '../db/db.module';
import { ClaimantService } from './claimant.service';
import { ClaimantController } from './claimant.controller';

@Module({
  controllers: [ClaimantController],
  imports: [DbModule],
  providers: [ClaimantService],
  exports: [ClaimantService],
})
export class ClaimantModule {}
