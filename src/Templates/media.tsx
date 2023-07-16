import {DrupalMedia} from "../Entity";

export default async function media({entity}: {entity: DrupalMedia}) {
    const media = entity;
    const file = media.getFile();

    // #TODO: Perhabs create templates like media_image, media_file, media_video in this module etc.
    if (media.bundle === 'image') {
        return <img src={file.getAbsolutePath()} />
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
