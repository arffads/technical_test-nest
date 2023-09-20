import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TransaksiPembayaran } from '@entities/transaksi.entity';
import { TransaksiPembayaranDTO } from './dto/transaksi.dto';
import { TindakanService } from '@app/Tindakan/tindakan.service';
import { ObatService } from '@app/Obat/obat.service';

@Injectable()
export class TransaksiPembayaranService {
  constructor(
    @InjectRepository(TransaksiPembayaran)
    private readonly transaksiPembayaranRepository: Repository<TransaksiPembayaran>,
    private readonly tindakanService: TindakanService,
    private readonly obatService: ObatService,
  ) {}

  async create(
    transaksiPembayaran: TransaksiPembayaranDTO,
  ): Promise<TransaksiPembayaran> {
    try {
      const newTransaksi = await new TransaksiPembayaran();
      newTransaksi.Tanggal_Transaksi = transaksiPembayaran.Tanggal_Transaksi;
      newTransaksi.resepId = transaksiPembayaran.resepId;
      newTransaksi.tindakanId = transaksiPembayaran.tindakanId;
      newTransaksi.obatId = transaksiPembayaran.obatId;
      newTransaksi.quantity_obat = transaksiPembayaran.quantity_obat;

      // dapatkan biaya tindakan
      const tindakan = await this.tindakanService.findOne(
        transaksiPembayaran.tindakanId,
      );
      const biayaTindakan = tindakan.Biaya;

      // Dapatkan harga obat
      const obat = await this.obatService.findOne(transaksiPembayaran.obatId);
      if (obat.Jumlah_Stok < transaksiPembayaran.quantity_obat) {
        throw new Error('Stok Tidak Mencukupi');
      }
      const hargaObat = obat.Harga;
      const quantityObat = transaksiPembayaran.quantity_obat;

      // Hitung total tagihan
      const totalTagihan = biayaTindakan + hargaObat * quantityObat;

      newTransaksi.Total_Tagihan = totalTagihan;
      obat.Jumlah_Stok -= quantityObat;
      await this.obatService.update(obat.ID_Obat, {
        Jumlah_Stok: obat.Jumlah_Stok,
        Nama_Obat: obat.Nama_Obat,
        Harga: obat.Harga,
        Deskripsi: obat.Deskripsi,
      });

      const saveTransaksi =
        await this.transaksiPembayaranRepository.save(newTransaksi);
      return saveTransaksi;
    } catch (error: any) {
      throw new Error('Failed to create transaksi pembayaran.');
    }
  }

  async findAll(): Promise<TransaksiPembayaran[]> {
    try {
      return await this.transaksiPembayaranRepository.find({
        relations: ['tindakanId', 'resepId', 'obatId'],
      });
    } catch (error) {
      throw new Error('Failed to fetch transaksi pembayaran list.');
    }
  }

  async findOne(ID_Transaksi: number): Promise<TransaksiPembayaran> {
    try {
      const transaksiPembayaran =
        await this.transaksiPembayaranRepository.findOne({
          where: { ID_Transaksi },
          relations: ['tindakanId', 'resepId', 'obatId'],
        });
      if (!transaksiPembayaran) {
        throw new NotFoundException('Transaksi pembayaran not found.');
      }
      return transaksiPembayaran;
    } catch (error) {
      throw new Error('Failed to fetch transaksi pembayaran.');
    }
  }

  async update(
    ID_Transaksi: number,
    updatedTransaksiPembayaran: TransaksiPembayaranDTO,
  ): Promise<TransaksiPembayaran> {
    try {
      const updatedTransaksi = await new TransaksiPembayaran();
      updatedTransaksi.Tanggal_Transaksi =
        updatedTransaksiPembayaran.Tanggal_Transaksi;
      await this.transaksiPembayaranRepository.update(
        ID_Transaksi,
        updatedTransaksi,
      );
      const transaksiPembayaran =
        await this.transaksiPembayaranRepository.findOne({
          where: { ID_Transaksi },
        });
      if (!transaksiPembayaran) {
        throw new NotFoundException('Transaksi pembayaran not found.');
      }
      return transaksiPembayaran;
    } catch (error) {
      throw new Error('Failed to update transaksi pembayaran.');
    }
  }

  async remove(ID_Transaksi: number): Promise<void> {
    try {
      const result =
        await this.transaksiPembayaranRepository.delete(ID_Transaksi);
      if (result.affected === 0) {
        throw new NotFoundException('Transaksi pembayaran not found.');
      }
    } catch (error) {
      throw new Error('Failed to delete transaksi pembayaran.');
    }
  }
}
