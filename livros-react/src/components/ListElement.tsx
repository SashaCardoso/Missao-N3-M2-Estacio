import React from 'react';
import Book from '../types/Book';
import Publisher from '../types/Publisher';
import PublisherController from '../controllers/PublisherController';

type ListElementProps = {
    book: Book,
    publisher: Publisher,
    deleteFunction: (id: number) => void,
}

const ListElement = (props: ListElementProps) => {

    const renderAuthors = (authors: string[]) => {
        let htmlArray = authors
            .map((val) => <li key={val}>{val}</li>);
        
        return <ul>{htmlArray}</ul>;
    }

    return (
        <tr>
            <td>
                <p>{props.book.title}</p>
                <button onClick={() => props.deleteFunction(props.book.bookId)}>Delete</button>
            </td>
            <td className='bg-light'>
                <p>{props.book.synopsis}</p>
            </td>
            <td>
                <p>{props.publisher.name}</p>
            </td>
            <td className='text-start bg-light'>
                {renderAuthors(props.book.authors)}
            </td>
        </tr>
    );
}

export default ListElement;