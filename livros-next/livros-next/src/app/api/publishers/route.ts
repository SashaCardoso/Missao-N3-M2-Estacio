import PublisherController from "@/controllers/PublisherController"

export const GET = async () => { 
    const publisherController = new PublisherController();

    return Response.json(publisherController.getPublishers());
}