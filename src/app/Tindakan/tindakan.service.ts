import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTindakanDto } from './dto/tindakan.dto';
import { Tindakan } from '@entities/tindakan.entity';

@Injectable()
export class TindakanService {
  constructor(
    @InjectRepository(Tindakan)
    private readonly tindakanMedisRepository: Repository<Tindakan>,
  ) {}

  async create(createTindakanMedisDto: CreateTindakanDto): Promise<Tindakan> {
    try {
      const newTindakan = await new Tindakan();
      newTindakan.Nama_Tindakan = createTindakanMedisDto.Nama_Tindakan;
      newTindakan.Deskripsi = createTindakanMedisDto.Deskripsi;
      newTindakan.Biaya = createTindakanMedisDto.Biaya;
      newTindakan.dokterId = createTindakanMedisDto.dokterId;
      newTindakan.pasienId = createTindakanMedisDto.pasienId;

      return await this.tindakanMedisRepository.save(newTindakan);
    } catch (error) {
      throw new Error('Failed to create tindakan medis');
    }
  }

  async findAll(): Promise<Tindakan[]> {
    try {
      return await this.tindakanMedisRepository.find({
        relations: ['pasienId', 'dokterId'],
      });
    } catch (error) {
      throw new Error('Failed to fetch tindakan medis data');
    }
  }

  async findOne(ID_Tindakan: number): Promise<Tindakan> {
    try {
      return await this.tindakanMedisRepository.findOne({
        where: { ID_Tindakan },
      });
    } catch (error) {
      throw new NotFoundException('Tindakan medis not found');
    }
  }

  async update(
    ID_Tindakan: number,
    updateTindakanMedisDto: CreateTindakanDto,
  ): Promise<Tindakan> {
    try {
      const tindakanMedis = await this.tindakanMedisRepository.findOne({
        where: { ID_Tindakan },
      });
      if (!tindakanMedis) {
        throw new NotFoundException('Tindakan medis not found');
      }
      const updatedTindakan = await new Tindakan();
      updatedTindakan.Nama_Tindakan = updateTindakanMedisDto.Nama_Tindakan;
      // this.tindakanMedisRepository.merge(tindakanMedis, updateTindakanMedisDto);
      return await this.tindakanMedisRepository.save(tindakanMedis);
    } catch (error) {
      throw new Error('Failed to update tindakan medis');
    }
  }

  async remove(ID_Tindakan: number): Promise<void> {
    try {
      const tindakanMedis = await this.tindakanMedisRepository.findOne({
        where: { ID_Tindakan },
      });
      if (!tindakanMedis) {
        throw new NotFoundException('Tindakan medis not found');
      }

      await this.tindakanMedisRepository.remove(tindakanMedis);
    } catch (error) {
      throw new Error('Failed to remove tindakan medis');
    }
  }
}
