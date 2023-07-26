"use strict";

import DrupalClient from "../DrupalClient";
import NodeDefault from "../Templates/NodeDefault";
import MediaDefault from "../Templates/MediaDefault";
import ParagraphDefault from "../Templates/ParagraphDefault";
import ViewDefault from "../Templates/ViewDefault";

export default class DrupalUtils {
    public static default_templates = {
        "node": NodeDefault,
        "media": MediaDefault,
        "paragraph": ParagraphDefault,
        "view": ViewDefault,
    };

    static getBreakpoints() {
        return require('/drupal_next.breakpoints.js');
    }

    static getTheme() {
        return  require('/drupal_next.theme.js');
        // const fs = require('fs');
        // const path = require('path');
        // const fullModulePath = path.resolve('drupal_next.theme.js');
        //
        // if (fs.existsSync(fullModulePath)) {
        // } else {
        //     console.error('Theme file not found:', fullModulePath);
        // }
        //
        // return {};
    }

    static getConfig() {
        return require('/drupal_next.config.json');
        // const file = this.getConfigFile();
        // return this.readJsonFile(file);
    }

    static ucfirst(str: string): string {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }
    static buildQueryOptions(options) {
        let params = '';
        if (Object.values(options).length > 0) {
            params = '?';
            Object.keys(options).forEach((key) => {
                params = params + key + '=' + options[key] + '&';
            });
            params = params.slice(0, -1);
        }
        return params;
    }

    static toCleanName(machine_name) {
        const machine_name_separations = machine_name.split('_')
        let machine_name_str = '';
        machine_name_separations.forEach(separation => {
            machine_name_str = machine_name_str + DrupalUtils.ucfirst(separation);
        });
        return machine_name_str;
    }

    static resolveDefaultTemplate(entity_template) {
        return this.default_templates[entity_template];
    }

    static resolveTemplate(entity, viewmode = 'default', searchParams) {
        const theme = DrupalClient.getTheme();
        const entity_template = entity.entity;
        const bundle_template = entity.bundle;
        const default_template = this.resolveDefaultTemplate(entity_template);

        if (!theme.hasOwnProperty(entity_template) ||
            !theme[entity_template].hasOwnProperty(bundle_template) ||
            !theme[entity_template][bundle_template].hasOwnProperty(viewmode)) {
            return default_template(entity, searchParams);
        }

        if (theme[entity_template][bundle_template][viewmode]) {
            return theme[entity_template][bundle_template][viewmode](entity, searchParams);
        }

        return default_template(entity, searchParams);
    }

    static getTemplate(entity, viewmode='') {
        let kak = entity;
        let kakje = viewmode;
        kak = kak + undefined;
        kakje = kakje + '';
        return;
        // const templateEntity = entity.constructor.name;
        // const baseTemplate = entity.entity;
        // const bundle = entity.bundle;
        //
        // const templatesDir = DrupalUtils.getTemplatesDir() + '/' + templateEntity + '/';
        // // Check with viewmode.
        // if (viewmode && bundle && fs.existsSync(templatesDir + baseTemplate + '_' + bundle + '_' + viewmode + '.tsx')) {
        //     const Content = dynamic<ContentProps>(() => import('app/DrupalTemplates/' + templateEntity + '/' + baseTemplate + '_' + bundle + '_' + viewmode), {
        //         ssr: true,
        //         loading: () => <p>Loading...</p>,
        //     })
        //
        //     return <Content entity={entity}/>;
        // }
        // // Check without viewmode.
        // if (bundle && fs.existsSync(templatesDir + baseTemplate + '_' + bundle + '.tsx')) {
        //     const Content = dynamic<ContentProps>(() => import('app/DrupalTemplates/' + templateEntity + '/' + baseTemplate + '_' + bundle), {
        //         ssr: true,
        //         loading: () => <p>Loading...</p>,
        //     })
        //
        //     return <Content entity={entity}/>;
        // }
        //
        // // Temp fix for client components.
        // // if (baseTemplate === 'view') {
        // //     // Default node template.
        // //     return <View entity={entity}/>;
        // // }
        //
        // // Default node template.
        // const Content = dynamic<ContentProps>(() => import('../Templates/' + baseTemplate), {
        //     ssr: true,
        //     loading: () => (<p>Loading...</p>),
        // })
        //
        //
        // return <Content entity={entity}/>;
    }

}
// interface ContentProps {
//     entity: any
// }
// interface ContentViewProps {
//     entity: DrupalView
// }