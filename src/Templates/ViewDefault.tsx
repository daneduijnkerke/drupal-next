import {DrupalEntity} from "../Entity";
import DrupalViewPagerComponent from "../Components/DrupalViewPagerComponent";
import DrupalEntityComponent from "../Components/DrupalEntityComponent";
import SearchParamsView from "../SearchParams/SearchParamsView";
import {DrupalViewDisplay} from "../Entity/DrupalViewDisplay";

export default async function ViewDefault(view: DrupalViewDisplay, searchParams: SearchParamsView = {}) {
    let currentPage: number = 0;

    if (searchParams.hasOwnProperty('vid') && (view.vid + '_' + view.display_mode) === searchParams.vid) {
        currentPage = +searchParams.page! ?? 0;
    }

    const results = await view.getResults(currentPage);
    const entity_view_mode = view.view_mode ?? 'default';

    const classes = [
        'view',
    ];

    if (typeof view.sub_entity === "string") {
        const view_class = 'view-' + view.sub_entity.replaceAll('_', '-');
        classes.push(view_class);
    }

    return (
        <div id={view.vid + "_" + view.display_mode} className={classes.join(' ')}>
            <div className="view-inner">
            {
                results.data.map((sub_entity: DrupalEntity) =>
                    <div className="view-row">
                        <DrupalEntityComponent key={sub_entity.id} entity={sub_entity} viewmode={entity_view_mode} searchParams={searchParams}/>
                    </div>
                )
            }
            </div>
            <DrupalViewPagerComponent current_page={currentPage} view={view}/>
        </div>
    );
}
