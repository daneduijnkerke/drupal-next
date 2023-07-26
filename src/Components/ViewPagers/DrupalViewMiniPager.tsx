import {DrupalViewDisplay} from "../../Entity/DrupalViewDisplay";
import "@fortawesome/fontawesome-svg-core/styles.css";
import styles from './views_mini_pager.module.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faChevronLeft,
    faChevronRight
} from "@fortawesome/free-solid-svg-icons";


export default function DrupalViewMiniPager({current_page, view}: {current_page: number, view: DrupalViewDisplay}) {
    const view_id: string = view.vid + "_" + view.display_mode;
    const totalPages: number = view.pager.options.total_pages;

    return (
        <nav className="pager pager-mini">
            <ul className={"pager-items " + styles.pager_items}>
                { current_page > 0 &&
                <li className={"pager-item pager-item-prev " + styles.pager_item}>
                    <a className={styles.pager_link} href={"?vid=" + view_id +"&page=" + String(current_page - 1) + "#" + view_id}>
                        <FontAwesomeIcon
                            icon={faChevronLeft}
                            className={styles.arrow_icon}
                        />
                        <span className="visually-hidden">Previous page</span>
                    </a>
                </li>
                }
                <li className={"pager-item pager-item-current " + styles.pager_item + " " + styles.pager_current}>
                    <span className="visually-hidden">Current page</span>
                    {current_page + 1}
                </li>
                { current_page < totalPages -1 &&
                <li className={"pager-item pager-item-next " + styles.pager_item}>
                    <a className={styles.pager_link} href={"?vid=" + view_id +"&page=" + String(current_page + 1) + "#" + view_id}>
                        <FontAwesomeIcon
                            icon={faChevronRight}
                            className={styles.arrow_icon}
                        />
                        <span className="visually-hidden">Next page</span>
                    </a>
                </li>
                }
            </ul>
        </nav>
    )
}
