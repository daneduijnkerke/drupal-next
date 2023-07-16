var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { DrupalUtils } from "../Utils";
export default function paragraph({ entity }) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        const paragraph = entity;
        const title = (<h2>I am a {paragraph.entity} default template.</h2>);
        const template_suggestion = `${paragraph.entity}_${paragraph.bundle}.tsx`;
        const entityName = DrupalUtils.ucfirst((_a = paragraph.entity) !== null && _a !== void 0 ? _a : '');
        const body = (<>
            <p>Use the following file name (<i>{template_suggestion}</i>) under a folder named Drupal{entityName} inside the DrupalTemplates directory.</p><br />
        <p><b>Example:</b></p>
        <p>
            app<br />
            -- DrupalTemplates<br />
            ---- Drupal{entityName}<br />
            ------ {template_suggestion}<br />
        </p>
        </>);
        return (<div className="paragraph">
            {title}
            {body}
        </div>);
    });
}
