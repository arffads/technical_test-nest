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
import { CreateResepDto } from './dto/resep-obat.dto';
import { Resep } from '@entities/resep-obat.entity';
import { ResepService } from './resep-obat.service';

@Controller('resep')
@ApiTags('Resep')
export class ResepController {
  constructor(private readonly resepService: ResepService) {}

  @Post()
  @ApiBody({ type: CreateResepDto })
  async create(@Body() createResepDto: CreateResepDto): Promise<Resep> {
    return this.resepService.create(createResepDto);
  }

  @Get()
  async findAll(): Promise<Resep[]> {
    return this.resepService.findAll();
  }

  @Get(':ID_Resep')
  async findOne(@Param('ID_Resep') ID_Resep: number): Promise<Resep> {
    return this.resepService.findOne(ID_Resep);
  }

  @Put(':ID_Resep')
  @ApiBody({ type: CreateResepDto })
  async update(
    @Param('ID_Resep') ID_Resep: number,
    @Body() updateResepDto: CreateResepDto,
  ): Promise<Resep> {
    return this.resepService.update(ID_Resep, updateResepDto);
  }

  @Delete(':ID_Resep')
  async remove(@Param('ID_Resep') ID_Resep: number): Promise<void> {
    return this.resepService.remove(ID_Resep);
  }
}
