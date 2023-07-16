import {DrupalParagraph} from "../Entity";
import {DrupalUtils} from "../Utils";

export default async function paragraph({entity}: {entity: DrupalParagraph}) {
    const paragraph = entity;

    const title = (
        <h2>I am a {paragraph.entity} default template.</h2>
    )


    const template_suggestion = `${paragraph.entity}_${paragraph.bundle}.tsx`;

    const entityName = DrupalUtils.ucfirst(paragraph.entity ?? '');
    const body = (
        <>
            <p>Use the following file name (<i>{template_suggestion}</i>) under a folder named Drupal{entityName} inside the DrupalTemplates directory.</p><br/>
        <p><b>Example:</b></p>
        <p>
            app<br/>
            -- DrupalTemplates<br/>
            ---- Drupal{entityName}<br/>
            ------ {template_suggestion}<br/>
        </p>
        </>
    );

    return (
        <div className="paragraph">
            { title }
            { body }
        </div>
    );
}
