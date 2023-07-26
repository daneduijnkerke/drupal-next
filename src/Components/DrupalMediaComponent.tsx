import {DrupalMedia} from "../Entity";
import DrupalUtils from "../Utils/DrupalUtils";
import SearchParamsDefault from "../SearchParams/SearchParamsDefault";

interface MediaProps {
    media: DrupalMedia,
    viewmode?: string,
    searchParams?: SearchParamsDefault
}
export default function DrupalMediaComponent({media, viewmode = 'default', searchParams}: MediaProps) {
    return DrupalUtils.resolveTemplate(media, viewmode, searchParams)
}
