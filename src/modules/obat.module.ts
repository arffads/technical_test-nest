import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ObatController } from '@app/Obat/obat.controller';
import { ObatService } from '@app/Obat/obat.service';
import { Obat } from '@entities/obat.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Obat])],
  controllers: [ObatController],
  providers: [ObatService],
  exports: [ObatService],
})
export class ObatModule {}
