import { DrupalUtils } from "../Utils/DrupalUtils";
export default function DrupalParagraphComponent({ paragraph }) {
    return DrupalUtils.getTemplate(paragraph);
}
