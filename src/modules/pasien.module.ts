import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PasienController } from '@app/Pasien/pasien.controller';
import { PasienService } from '@app/Pasien/pasien.service';
import { Pasien } from '@entities/pasien.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Pasien])],
  controllers: [PasienController],
  providers: [PasienService],
  exports: [PasienService],
})
export class PasienModule {}
