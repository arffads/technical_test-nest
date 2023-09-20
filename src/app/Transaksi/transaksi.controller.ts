import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
} from '@nestjs/common';
import { ApiTags, ApiBody } from '@nestjs/swagger';
import { TransaksiPembayaranService } from './transaksi.service';
import { TransaksiPembayaran } from '@entities/transaksi.entity';
import { TransaksiPembayaranDTO } from './dto/transaksi.dto';

@ApiTags('Transaksi Pembayaran')
@Controller('transaksi-pembayaran')
export class TransaksiPembayaranController {
  constructor(
    private readonly transaksiPembayaranService: TransaksiPembayaranService,
  ) {}

  @Get()
  findAll(): Promise<TransaksiPembayaran[]> {
    return this.transaksiPembayaranService.findAll();
  }

  @Get(':ID_Transaksi')
  findOne(
    @Param('ID_Transaksi') ID_Transaksi: number,
  ): Promise<TransaksiPembayaran> {
    return this.transaksiPembayaranService.findOne(ID_Transaksi);
  }

  @Post()
  @ApiBody({ type: TransaksiPembayaranDTO })
  create(
    @Body() transaksiPembayaranDTO: TransaksiPembayaranDTO,
  ): Promise<TransaksiPembayaran> {
    return this.transaksiPembayaranService.create(transaksiPembayaranDTO);
  }

  @Put(':ID_Transaksi')
  @ApiBody({ type: TransaksiPembayaranDTO })
  update(
    @Param('ID_Transaksi') ID_Transaksi: number,
    @Body() transaksiPembayaranDTO: TransaksiPembayaranDTO,
  ): Promise<TransaksiPembayaran> {
    return this.transaksiPembayaranService.update(
      ID_Transaksi,
      transaksiPembayaranDTO,
    );
  }

  @Delete(':ID_Transaksi')
  remove(@Param('ID_Transaksi') ID_Transaksi: number): Promise<void> {
    return this.transaksiPembayaranService.remove(ID_Transaksi);
  }
}
