import {DrupalParagraph} from "../Entity";

export default async function paragraph({entity}: {entity: DrupalParagraph}) {
    const paragraph = entity;

    const title = (
        <h2>{await paragraph.get('field_title')}</h2>
    );

    const field_text = await paragraph.get('field_text');
    const content = (
        `<span>${field_text.processed}</span>`
    );

    return (
        <div className="paragraph">
            {title}
            <div dangerouslySetInnerHTML={{__html: content}} className="paragraph-inner"></div>
        </div>
    );
}
