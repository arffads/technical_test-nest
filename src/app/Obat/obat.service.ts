import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Obat } from '@entities/obat.entity';
import { CreateObatDto } from './dto/obat.dto';

@Injectable()
export class ObatService {
  constructor(
    @InjectRepository(Obat)
    private readonly obatRepository: Repository<Obat>,
  ) {}

  async countObat(): Promise<number> {
    return await this.obatRepository.count();
  }

  async create(obat: CreateObatDto): Promise<Obat> {
    try {
      const newObat = new Obat();
      newObat.Nama_Obat = obat.Nama_Obat;
      newObat.Harga = obat.Harga;
      newObat.Jumlah_Stok = obat.Jumlah_Stok;
      newObat.Deskripsi = obat.Deskripsi;

      const savedObat = await this.obatRepository.save(newObat);

      return savedObat;
    } catch (error) {
      throw new Error('Failed to create obat.');
    }
  }

  async findAll(): Promise<Obat[]> {
    try {
      return await this.obatRepository.find();
    } catch (error) {
      throw new Error('Failed to fetch obat list.');
    }
  }

  async findOne(ID_Obat: number): Promise<Obat> {
    try {
      const obat = await this.obatRepository.findOne({ where: { ID_Obat } });
      if (!obat) {
        throw new NotFoundException('Obat not found.');
      }
      return obat;
    } catch (error) {
      throw new Error('Failed to fetch obat.');
    }
  }

  async update(ID_Obat: number, updatedObat: CreateObatDto): Promise<Obat> {
    try {
      await this.obatRepository.update(ID_Obat, updatedObat);
      const obat = await this.obatRepository.findOne({ where: { ID_Obat } });
      if (!obat) {
        throw new NotFoundException('Obat not found.');
      }
      return obat;
    } catch (error) {
      throw new Error('Failed to update obat.');
    }
  }

  async remove(ID_Obat: number): Promise<void> {
    try {
      const result = await this.obatRepository.delete(ID_Obat);
      if (result.affected === 0) {
        throw new NotFoundException('Obat not found.');
      }
    } catch (error) {
      throw new Error('Failed to delete obat.');
    }
  }
}
