import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TindakanMedisController } from '@app/Tindakan/tindakan.controller';
import { TindakanService } from '@app/Tindakan/tindakan.service';
import { Tindakan } from '@entities/tindakan.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Tindakan])],
  controllers: [TindakanMedisController],
  providers: [TindakanService],
  exports: [TindakanService],
})
export class TindakanMedisModule {}
