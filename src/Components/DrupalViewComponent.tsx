import {DrupalView} from "../Entity";
import {DrupalUtils} from "../Utils/DrupalUtils";

export default function DrupalViewComponent({view}: {view: DrupalView}) {
    return DrupalUtils.getTemplate(view)
}
