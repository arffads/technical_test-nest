import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PoliController } from '@app/Poli/poli.controller';
import { PoliService } from '@app/Poli/poli.service';
import { Poli } from '@entities/poli.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Poli])],
  controllers: [PoliController],
  providers: [PoliService],
  exports: [PoliService],
})
export class PoliModule {}
