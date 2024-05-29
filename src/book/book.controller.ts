import {
  Controller,
  Post,
  Body,
  Get,
  Patch,
  Delete,
  Param,
  UseFilters,
} from '@nestjs/common';
import { BookService } from './book.service';
import { BookDto } from './dto/book.dto';
import { HttpExceptionFilter } from '../exception.filter';

@Controller('books')
@UseFilters(new HttpExceptionFilter())
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @Post()
  async create(@Body() bookDto: BookDto) {
    return this.bookService.create(bookDto);
  }

  @Get()
  async getBooks() {
    return this.bookService.findAll();
  }

  @Get(':id')
  async getBooksById(@Param('id') id: number) {
    return this.bookService.findUnique(id);
  }

  @Patch(':id')
  async update(@Param('id') id: number, @Body() bookDto: BookDto) {
    return this.bookService.update(id, bookDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: number) {
    return this.bookService.remove(id);
  }
}
