import dynamic from "next/dynamic";
import {DrupalClient} from "../client";

export default function DrupalParagraphComponent({paragraph}) {

    const fs = require('fs');
    const templateEntity = paragraph.constructor.name;
    const baseTemplate = 'paragraph';

    const bundle = paragraph.bundle;

    // Check for template override.
    const templatesDir = DrupalClient.getTemplatesDir() + '/' + templateEntity + '/';
    if (bundle && fs.existsSync(templatesDir + baseTemplate + '_' + bundle + '.tsx')) {
        const Content = dynamic(() => import('DrupalTemplates/' + templateEntity + '/' + baseTemplate + '_' + bundle), {
            ssr: true,
            loading: () => <p>Loading...</p>,
        })

        return <Content paragraph={paragraph}/>;
    }

    const Content = dynamic(() => import('../Templates/' + baseTemplate), {
        ssr: true,
        loading: () => <p>Loading...</p>,
    })

    return <Content paragraph={paragraph}/>;

}
