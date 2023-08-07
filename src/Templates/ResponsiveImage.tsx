import {DrupalMedia} from "../Entity";

export default async function ResponsiveImage(media: DrupalMedia, responsive_image_style_id: string) {

    if (media.bundle !== 'image') {
        return (
            <p>Not an image.</p>
        )
    }

    const file = media.getFile();

    if (!file === null) return <p>Can't get file.</p>
    if (!file.hasOwnProperty('responsive_image_styles')) return <p>Can't get responsive image styles.</p>
    if (!file['responsive_image_styles'].hasOwnProperty(responsive_image_style_id)) return <p>Responsive image style {responsive_image_style_id} does not exist.</p>

    const file_path = file.getAbsolutePath() ?? '';
    const responsive_image_style = file['responsive_image_styles'][responsive_image_style_id];


    return (
        <picture>
            {
                Object.values(responsive_image_style).map((image_style: {url: string, media_query: string}) => <source srcSet={image_style.url} media={image_style.media_query} />)
            }
            <img src={file_path} />
        </picture>
    )
}
