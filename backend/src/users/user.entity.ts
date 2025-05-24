import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;  // Identificador único para cada usuario

  @Column()
  email: string;  // El correo electrónico del usuario (único)

  @Column()
  password: string;  // Contraseña del usuario (encriptada)

  @Column({ nullable: true })
  first_name: string;  // Nombre del usuario (opcional)

  @Column({ nullable: true })
  last_name: string;  // Apellido del usuario (opcional)

  @CreateDateColumn({ type: 'datetime' })
  created_at: Date;  // Fecha de creación de la cuenta

  @UpdateDateColumn({ type: 'datetime' })
  updated_at: Date;  // Fecha de última actualización de la cuenta
  @Column({ default: 'user' })
role: string;  // Rol del usuario: 'admin' o 'user'

}
