import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsDate, IsOptional } from 'class-validator';

export class TransaksiPembayaranDTO {
  @ApiProperty()
  tindakanId?: number;

  @ApiProperty()
  resepId?: number;

  @ApiProperty()
  obatId?: number;

  @ApiProperty()
  quantity_obat?: number;

  @ApiProperty()
  @IsDate()
  @IsOptional()
  Tanggal_Transaksi: Date;

  @ApiProperty()
  @IsNumber()
  @IsOptional()
  Total_Tagihan: number;
}
