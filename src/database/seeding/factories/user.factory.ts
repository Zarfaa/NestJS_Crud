import { Faker } from '@faker-js/faker';
import { setSeederFactory } from 'typeorm-extension';
import { User } from "../../entity/user.entity";

export const userFactory = setSeederFactory(User, (faker: Faker) => {
  const user = new User();
  user.name = faker.internet.userName(); 
  user.email = faker.internet.email();
  user.password = faker.internet.password(); 
  return user;
});