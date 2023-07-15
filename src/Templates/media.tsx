import {DrupalMedia} from "../Entity";

export default async function media({entity}: {entity: DrupalMedia}) {
    const media = entity;
    const file = media.getFile();

    if (media.bundle === 'image') {
        return <img src={file.getAbsolutePath()} />
    }

    return (
        <div className="media">
            {title}
            <div dangerouslySetInnerHTML={{__html: content}} className="media-inner"></div>
        </div>
    );
}
