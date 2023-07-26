import DrupalUtils from "../Utils/DrupalUtils";
import {DrupalEntity} from "../Entity";
import SearchParamsDefault from "../SearchParams/SearchParamsDefault";

interface EntityProps {
    entity: DrupalEntity | any,
    viewmode?: string,
    searchParams?: SearchParamsDefault | any
}

export default function DrupalEntityComponent({entity, viewmode = 'default', searchParams}: EntityProps) {
    return DrupalUtils.resolveTemplate(entity, viewmode, searchParams);
}
