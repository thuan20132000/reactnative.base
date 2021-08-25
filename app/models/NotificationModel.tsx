

class NotificationModel {
    id: Number;
    name: String;
    slug: String;
    image: String;
    status: String;
    created_at: Date;
    updated_at: Date;

    constructor(data: { id: Number; name: String; slug: String; image: String; status: String; created_at: Date; updated_at: Date; }) {
        if (data === null) {
            return;
        }
        this.id = data?.id;
        this.name = data?.name;
        this.slug = data?.slug;
        this.image = data?.image;
        this.status = data?.status;
        this.created_at = data?.created_at;
        this.updated_at = data?.updated_at;
    }


    toString() {
        return {
            id: this.id,
            name: this.name,
            image: this.image,
            status: this.status,
            created_at: this.created_at,
            updated_at: this.updated_at
        }
    }


}

export default NotificationModel