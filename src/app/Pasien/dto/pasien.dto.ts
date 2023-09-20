import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsNumber,
  IsNotEmpty,
  IsOptional,
  IsEnum,
} from 'class-validator';

export enum JenisKelamin {
  LAKI_LAKI = 'Laki-laki',
  PEREMPUAN = 'Perempuan',
}

export class CreatePasienDto {
  @ApiProperty()
  @IsString()
  @IsOptional()
  Nama: string;

  @ApiProperty()
  @IsNumber()
  @IsOptional()
  Usia: number;

  @ApiProperty()
  @IsString()
  @IsOptional()
  Alamat: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  Nomor_Telepon: string;

  @ApiProperty({ enum: JenisKelamin, enumName: 'JenisKelamin' })
  @IsNotEmpty()
  @IsEnum(JenisKelamin, { message: 'Jenis kelamin tidak valid' })
  Jenis_Kelamin: JenisKelamin;
}
