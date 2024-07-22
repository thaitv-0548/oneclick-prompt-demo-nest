import { HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { CreatePromptDto } from './dto/create-prompt.dto';
import { UpdatePromptDto } from './dto/update-prompt.dto';
import { EntityManager, Repository } from 'typeorm';
import { Prompt } from './entities/prompt.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { ResponseData } from '../global/global.data';
import { HttpMessage } from 'src/global/global.emun';

@Injectable()
export class PromptService {
  constructor(
    @InjectRepository(Prompt)
    private readonly promptRepository: Repository<Prompt>,
    private readonly entityManager: EntityManager
  ) {}

  async create(createPromptDto: CreatePromptDto): Promise<ResponseData<Prompt>> {
    const prompt = this.promptRepository.create(createPromptDto);
    await this.entityManager.save(prompt);
    return new ResponseData<Prompt>(prompt, HttpStatus.CREATED, HttpMessage.SUCCESS_CREATED);
  }

  async findAll(): Promise<ResponseData<Prompt[]>> {
    const prompts = await this.promptRepository.find();
    return new ResponseData<Prompt[]>(prompts, HttpStatus.OK, HttpMessage.SUCCESS_OK);
  }

  async findOne(id: string): Promise<ResponseData<Prompt>> {
    const prompt = await this.promptRepository.findOneBy({ id });
    if (!prompt) {
      throw new NotFoundException(`Prompt with ID ${id} not found`);
    }
    return new ResponseData<Prompt>(prompt, HttpStatus.OK, HttpMessage.SUCCESS_OK);
  }

  async update(id: string, updatePromptDto: UpdatePromptDto): Promise<ResponseData<Prompt>> {
    await this.promptRepository.update(id, updatePromptDto);
    const updatedPrompt = await this.promptRepository.findOneBy({ id });
    if (!updatedPrompt) {
      throw new NotFoundException(`Prompt with ID ${id} not found`);
    }
    return new ResponseData<Prompt>(updatedPrompt, HttpStatus.OK, HttpMessage.SUCCESS_UPDATED);
  }

  async remove(id: string): Promise<ResponseData<string>> {
    const deleteResult = await this.promptRepository.delete(id);
    if (deleteResult.affected === 0) {
      throw new NotFoundException(`Prompt with ID ${id} not found`);
    }
    return new ResponseData<string>(`Prompt with ID ${id} has been deleted`, HttpStatus.OK, HttpMessage.SUCCESS_DELETED);
  }
}
