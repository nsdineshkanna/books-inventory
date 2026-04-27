import { faker } from '@faker-js/faker';

export type Book = {
  title: string;
  author: string;
  genre: string;
  isbn: string;
  publicationDate: string;
  price: string;
  
};

const genres = ['Fiction', 'Non-Fiction', 'Mystery', 'Fantasy', 'Science Fiction', 'Biography'];

export function generateBook(): Book {
  return {
    title: faker.lorem.words(2),
    author: faker.person.fullName(),
    genre: faker.helpers.arrayElement(genres),
    isbn: faker.string.numeric(13),
    publicationDate: faker.date.past().toISOString().split('T')[0],
    price: faker.commerce.price(),
    
  };
}