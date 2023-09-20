import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, IsOptional } from 'class-validator';

export class CreateObatDto {
  @ApiProperty()
  @IsString()
  @IsOptional()
  Nama_Obat: string;

  @ApiProperty()
  @IsNumber()
  @IsOptional()
  Jumlah_Stok: number;

  @ApiProperty()
  @IsNumber()
  @IsOptional()
  Harga: number;

  @ApiProperty()
  @IsString()
  @IsOptional()
  Deskripsi: string;
}
