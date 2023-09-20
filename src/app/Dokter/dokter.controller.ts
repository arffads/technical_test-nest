import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
} from '@nestjs/common';
import { ApiTags, ApiBody } from '@nestjs/swagger';
import { CreateDokterDto } from './dto/dokter.dto';
import { Dokter } from '@entities/dokter.entity';
import { DokterService } from './dokter.service';

@Controller('dokter')
@ApiTags('Dokter')
export class DokterController {
  constructor(private readonly dokterService: DokterService) {}

  @Post()
  @ApiBody({ type: CreateDokterDto })
  async create(@Body() createDokterDto: CreateDokterDto): Promise<Dokter> {
    return this.dokterService.create(createDokterDto);
  }

  @Get()
  async findAll(): Promise<Dokter[]> {
    return this.dokterService.findAll();
  }

  @Get(':ID_Dokter')
  async findOne(@Param('ID_Dokter') ID_Dokter: number): Promise<Dokter> {
    return this.dokterService.findOne(ID_Dokter);
  }

  @Put(':ID_Dokter')
  @ApiBody({ type: CreateDokterDto })
  async update(
    @Param('ID_Dokter') ID_Dokter: number,
    @Body() updateDokterDto: CreateDokterDto,
  ): Promise<Dokter> {
    return this.dokterService.update(ID_Dokter, updateDokterDto);
  }

  @Delete(':ID_Dokter')
  async remove(@Param('ID_Dokter') ID_Dokter: number): Promise<void> {
    return this.dokterService.remove(ID_Dokter);
  }
}
