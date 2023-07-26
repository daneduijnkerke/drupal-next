import {DrupalNode} from "../Entity";
import DrupalUtils from "../Utils/DrupalUtils";
import SearchParamsDefault from "../SearchParams/SearchParamsDefault";

interface NodeProps {
    node: DrupalNode,
    viewmode?: string,
    searchParams?: SearchParamsDefault
}
export default async function DrupalNodeComponent({node, viewmode = 'default', searchParams}: NodeProps) {
    return DrupalUtils.resolveTemplate(node, viewmode, searchParams);
}
