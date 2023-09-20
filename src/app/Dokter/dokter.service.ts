import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Dokter } from '@entities/dokter.entity';
import { CreateDokterDto } from './dto/dokter.dto';

@Injectable()
export class DokterService {
  constructor(
    @InjectRepository(Dokter)
    private readonly dokterRepository: Repository<Dokter>,
  ) {}

  async create(dokter: CreateDokterDto): Promise<Dokter> {
    try {
      const newDokter = await new Dokter();
      newDokter.Nama_Dokter = dokter.Nama_Dokter;
      newDokter.Nomor_Telepon = dokter.Nomor_Telepon;
      newDokter.Spesialisasi = dokter.Spesialisasi;
      newDokter.poliId = dokter.poliId;

      return await this.dokterRepository.save(newDokter);
    } catch (error) {
      throw new Error('Failed to create dokter.');
    }
  }

  async findAll(): Promise<Dokter[]> {
    try {
      return await this.dokterRepository.find({ relations: ['poliId'] });
    } catch (error) {
      throw new Error('Failed to fetch dokter list.');
    }
  }

  async findOne(ID_Dokter: number): Promise<Dokter> {
    try {
      const dokter = await this.dokterRepository.findOne({
        where: { ID_Dokter },
      });
      if (!dokter) {
        throw new NotFoundException('Dokter not found.');
      }
      return dokter;
    } catch (error) {
      throw new Error('Failed to fetch dokter.');
    }
  }

  async update(
    ID_Dokter: number,
    updatedDokter: CreateDokterDto,
  ): Promise<Dokter> {
    try {
      await this.dokterRepository.update(ID_Dokter, updatedDokter);
      const dokter = await this.dokterRepository.findOne({
        where: { ID_Dokter },
      });
      if (!dokter) {
        throw new NotFoundException('Dokter not found.');
      }
      return dokter;
    } catch (error) {
      throw new Error('Failed to update dokter.');
    }
  }

  async remove(ID_Dokter: number): Promise<void> {
    try {
      const result = await this.dokterRepository.delete(ID_Dokter);
      if (result.affected === 0) {
        throw new NotFoundException('Dokter not found.');
      }
    } catch (error) {
      throw new Error('Failed to delete dokter.');
    }
  }
}
