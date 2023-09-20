import { Module } from '@nestjs/common';
import {
  PasienModule,
  DokterModule,
  TindakanMedisModule,
  Resep_ObatModule,
  ObatModule,
  TransaksiModule,
  PoliModule,
} from '@modules/index';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './databases/index';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
    PoliModule,
    DokterModule,
    PasienModule,
    TindakanMedisModule,
    ObatModule,
    Resep_ObatModule,
    TransaksiModule,
    DatabaseModule,
  ],
})
export class AppModule {}
