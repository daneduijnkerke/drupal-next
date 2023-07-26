import DrupalViewMiniPager from "./ViewPagers/DrupalViewMiniPager";
import {DrupalViewDisplay} from "../Entity/DrupalViewDisplay";
import DrupalViewFullPager from "./ViewPagers/DrupalViewFullPager";

export default function DrupalViewPagerComponent({current_page, view}: {current_page: number, view: DrupalViewDisplay}) {
    switch(view.pager.type) {
        case 'mini': {
            return (
                <DrupalViewMiniPager current_page={current_page} view={view} />
            )
            break;
        }
        case 'full': {
            return (
                <DrupalViewFullPager current_page={current_page} view={view} />
            )
            break;
        }
        default: {
            return;
        }
    }
}
