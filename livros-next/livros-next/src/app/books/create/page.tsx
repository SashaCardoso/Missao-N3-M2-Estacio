'use client'

import React, { useEffect, useState, ChangeEvent } from 'react';
import { Button, Form } from 'react-bootstrap';
import Book from '../../../types/Book';
import Publisher, { isPublisherArray } from '../../../types/Publisher';

function BookForm() {

    const [publishers, setPublishers] = useState<Publisher[]>([]);

    const [book, setBook] = useState<Book>({
        bookId: 0,
        publisherId: 1,
        title: '',
        synopsis: '',
        authors: [""],  
    })

    useEffect(() => {
        const fetchPublishers = async () => {
            let pubReq = await fetch("http://localhost:3000/api/publishers");
            let publishers = await pubReq.json();
            if (!isPublisherArray(publishers)) {
                throw new Error("fetched array is not an array of publishers!")
            }
            setPublishers(publishers);
        }

        fetchPublishers();
    }, []);

    const renderPublishers = () => {
        let html = publishers.map((val) => (<option key={val.publisherId} value={val.publisherId}>{val.name}</option>))

        return <Form.Select onChange={(e) => setBook({ ...book, publisherId: parseInt(e.target.value) })}>{ html }</ Form.Select>
    }

    const onAuthorChange = (event: ChangeEvent<HTMLInputElement>) => {
        let authorArray = event.target.value.split(',');
        setBook({ ...book, authors: authorArray });
    }

    const submitBook = async () => {

        console.log(book);
        let _ = await fetch("http://localhost:3000/api/books", {
            method: 'POST',
            body: JSON.stringify(book),
        });
        setBook({
            bookId: 0,
            title: "",
            authors: [""],
            publisherId: 1,
            synopsis: "",
        });
    }

    return (
        <>
            <Form className="container">
                <Form.Group className="mb-3">
                    <Form.Label>Title</Form.Label>
                    <Form.Control value={book.title} type="text" placeholder="Enter title" onChange={(e) => setBook({...book, title:e.target.value})} />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Synopsis</Form.Label>
                    <Form.Control value={book.synopsis} as="textarea" placeholder="Enter synopsis" rows={3} onChange={(e) => setBook({ ...book, synopsis: e.target.value })} />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Publisher</Form.Label>
                    {renderPublishers()}
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Authors (1 per line)</Form.Label>
                    <Form.Control value={book.authors.reduce((acc, val) => acc + ',' + val)} as="textarea" placeholder="Enter authors" rows={3} onChange={onAuthorChange} />
                </Form.Group>
                <Button onClick={submitBook}>Submit</Button>
            </Form>
        </>
    );
}

export default BookForm;
