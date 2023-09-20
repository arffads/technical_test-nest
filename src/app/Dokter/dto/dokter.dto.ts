import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional } from 'class-validator';

export class CreateDokterDto {
  @ApiProperty()
  @IsString()
  @IsOptional()
  Nama_Dokter: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  Nomor_Telepon: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  Spesialisasi: string;

  @ApiProperty()
  @IsOptional()
  poliId: number;
}
