import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Book } from 'src/database/entities/book.entity';
import { Repository } from 'typeorm';
import { CreateBookDto } from './dto/create-book.dto';

@Injectable()
export class BookService {
  constructor(
    @InjectRepository(Book)
    private bookRepository: Repository<Book>,
  ) {}

  async findAll(): Promise<Book[]> {
    return this.bookRepository.find();
  }

  async create(book: CreateBookDto): Promise<Book> {
    return this.bookRepository.save({
      title: book.title,
      author: book.author,
      genre: book.genre,
      description: book.description,
    });
  }

  async delete(id: number): Promise<void> {
    await this.bookRepository.delete(id);
  }
}
