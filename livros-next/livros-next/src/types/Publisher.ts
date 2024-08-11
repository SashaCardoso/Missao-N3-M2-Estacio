type Publisher = {
    name: string,
    publisherId: number,
}

export const isPublisher = (publisher: any): publisher is Publisher => {
    return publisher && (
        typeof publisher.name === 'string' &&
        typeof publisher.publisherId == 'number'
    )
}

export const isPublisherArray = (publisherArr: any): publisherArr is Publisher[] => {
    for (let i = 0; i < publisherArr.length; i++) {
        if (!isPublisher(publisherArr[i])) {
            return false;
        }
    }

    return true;
}

export default Publisher;