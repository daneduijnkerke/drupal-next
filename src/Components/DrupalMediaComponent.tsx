import dynamic from "next/dynamic";
import {DrupalMedia} from "../Entity";
import {DrupalUtils} from "../Utils";

export default function DrupalMediaComponent({media}: {media: DrupalMedia}) {
    return DrupalUtils.getTemplate(media)
}
