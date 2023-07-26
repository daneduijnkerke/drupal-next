import {DrupalView} from "../Entity";
import DrupalUtils from "../Utils/DrupalUtils";
import SearchParamsView from "../SearchParams/SearchParamsView";

interface ViewProps {
    view: DrupalView,
    viewmode?: string,
    searchParams?: SearchParamsView
}

export default function DrupalViewComponent({view, viewmode = 'default', searchParams}: ViewProps) {
    return DrupalUtils.resolveTemplate(view, viewmode, searchParams);
}
