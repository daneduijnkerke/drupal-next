var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
export default function paragraph({ paragraph }) {
    return __awaiter(this, void 0, void 0, function* () {
        const title = (<h2>{yield paragraph.get('field_title')}</h2>);
        const field_text = yield paragraph.get('field_text');
        const content = (`<span>${field_text.processed}</span>`);
        return (<div className={paragraph.bundle}>
            <h1>NORMAL PARAGRAPH</h1>
            {title}
            <div dangerouslySetInnerHTML={{ __html: content }} className="paragraph-inner"></div>
        </div>);
    });
}
