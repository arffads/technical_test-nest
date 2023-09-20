import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Poli } from '@entities/poli.entity';
import { CreatePoliDto } from './dto/poli.dto';

@Injectable()
export class PoliService {
  constructor(
    @InjectRepository(Poli)
    private readonly poliRepository: Repository<Poli>,
  ) {}

  async create(poli: CreatePoliDto): Promise<Poli> {
    try {
      const newPoli = new Poli();
      newPoli.Nama_Poli = poli.Nama_Poli;

      return await this.poliRepository.save(newPoli);
    } catch (error) {
      throw new Error('Failed to create poli.');
    }
  }

  async findAll(): Promise<Poli[]> {
    try {
      return await this.poliRepository.find({ relations: ['dokterId'] });
    } catch (error) {
      throw new Error('Failed to fetch poli list.');
    }
  }

  async findOne(ID_Poli: number): Promise<Poli> {
    try {
      const poli = await this.poliRepository.findOne({
        where: { ID_Poli },
        relations: ['dokterId'],
      });
      if (!poli) {
        throw new NotFoundException('poli not found.');
      }
      return poli;
    } catch (error) {
      throw new Error('Failed to fetch poli.');
    }
  }

  async update(ID_Poli: number, updatedPoli: CreatePoliDto): Promise<Poli> {
    try {
      await this.poliRepository.update(ID_Poli, updatedPoli);
      const poli = await this.poliRepository.findOne({
        where: { ID_Poli },
      });
      if (!poli) {
        throw new NotFoundException('Poli not found.');
      }
      return poli;
    } catch (error) {
      throw new Error('Failed to update poli.');
    }
  }

  async remove(ID_Poli: number): Promise<void> {
    try {
      const result = await this.poliRepository.delete(ID_Poli);
      if (result.affected === 0) {
        throw new NotFoundException('Poli not found.');
      }
    } catch (error) {
      throw new Error('Failed to delete poli.');
    }
  }
}
