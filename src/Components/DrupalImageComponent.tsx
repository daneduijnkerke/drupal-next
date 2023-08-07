import {DrupalMedia} from "../Entity";
import MediaImage from "../Templates/MediaImage";

interface ResponsiveImageProps {
    media: DrupalMedia,
    image_style_id: string,
}
export default function DrupalImageComponent({media, image_style_id}: ResponsiveImageProps) {
    return  MediaImage(media, image_style_id)
}
