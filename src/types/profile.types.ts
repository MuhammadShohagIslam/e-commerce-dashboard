export interface IProfile {
    username?: string;
    fullName?: string;
    image?: {
        public_id: string;
        url: string;
    };
    email?: string;
    about?: string;
    address?: string;
    city?: string;
    postalCode?: string;
    country?: string;
}
