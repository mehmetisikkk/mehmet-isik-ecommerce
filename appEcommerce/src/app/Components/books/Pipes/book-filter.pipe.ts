import { Pipe, PipeTransform } from '@angular/core';
import { Book } from '../Models/book';

@Pipe({
  name: 'bookFilter'
})
export class BookFilterPipe implements PipeTransform {

  transform(books: Book[], filterText: string): Book[] {
    filterText = filterText.toLocaleLowerCase();

    console.log(filterText
      ? books.filter(
          (m: Book) =>
            m.title.toLocaleLowerCase().indexOf(filterText) !== -1 ||
            m.description.toLocaleLowerCase().indexOf(filterText) !== -1
        )
      : books);

    return filterText
      ? books.filter(
          (m: Book) =>
            m.title.toLocaleLowerCase().indexOf(filterText) !== -1 ||
            m.description.toLocaleLowerCase().indexOf(filterText) !== -1
        )
      : books;
  }

}
