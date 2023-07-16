import {DrupalView} from "../Entity";
import DrupalViewResultRowComponent from "../Components/DrupalViewResultRowComponent";

export default async function node({entity}: {entity: DrupalView}) {
    const view = entity;
    const results = await view.getResults();
    console.log(view);

    const classes = [
        'view',
        'view-' + view.sub_entity.replaceAll('_', '-'),
    ];

    return (
        <div className={classes.join(' ')}>
            { results.data.map((entity) => {
                return (
                    <div className="view view-row">
                        <DrupalViewResultRowComponent entity={entity} viewmode={view.view_mode}/>
                    </div>
                );
            }) }
        </div>
    );
}
