/*import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
//import { User } from '../entities/user.entity';
import { User, UserRole } from '../entities/user.entity'; 


@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async findByUsername(username: string): Promise<User | null> {
    return this.userRepository.findOne({ where: { username } });
  }

    async createUser(data: { username: string; email:string; password: string; role: UserRole }): Promise<User> {  ///////////
    const user = this.userRepository.create(data);
    return this.userRepository.save(user);
  }

  async findAllUsers(): Promise<User[]> {
  return this.userRepository.find();
}

async deleteUser(id: number): Promise<void> {
  await this.userRepository.delete(id);
}

async findByEmail(email: string): Promise<User | null> {
  return this.userRepository.findOne({ where: { email } });
}

async findOneById(id: number): Promise<User | null> {
  return this.userRepository.findOne({ where: { id } });
}

async updateUser(id: number, updateData: Partial<User>): Promise<User> {
  await this.userRepository.update(id, updateData);
  const updatedUser = await this.userRepository.findOne({ where: { id } });

  if (!updatedUser) {
    throw new Error(`User with ID ${id} not found`);
  }

  return updatedUser;
}



}*/


import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User, UserRole } from '../entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async findByUsername(username: string): Promise<User | null> {
    return this.userRepository.findOne({ where: { username } });
  }

  async createUser(data: { username: string; email: string; password: string; role: UserRole }): Promise<User> {
    const user = this.userRepository.create(data);
    return this.userRepository.save(user);
  }

  async findAllUsers(): Promise<User[]> {
    return this.userRepository.find();
  }

  async deleteUser(id: number): Promise<void> {
    await this.userRepository.delete(id);
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.userRepository.findOne({ where: { email } });
  }

  async findOneById(id: number): Promise<User | null> {
    return this.userRepository.findOne({ where: { id } });
  }

  async updateUser(id: number, updateData: Partial<User>): Promise<User> {
    await this.userRepository.update(id, updateData);
    const updatedUser = await this.userRepository.findOne({ where: { id } });

    if (!updatedUser) {
      throw new Error(`User with ID ${id} not found`);
    }

    return updatedUser;
  }

  // FIXED: Use UserRole enum instead of string
  async findByRole(role: UserRole): Promise<User[]> {
    return this.userRepository.find({ where: { role } });
  }
}
