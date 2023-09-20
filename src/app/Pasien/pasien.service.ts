import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Pasien } from '@entities/pasien.entity';
import { CreatePasienDto } from './dto/pasien.dto';

@Injectable()
export class PasienService {
  constructor(
    @InjectRepository(Pasien)
    private readonly pasienRepository: Repository<Pasien>,
  ) {}

  async create(pasien: CreatePasienDto): Promise<Pasien> {
    try {
      const newPasien = await new Pasien();
      newPasien.Nama = pasien.Nama;
      newPasien.Alamat = newPasien.Alamat;
      newPasien.Nomor_Telepon = newPasien.Nomor_Telepon;
      newPasien.Usia = newPasien.Usia;
      newPasien.Jenis_Kelamin = newPasien.Jenis_Kelamin;

      return await this.pasienRepository.save(pasien);
    } catch (error) {
      throw new Error('Failed to create pasien.');
    }
  }

  async findAll(): Promise<Pasien[]> {
    try {
      return await this.pasienRepository.find();
    } catch (error) {
      throw new Error('Failed to fetch pasien list.');
    }
  }

  async findOne(ID_Pasien: number): Promise<Pasien> {
    try {
      const pasien = await this.pasienRepository.findOne({
        where: { ID_Pasien },
      });
      if (!pasien) {
        throw new NotFoundException('Pasien not found.');
      }
      return pasien;
    } catch (error) {
      throw new Error('Failed to fetch pasien.');
    }
  }

  async update(
    ID_Pasien: number,
    updatedPasien: CreatePasienDto,
  ): Promise<Pasien> {
    try {
      await this.pasienRepository.update(ID_Pasien, updatedPasien);
      const pasien = await this.pasienRepository.findOne({
        where: { ID_Pasien },
      });
      if (!pasien) {
        throw new NotFoundException('Pasien not found.');
      }
      return pasien;
    } catch (error) {
      throw new Error('Failed to update pasien.');
    }
  }

  async remove(ID_Pasien: number): Promise<void> {
    try {
      const result = await this.pasienRepository.delete(ID_Pasien);
      if (result.affected === 0) {
        throw new NotFoundException('Pasien not found.');
      }
    } catch (error) {
      throw new Error('Failed to delete pasien.');
    }
  }
}
