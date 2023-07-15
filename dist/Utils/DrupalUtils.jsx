import fs from "fs";
import path from "path";
import dynamic from "next/dynamic";
export class DrupalUtils {
    static readJsonFile(path) {
        const file = fs.readFileSync(path, "utf8");
        return JSON.parse(file);
    }
    static getConfigFile(dir = __dirname) {
        const FILE_NAME = 'drupal_next.config.json';
        let ls = fs.readdirSync(dir);
        if (ls.includes(FILE_NAME))
            return path.join(dir, FILE_NAME);
        else if (dir == '/')
            throw new Error(`Could not find ${FILE_NAME}`);
        else
            return this.getConfigFile(path.resolve(dir, '..'));
    }
    static getConfig() {
        const file = this.getConfigFile();
        return this.readJsonFile(file);
    }
    static getTemplatesDir() {
        const configFile = this.getConfigFile();
        const projectRoot = configFile.replace('/drupal_next.config.json', '');
        const src = fs.existsSync(projectRoot + '/DrupalTemplates') ? '/app' : '/src/app';
        return projectRoot + src + '/DrupalTemplates';
    }
    static getTemplate(entity) {
        const templateEntity = entity.constructor.name;
        const baseTemplate = entity.entity;
        const bundle = entity.bundle;
        const templatesDir = DrupalUtils.getTemplatesDir() + '/' + templateEntity + '/';
        if (bundle && fs.existsSync(templatesDir + baseTemplate + '_' + bundle + '.tsx')) {
            const Content = dynamic(() => import('app/DrupalTemplates/' + templateEntity + '/' + baseTemplate + '_' + bundle), {
                ssr: true,
                loading: () => <p>Loading...</p>,
            });
            return <Content entity={entity}/>;
        }
        const Content = dynamic(() => import('../Templates/' + baseTemplate), {
            ssr: true,
            loading: () => <p>Loading...</p>,
        });
        return <Content entity={entity}/>;
    }
}
