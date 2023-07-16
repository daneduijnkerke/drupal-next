import {DrupalView} from "../Entity";
import {DrupalUtils} from "../Utils/DrupalUtils";

export default function DrupalViewResultRowComponent({entity, viewmode}) {
    return DrupalUtils.getTemplate(entity, viewmode)
}
