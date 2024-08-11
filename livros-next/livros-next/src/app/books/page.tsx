'use client'

import React, { useEffect, useState } from 'react';
import BookController from '../../controllers/BookController';
import PublisherController from '../../controllers/PublisherController';
import Book, { isBookArray } from '../../types/Book';
import ListElement from '../../components/ListElement';
import Publisher, { isPublisherArray } from '../../types/Publisher';

const List = () => {
    const publisherController = new PublisherController();
    const [books, setBooks] = useState<Book[]>([]);
    const [publishers, setPublishers] = useState<Publisher[]>([]);

    useEffect(() => {
        const fetchBooks = async () => {
            let booksReq = await fetch("http://localhost:3000/api/books");
            let books = await booksReq.json();
            if (!isBookArray(books)) {
                throw new Error("fetched array is not an array of books!")
            }
            setBooks(books);
        }

        const fetchPublishers = async () => {
            let pubReq = await fetch("http://localhost:3000/api/publishers");
            let publishers = await pubReq.json();
            if (!isPublisherArray(publishers)) {
                throw new Error("fetched array is not an array of publishers!")
            }
            setPublishers(publishers);
        }

        fetchBooks();
        fetchPublishers();
    }, []);

    const deleteBook = async (id: number) => {
        setBooks(books.filter((val) => val.bookId !== id));
        let request = {
            method: 'DELETE',
            body: JSON.stringify({id})
        }
        let _ = await fetch("http://localhost:3000/api/books", request);
    }

    const renderListElements = (books: Book[]) => {
        if (publishers.length == 0) {
            return <></>
        }

        let components = books.map((book) => {
            let publisher = publishers.find(p => p.publisherId === book.publisherId);
            return <ListElement book={book} publisher={publisher as Publisher} deleteFunction={deleteBook} key={book.bookId}></ListElement>
        });

        return components;
    }

    return (
        <>
            <p className='p-2 fw-bold fs-1'>List of Books</p>
            <table className='table'>
                <thead>
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
                </thead>
                <tbody>
                    {
                        renderListElements(books)
                    }
                </tbody>
            </table>
        </>
    );
}

export default List;