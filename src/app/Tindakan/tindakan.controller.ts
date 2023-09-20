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
import { CreateTindakanDto } from './dto/tindakan.dto';
import { Tindakan } from '@entities/tindakan.entity';
import { TindakanService } from './tindakan.service';

@Controller('tindakan-medis')
@ApiTags('Tindakan Medis')
export class TindakanMedisController {
  constructor(private readonly tindakanMedisService: TindakanService) {}

  @Post()
  @ApiBody({ type: CreateTindakanDto })
  async create(
    @Body() createTindakanMedisDto: CreateTindakanDto,
  ): Promise<Tindakan> {
    return this.tindakanMedisService.create(createTindakanMedisDto);
  }

  @Get()
  async findAll(): Promise<Tindakan[]> {
    return this.tindakanMedisService.findAll();
  }

  @Get(':ID_Tindakan')
  async findOne(@Param('ID_Tindakan') ID_Tindakan: number): Promise<Tindakan> {
    return this.tindakanMedisService.findOne(ID_Tindakan);
  }

  @Put(':ID_Tindakan')
  @ApiBody({ type: CreateTindakanDto })
  async update(
    @Param('ID_Tindakan') ID_Tindakan: number,
    @Body() updateTindakanMedisDto: CreateTindakanDto,
  ): Promise<Tindakan> {
    return this.tindakanMedisService.update(
      ID_Tindakan,
      updateTindakanMedisDto,
    );
  }

  @Delete(':ID_Tindakan')
  async remove(@Param('ID_Tindakan') ID_Tindakan: number): Promise<void> {
    return this.tindakanMedisService.remove(ID_Tindakan);
  }
}
