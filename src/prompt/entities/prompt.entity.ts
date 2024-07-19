import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class Prompt {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  description: string;
  
  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updated_at: Date;
  
  @Column("text", { array: true, nullable: true })
  tags: string[];

  @Column({ nullable: true })
  type: string;

  @Column({ nullable: true })
  status?: string;
  @Column({ nullable: true , default: 'Admin'})
  author?: string;
  
  constructor(prompt: Partial<Prompt>) {
    if (prompt) {
      Object.assign(this, prompt);
    }
  }
}
