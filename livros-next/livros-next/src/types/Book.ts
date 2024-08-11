type Book = {
    bookId: number,
    publisherId: number,
    title: string,
    synopsis: string,
    authors: string[],
}

export const isBook = (book: any): book is Book => {
    return book && (
        typeof book.bookId === 'number' &&
        typeof book.title == 'string' &&
        Array.isArray(book.authors) &&
        typeof book.publisherId === 'number' &&
        typeof book.synopsis === 'string'
    )
}

export const isBookArray = (bookArr: any): bookArr is Book[] => {
    for (let i = 0; i < bookArr.length; i++) {
        if (!isBook(bookArr[i])) {
            return false;
        }
    }

    return true;
}

export default Book;