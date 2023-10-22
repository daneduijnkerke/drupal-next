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

    static getTheme() {
        return  require('/drupal_next.theme.js');
    }

    static getConfig() {
        return require('/drupal_next.config.json');
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
}