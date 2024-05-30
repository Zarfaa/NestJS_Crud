import { DataSource } from 'typeorm';
import { faker as Faker } from '@faker-js/faker';
import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { User } from '../../entity/user.entity';
import { Book } from '../../entity/book.entity';

export class MainSeeder implements Seeder {
  public async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager,
  ): Promise<void> {
    const BooksRepository = dataSource.getRepository(Book);

    const userFactory = factoryManager.get(User);
    const bookFactory = factoryManager.get(Book);

    const users = await userFactory.saveMany(3);

    const books = await Promise.all(
      Array(5)
        .fill(null)
        .map(async () => {
          const book = await bookFactory.make({
            user: Faker.helpers.arrayElement(users),
          });
          return book;
        }),
    );
    await BooksRepository.save(books);
  }
}
