import {DrupalMedia} from "../Entity";
import SearchParamsDefault from "../SearchParams/SearchParamsDefault";
import DrupalClient from "../DrupalClient";

export default async function MediaDefault(entity: DrupalMedia, searchParams: SearchParamsDefault = {}) {
    const media = entity;
    const file = media.getFile();
    const file_path = file?.getAbsolutePath() ?? '';

    // #TODO: Perhabs create templates like media_image, media_file, media_video in this module etc.
    if (media.bundle === 'image') {

        if(file!.hasOwnProperty('image_style_uri')) {
            return (
                <picture>
                    {
                        // Object.keys(file?.image_style_uri).map((breakpoint: string) => <source  srcSet={file?.image_style_uri[breakpoint]} media={DrupalClient.breakpoints[breakpoint]}/>)
                        Object.keys(DrupalClient.breakpoints).map((breakpoint: string) => <source  srcSet={file?.image_style_uri[breakpoint]} media={DrupalClient.breakpoints[breakpoint]}/>)
                    }
                    <img id="testme" src={file_path} />
                </picture>
            )
        }

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
