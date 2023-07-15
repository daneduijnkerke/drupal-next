import { DrupalUtils } from "../Utils";
export default function DrupalNodeComponent({ node }) {
    return DrupalUtils.getTemplate(node);
}
