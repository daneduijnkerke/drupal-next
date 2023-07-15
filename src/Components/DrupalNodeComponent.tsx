
import {DrupalNode} from "../Entity";
import {DrupalUtils} from "../Utils";

export default function DrupalNodeComponent({node}: {node: DrupalNode}) {
    return DrupalUtils.getTemplate(node)
}
