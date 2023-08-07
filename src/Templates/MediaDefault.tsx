import {DrupalMedia} from "../Entity";

export default async function MediaDefault(entity: DrupalMedia, image_style_id = null) {
    const media = entity;
    const file = media.getFile();
    const file_path = file?.getAbsolutePath() ?? '';

    // #TODO: Perhabs create templates like media_image, media_file, media_video in this module etc.
    if (media.bundle === 'image') {
        return <img src={file_path} />
    }

    const bundle = (
        <h2>{media.bundle} media item</h2>
    );

    return (
        <div className="media">
            {bundle}
        </div>
    );
}
