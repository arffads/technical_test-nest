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
import { CreatePoliDto } from './dto/poli.dto';
import { Poli } from '@entities/poli.entity';
import { PoliService } from './poli.service';

@Controller('poli')
@ApiTags('Poli')
export class PoliController {
  constructor(private readonly poliService: PoliService) {}

  @Post()
  @ApiBody({ type: CreatePoliDto })
  async create(@Body() createPoliDto: CreatePoliDto): Promise<Poli> {
    return this.poliService.create(createPoliDto);
  }

  @Get()
  async findAll(): Promise<Poli[]> {
    return this.poliService.findAll();
  }

  @Get(':ID_Poli')
  async findOne(@Param('ID_Poli') ID_Poli: number): Promise<Poli> {
    return this.poliService.findOne(ID_Poli);
  }

  @Put(':ID_Poli')
  @ApiBody({ type: CreatePoliDto })
  async update(
    @Param('ID_Poli') ID_Poli: number,
    @Body() updateDokterDto: CreatePoliDto,
  ): Promise<Poli> {
    return this.poliService.update(ID_Poli, updateDokterDto);
  }

  @Delete(':ID_Dokter')
  async remove(@Param('ID_Dokter') ID_Dokter: number): Promise<void> {
    return this.poliService.remove(ID_Dokter);
  }
}
