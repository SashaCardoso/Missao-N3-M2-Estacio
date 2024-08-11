import BookController from "@/controllers/BookController"
import Book, { isBook } from "@/types/Book";

export const GET = async () => { 
    const bookController = new BookController();
    return Response.json(bookController.getBooks());
}

export const POST = async (req: Request) => {
    const book = await req.json();
    if (!isBook(book)) {
        return new Response('bad request', {
            status: 400,
            statusText: "the request was not formatted properly"
        });
    }
    const bookController = new BookController();

    bookController.addBook(book);

    return Response.json(bookController.getBookById(book.bookId));
}

export const DELETE = async (req: Request) => {
    const body = await req.json();
    if (body.id == undefined || typeof body.id !== 'number') {
        return new Response('bad request', {
            status: 400,
            statusText: "the request was not formatted properly"
        });
    }

    const bookController = new BookController();
    bookController.deleteBook(body.id);

    return Response.json(bookController.getBookById(body.id));
}