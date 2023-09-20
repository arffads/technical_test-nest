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
import { CreateObatDto } from './dto/obat.dto';
import { Obat } from '@entities/obat.entity';
import { ObatService } from './obat.service';

@Controller('obat')
@ApiTags('Obat')
export class ObatController {
  constructor(private readonly obatService: ObatService) {}

  @Post()
  @ApiBody({ type: CreateObatDto })
  async create(@Body() createObatDto: CreateObatDto): Promise<Obat> {
    return this.obatService.create(createObatDto);
  }

  @Get()
  async findAll(): Promise<Obat[]> {
    return this.obatService.findAll();
  }

  @Get(':ID_Obat')
  async findOne(@Param('ID_Obat') ID_Obat: number): Promise<Obat> {
    return this.obatService.findOne(ID_Obat);
  }

  @Put(':ID_Obat')
  @ApiBody({ type: CreateObatDto })
  async update(
    @Param('ID_Obat') ID_Obat: number,
    @Body() updateObatDto: CreateObatDto,
  ): Promise<Obat> {
    return this.obatService.update(ID_Obat, updateObatDto);
  }

  @Delete(':ID_Obat')
  async remove(@Param('ID_Obat') ID_Obat: number): Promise<void> {
    return this.obatService.remove(ID_Obat);
  }
}
