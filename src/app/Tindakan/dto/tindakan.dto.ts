import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, IsOptional } from 'class-validator';

export class CreateTindakanDto {
  @ApiProperty()
  @IsString()
  @IsOptional()
  Nama_Tindakan: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  Deskripsi: string;

  @ApiProperty()
  @IsNumber()
  @IsOptional()
  Biaya: number;

  @ApiProperty()
  dokterId: number;

  @ApiProperty()
  pasienId: number;
}
