// /entities/resep-obat.entity.ts
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { Dokter } from './dokter.entity';
import { Pasien } from './pasien.entity';
// import { DetailResep } from './detail-resep-obat.entity'; // Import entitas DetailResep
// import { Obat } from './obat.entity';
import { TransaksiPembayaran } from './transaksi.entity';
// import { DetailResep } from './detail-resep-obat.entity';
// import { Obat } from './obat.entity';

@Entity()
export class Resep {
  @PrimaryGeneratedColumn()
  ID_Resep: number;

  @ManyToOne(() => Dokter, (dokter) => dokter.resepId)
  dokterId: Dokter | number;

  @ManyToOne(() => Pasien, (pasien) => pasien.resepId)
  pasienId: Pasien | number;

  @Column({ nullable: true })
  Detail_Resep: string;

  @Column({ nullable: true })
  Tanggal_Resep: Date;

  @OneToMany(
    () => TransaksiPembayaran,
    (transaksiPembayaran) => transaksiPembayaran.resepId,
  )
  transaksiPembayaranId: TransaksiPembayaran[] | number;
}
