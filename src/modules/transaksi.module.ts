import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TransaksiPembayaranController } from '@app/Transaksi/transaksi.controller';
import { TransaksiPembayaranService } from '@app/Transaksi/transaksi.service';
import { TransaksiPembayaran } from '@entities/transaksi.entity';
import { ObatModule } from './obat.module';
import { TindakanMedisModule } from './tindakan.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([TransaksiPembayaran]),
    TindakanMedisModule,
    ObatModule,
  ],
  controllers: [TransaksiPembayaranController],
  providers: [TransaksiPembayaranService],
  exports: [TransaksiPembayaranService],
})
export class TransaksiModule {}
