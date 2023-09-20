import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Resep } from './resep-obat.entity';
import { Tindakan } from './tindakan.entity';
import { Obat } from './obat.entity';

@Entity()
export class TransaksiPembayaran {
  @PrimaryGeneratedColumn()
  ID_Transaksi: number;

  @ManyToOne(() => Tindakan, (tindakan) => tindakan.transaksiPembayaranId)
  tindakanId: Tindakan | number;

  @ManyToOne(() => Resep, (resep) => resep.transaksiPembayaranId)
  resepId: Resep | number;

  @ManyToOne(() => Obat, (obat) => obat.obatId)
  obatId: Obat | number;

  @Column({ nullable: true })
  quantity_obat: number;

  @Column({ nullable: true })
  Tanggal_Transaksi: Date;

  @Column({ nullable: true })
  Total_Tagihan: number;
}
