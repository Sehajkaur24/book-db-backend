import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Book } from 'src/database/entities/book.entity';
import { Repository } from 'typeorm';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';

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

  async update(id: number, book: UpdateBookDto): Promise<Book> {
    const existingBook = await this.bookRepository.findOneBy({ id });
    if (!existingBook) {
      throw new Error('Book not found');
    }
    return this.bookRepository.save({
      ...existingBook,
      ...book,
    });
  }

  async delete(id: number): Promise<void> {
    await this.bookRepository.delete(id);
  }
}
