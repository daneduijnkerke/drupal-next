import {DrupalParagraph} from "../Entity";
import {DrupalUtils} from "../Utils/DrupalUtils";

export default function DrupalParagraphComponent({paragraph}: {paragraph: DrupalParagraph}) {
    return DrupalUtils.getTemplate(paragraph)
}
