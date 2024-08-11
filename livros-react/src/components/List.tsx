import React, { useEffect, useState } from 'react';
import BookController from '../controllers/BookController';
import PublisherController from '../controllers/PublisherController';
import Book from '../types/Book';
import ListElement from './ListElement';
import Publisher from '../types/Publisher';

const List = () => {
    const bookController = new BookController();
    const publisherController = new PublisherController();
    const [books, setBooks] = useState<Book[]>([]);

    useEffect(() => {
        setBooks(bookController.getBooks);
    }, []);

    const deleteBook = (id: number) => {
        setBooks(books.filter((val) => val.bookId !== id));
        bookController.deleteBook(id);
    }

    const renderListElements = (books: Book[]) => {
        let components = books.map((book) => {
            let publisher = publisherController.getPublisherById(book.publisherId);
            return <ListElement book={book} publisher={publisher as Publisher} deleteFunction={deleteBook} key={book.bookId}></ListElement>
        })

        return components;
    }

    return (
        <table className='table'>
            <p className='p-2 fw-bold fs-1'>List of Books</p>
            <tr>
                <td className='bg-dark text-light p-2 fw-bold'>
                    Title
                </td>
                <td className='bg-dark text-light p-2 fw-bold'>
                    Synopsis
                </td>
                <td className='bg-dark text-light p-2 fw-bold'>
                    Publisher
                </td>
                <td className='bg-dark text-light p-2 fw-bold'>
                    Authors
                </td>
            </tr>
            <tbody>
                {
                    renderListElements(books)
                }
            </tbody>
        </table>
    );
}

export default List;