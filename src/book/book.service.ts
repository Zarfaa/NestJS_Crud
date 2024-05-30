import { Injectable, HttpStatus, HttpException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Book } from '../database/entity/book.entity';
import { BookDto } from './dto/book.dto';

@Injectable()
export class BookService {
  constructor(
    @InjectRepository(Book)
    private booksRepository: Repository<Book>,
  ) {}

  async create(bookDto: BookDto) {
    const { name, author, IBN, genre } = bookDto;
    const newBook = this.booksRepository.create({ name, author, IBN, genre });
    return await this.booksRepository.save(newBook);
  }

  async findAll() {
    return await this.booksRepository.find();
  }

  async findUnique(id: number) {
    const book = await this.booksRepository.findOne({ where: { id } });
    if (!book) {
      throw new HttpException(
        `Book with ID ${id} not found`,
        HttpStatus.NOT_FOUND,
      );
    }
    const data = {
      message: 'Book Retrived Successfully',
      statusCode: HttpStatus.OK,
      book,
    };

    return data;
  }

  async update(id: number, bookDto: BookDto) {
    const book = await this.booksRepository.findOne({ where: { id } });
    if (!book) {
      throw new HttpException(
        `Book with ID ${id} not found`,
        HttpStatus.NOT_FOUND,
      );
    }
    Object.assign(book, bookDto);

    const updatedBook = await this.booksRepository.save(book);

    const data = {
      message: 'Book Updated Successfully',
      statusCode: HttpStatus.OK,
      book: updatedBook,
    };

    return data;
  }

  async remove(id: number) {
    const book = await this.booksRepository.findOne({ where: { id } });
    if (!book) {
      throw new HttpException(
        `Book with ID ${id} not found`,
        HttpStatus.NOT_FOUND,
      );
    }
    const data = {
      message: 'Book Deleted Succesfully',
      statusCode: HttpStatus.OK,
      book,
    };
    await this.booksRepository.remove(book);
    return data;
  }
}
