import Publisher from "../types/Publisher"

export default class PublisherController {
    static getPublisherById(publisherId: number) {
        throw new Error('Method not implemented.');
    }
    publishers: Publisher[] = [
        {publisherId: 1, name: "Publisher One"},
        { publisherId: 2, name: "Publisher Two"},
        { publisherId: 3, name: "Publisher Three"},
    ]
    getPublishers = () => {
        return this.publishers;
    }
    getPublisherById = (id: number): Publisher => {
        return this.publishers.find((pub) => pub.publisherId === id) as Publisher;
    }
}