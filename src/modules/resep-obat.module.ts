import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ResepController } from '@app/ResepObat/resep-obat.controller';
import { ResepService } from '@app/ResepObat/resep-obat.service';
import { Resep } from '@entities/resep-obat.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Resep])],
  controllers: [ResepController],
  providers: [ResepService],
  exports: [ResepService],
})
export class Resep_ObatModule {}
