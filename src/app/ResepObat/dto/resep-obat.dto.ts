import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, IsDate } from 'class-validator';

export class CreateResepDto {
  @ApiProperty()
  dokterId: number;

  @ApiProperty()
  pasienId: number;

  @ApiProperty()
  @IsString()
  @IsOptional()
  Detail_Resep: string;

  @ApiProperty()
  @IsDate()
  @IsOptional()
  Tanggal_Resep: Date;
}
