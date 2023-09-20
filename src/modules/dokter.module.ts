import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DokterController } from '@app/Dokter/dokter.controller';
import { DokterService } from '@app/Dokter/dokter.service';
import { Dokter } from '@entities/dokter.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Dokter])],
  controllers: [DokterController],
  providers: [DokterService],
  exports: [DokterService],
})
export class DokterModule {}
