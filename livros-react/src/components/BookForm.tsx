import React, { useEffect, useState, ChangeEvent } from 'react';
import { Form } from 'react-bootstrap';
import Book from '../types/Book';
import PublisherController from '../controllers/PublisherController';
import Publisher from '../types/Publisher';
import BookController from '../controllers/BookController';

function BookForm() {

    const publisherController = new PublisherController();
    const [publishers, setPublishers] = useState<Publisher[]>([]);
    const bookController = new BookController();

    const [book, setBook] = useState<Book>({
        bookId: 0,
        publisherId: 0,
        title: '',
        synopsis: '',
        authors: [],
    })

    useEffect(() => {
        setPublishers(publisherController.getPublishers());
    }, []);

    const renderPublishers = () => {
        let html = publishers.map((val) => (<option value={val.publisherId}>{val.name}</option>))

        return <Form.Select onChange={(e) => setBook({ ...book, publisherId: parseInt(e.target.value) })}>{ html }</ Form.Select>
    }

    const onAuthorChange = (event: ChangeEvent<HTMLInputElement>) => {
        let authorArray = event.target.value.split(',');
        setBook({ ...book, authors: authorArray });
    }

    const submitBook = () => {
        bookController.addBook(book);
    }

    return (
        <>
            <Form className="container">
                <Form.Group className="mb-3">
                    <Form.Label>Title</Form.Label>
                    <Form.Control type="text" placeholder="Enter title" onChange={(e) => setBook({...book, title:e.target.value})} />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Synopsis</Form.Label>
                            <Form.Control as="textarea" placeholder="Enter synopsis" rows={3} onChange={(e) => setBook({ ...book, synopsis: e.target.value })} />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Publisher</Form.Label>
                    {renderPublishers()}
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Authors (1 per line)</Form.Label>
                    <Form.Control as="textarea" placeholder="Enter authors" rows={3} onChange={onAuthorChange} />
                </Form.Group>
                <button onClick={submitBook}>Submit</button>
            </Form>
        </>
    );
}

export default BookForm;
