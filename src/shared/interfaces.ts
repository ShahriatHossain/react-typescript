export interface BikeIncident {
    id: number;
    title: string;
    description: string;
    address: string;
    occurred_at: number;
    updated_at: number;
    media: Media;
}

export interface Media {
    image_url: string;
    image_url_thumb: string;
}