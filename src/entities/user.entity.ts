// src/entities/user.entity.ts

import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

export enum UserRole {
  Guest = 'guest',
  User = 'user',
  Admin = 'admin',
  Librarian = 'librarian',
}

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  username: string;

  @Column({ unique: true })
  email: string;   // add this line

  @Column()
  password: string;

  @Column({ type: 'enum', enum: UserRole, default: UserRole.Guest })
  role: UserRole;

  // ✅ New fields for reset password
  @Column({ nullable: true })
  resetToken: string;

  @Column({ type: 'timestamp', nullable: true })
  resetTokenExpires: Date;
  
}
