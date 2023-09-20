import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional } from 'class-validator';

export class CreatePoliDto {
  @ApiProperty()
  @IsString()
  @IsOptional()
  Nama_Poli: string;
}
