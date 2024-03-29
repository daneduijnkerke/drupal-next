import {DrupalNode} from "../Entity";
import SearchParamsDefault from "../SearchParams/SearchParamsDefault";

export default async function NodeDefault(entity: DrupalNode, searchParams: SearchParamsDefault = {}) {
    const node = entity;

    const title = (
        <h1>{node.title}</h1>
    );

    const body = await node.get('body');
    const content = (
        `<span>${body.processed}</span>`
    );

    return (
        <div className="node">
            {title}
            <div dangerouslySetInnerHTML={{__html: content}} className="node-inner"></div>
        </div>
    );
}
