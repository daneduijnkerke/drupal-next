import {DrupalMedia} from "../Entity";
import ResponsiveImage from "../Templates/ResponsiveImage";

interface ResponsiveImageProps {
    media: DrupalMedia,
    responsive_image_style_id: string,
}
export default function DrupalResponsiveImageComponent({media, responsive_image_style_id}: ResponsiveImageProps) {
    return  ResponsiveImage(media, responsive_image_style_id)
}
