import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async findOne(email: string): Promise<User | null> {
    return this.usersRepository.findOne({ where: { email } });
  }

  // users.service.ts
async findAll() {
  return this.usersRepository.find({ relations: ['role'] });
}

  async remove(id: number) {
  return this.usersRepository.delete(id);
}
async findByIdWithRole(id: number) {
  return this.usersRepository.findOne({
    where: { id },
    relations: ['role'],  // carga la relación con rol
  });
}


  // Crear un nuevo usuario
  async create(user: Partial<User>): Promise<User> {
    const newUser = this.usersRepository.create(user);
    return this.usersRepository.save(newUser);
  }
}
