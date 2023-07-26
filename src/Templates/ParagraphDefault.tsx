import {DrupalParagraph} from "../Entity";
import DrupalUtils from "../Utils/DrupalUtils";
import SearchParamsDefault from "../SearchParams/SearchParamsDefault";

export default async function ParagraphDefault(entity: DrupalParagraph, searchParams: SearchParamsDefault = {}) {
    const paragraph = entity;

    const title = (
        <h2>I am a {paragraph.entity} default template.</h2>
    )

    const entity_name = paragraph.entity!;
    const entity_clean_name = DrupalUtils.toCleanName(entity_name);
    const bundle_name = paragraph.bundle!;
    const bundle_clean_name = DrupalUtils.toCleanName(bundle_name);

    const template_suggestion = `${entity_clean_name}${bundle_clean_name}`;

    const entityName = DrupalUtils.ucfirst(paragraph.entity ?? '');
    const body = (
        <>
        <p>To override this template, create a new component named {template_suggestion}.tsx with the following content:</p><br/>
        <p>
        <code>
            export default async function {template_suggestion}({entity_name}: Drupal{entityName}) {"{"} <br/>
            &nbsp;&nbsp;// Some code
            <br/><br/>
            &nbsp;&nbsp;const classes = [<br/>
            &nbsp;&nbsp;&nbsp;&nbsp;'{entity_name}',<br/>
            &nbsp;&nbsp;&nbsp;&nbsp;'{entity_name}-' + {entity_name}.bundle,<br/>
            &nbsp;&nbsp;];
            <br/><br/>
            &nbsp;&nbsp;return (<br/>
            &nbsp;&nbsp;&nbsp;&nbsp;{"<div className={classes.join(' ')}>"}<br/>
            &nbsp;&nbsp;&nbsp;&nbsp;// Some code...<br/>
            &nbsp;&nbsp;&nbsp;&nbsp;{"</div>"}<br/>
            &nbsp;&nbsp;);<br/>
            {"}"} <br/>
        </code>
        </p>
        <br/><br/>
        <p>
            Then define your new template in the drupal_next.themes.js file like this:
        </p><br/>
        <p>
            <code>
            "{entity_name}": {"{"} <br/>
            &nbsp;&nbsp;"{bundle_name}": {"{"}<br/>
            &nbsp;&nbsp;&nbsp;&nbsp;"default": {template_suggestion}<br/>
            &nbsp;&nbsp;{"}"},<br/>
            {"}"}
            </code>
        </p><br/><br/>
        <p>Example file structure:</p><br/>
        <p>
            <code>
            app<br/>
            -- DrupalTemplates<br/>
            ---- Drupal{entityName}<br/>
            ------ {template_suggestion}.tsx<br/>
            </code>
        </p>
        </>
    );

    return (
        <div className="paragraph" style={{padding: '20px 0'}}>
            { title }
            { body }
        </div>
    );
}
