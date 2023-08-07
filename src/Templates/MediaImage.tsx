import {DrupalMedia} from "../Entity";

export default async function MediaImage(media: DrupalMedia, image_style_id: string) {

    if (media.bundle !== 'image') {
        return (
            <p>Not an image.</p>
        )
    }

    const file = media.getFile();

    if (!file === null) return <p>Can't get file.</p>
    if (!file.hasOwnProperty('responsive_image_styles')) return <p>Can't get image styles.</p>
    if (!file['responsive_image_styles'].hasOwnProperty(image_style_id)) return <p>Image style {image_style_id} does not exist.</p>

    const file_path = file['responsive_image_styles'][image_style_id][image_style_id].url ?? '';


    return (
        <img src={file_path} />
    )
}
