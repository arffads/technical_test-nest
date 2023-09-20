import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Dokter } from '@entities/dokter.entity';
import { Tindakan } from '@entities/tindakan.entity';
import { Pasien } from '@entities/pasien.entity';
import { Obat } from '@entities/obat.entity';
import { Resep } from '@entities/resep-obat.entity';
import { TransaksiPembayaran } from '@entities/transaksi.entity';
import { Poli } from '@entities/poli.entity';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async () => ({
        type: 'postgres',
        host: process.env.PGHOST || process.env.DB_HOST,
        port: parseInt(process.env.PGPORT || process.env.DB_PORT),
        username: process.env.PGUSER || process.env.DB_USERNAME,
        password: process.env.PGPASSWORD || process.env.DB_PASSWORD,
        database: process.env.PGDATABASE || process.env.DB_DATABASE,
        url: process.env.DATABASE_URL,
        entities: [
          Dokter,
          Tindakan,
          Obat,
          TransaksiPembayaran,
          Pasien,
          Resep,
          Poli,
        ],
        synchronize: true,
      }),
    }),
  ],
})
export class DatabaseModule {}
