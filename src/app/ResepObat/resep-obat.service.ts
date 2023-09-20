import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Resep } from '@entities/resep-obat.entity';
import { CreateResepDto } from './dto/resep-obat.dto';

@Injectable()
export class ResepService {
  constructor(
    @InjectRepository(Resep)
    private readonly resepRepository: Repository<Resep>,
  ) {}

  async create(resep: CreateResepDto): Promise<Resep> {
    try {
      const newResep = new Resep();
      newResep.Tanggal_Resep = resep.Tanggal_Resep;
      newResep.Detail_Resep = resep.Detail_Resep;
      newResep.dokterId = resep.dokterId;
      newResep.pasienId = resep.pasienId;

      const savedResep = await this.resepRepository.save(newResep);

      return savedResep;
    } catch (error) {
      throw new Error('Failed to create resep.');
    }
  }

  async findAll(): Promise<Resep[]> {
    try {
      return await this.resepRepository.find({
        relations: ['dokterId', 'pasienId'],
      });
    } catch (error) {
      throw new Error('Failed to fetch resep list.');
    }
  }

  async findOne(ID_Resep: number): Promise<Resep> {
    try {
      const resep = await this.resepRepository.findOne({
        where: { ID_Resep },
        relations: ['dokterId', 'pasienId'],
      });
      if (!resep) {
        throw new NotFoundException('Resep not found.');
      }
      return resep;
    } catch (error) {
      throw new Error('Failed to fetch resep.');
    }
  }

  async update(ID_Resep: number, updatedResep: CreateResepDto): Promise<Resep> {
    try {
      await this.resepRepository.update(ID_Resep, updatedResep);
      const resep = await this.resepRepository.findOne({ where: { ID_Resep } });
      if (!resep) {
        throw new NotFoundException('Resep not found.');
      }
      return resep;
    } catch (error) {
      throw new Error('Failed to update resep.');
    }
  }

  async remove(ID_Resep: number): Promise<void> {
    try {
      const result = await this.resepRepository.delete(ID_Resep);
      if (result.affected === 0) {
        throw new NotFoundException('Resep not found.');
      }
    } catch (error) {
      throw new Error('Failed to delete resep.');
    }
  }
}
