import { Faker } from '@faker-js/faker';
import { setSeederFactory } from 'typeorm-extension';
import { Book } from '../../entity/book.entity';
import { User } from '../../entity/user.entity';

export const bookFactory = setSeederFactory(Book, (faker: Faker, context?: { user: User }) => {
  const book = new Book();
  book.name = faker.lorem.words(3);
  book.author = faker.internet.userName();
  book.IBN = faker.string.uuid();
  book.genre = faker.lorem.word();
  book.user = context?.user;
  return book;
});
