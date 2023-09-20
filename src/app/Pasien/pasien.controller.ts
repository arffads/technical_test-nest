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
import { CreatePasienDto } from './dto/pasien.dto';
import { Pasien } from '@entities/pasien.entity';
import { PasienService } from './pasien.service';

@Controller('pasien')
@ApiTags('Pasien')
export class PasienController {
  constructor(private readonly pasienService: PasienService) {}

  @Post()
  @ApiBody({ type: CreatePasienDto })
  async create(@Body() createPasienDto: CreatePasienDto): Promise<Pasien> {
    return this.pasienService.create(createPasienDto);
  }

  @Get()
  async findAll(): Promise<Pasien[]> {
    return this.pasienService.findAll();
  }

  @Get(':ID_Pasien')
  async findOne(@Param('ID_Pasien') ID_Pasien: number): Promise<Pasien> {
    return this.pasienService.findOne(ID_Pasien);
  }

  @Put(':ID_Pasien')
  @ApiBody({ type: CreatePasienDto })
  async update(
    @Param('ID_Pasien') ID_Pasien: number,
    @Body() updatePasienDto: CreatePasienDto,
  ): Promise<Pasien> {
    return this.pasienService.update(ID_Pasien, updatePasienDto);
  }

  @Delete(':ID_Pasien')
  async remove(@Param('ID_Pasien') ID_Pasien: number): Promise<void> {
    return this.pasienService.remove(ID_Pasien);
  }
}
