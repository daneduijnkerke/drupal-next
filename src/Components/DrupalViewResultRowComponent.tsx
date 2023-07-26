import DrupalUtils from "../Utils/DrupalUtils";

export default function DrupalViewResultRowComponent({entity, viewmode}) {
    const result = DrupalUtils.resolveTemplate(entity, viewmode, []);

    return (
        <div className="view-row">
            { result }
        </div>
    );
}
