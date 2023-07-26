import {DrupalParagraph} from "../Entity";
import DrupalUtils from "../Utils/DrupalUtils";
import SearchParamsDefault from "../SearchParams/SearchParamsDefault";

interface ParagraphProps {
    paragraph: DrupalParagraph,
    viewmode?: string,
    searchParams?: SearchParamsDefault
}

export default function DrupalParagraphComponent({paragraph, viewmode = 'default', searchParams}: ParagraphProps) {
    return DrupalUtils.resolveTemplate(paragraph, viewmode, searchParams)
}
