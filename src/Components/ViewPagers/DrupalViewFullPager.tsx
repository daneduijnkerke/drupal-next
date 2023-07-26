import {DrupalViewDisplay} from "../../Entity/DrupalViewDisplay";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faChevronLeft,
    faChevronRight
} from "@fortawesome/free-solid-svg-icons";
import styles from "./views_full_pager.module.css"
import React from "react";

export default function DrupalViewFullPager({current_page, view}: {current_page: number, view: DrupalViewDisplay}) {
    const view_id: string = view.vid + "_" + view.display_mode;
    const pagesToShow: number = view.pager.options.quantity;
    const totalPages: number = view.pager.options.total_pages;

    // Pages array to render.
    let pages: React.ReactElement[] = [];

    const leadingEllipsis = pagesToShow < totalPages && current_page > 0 && current_page > Math.floor((pagesToShow - 1) / 2);
    const trailingEllipsis = pagesToShow < totalPages && current_page < totalPages - 1 && current_page < totalPages - 1 - Math.floor((pagesToShow) / 2);


    // Check leading ellipses.
    if (leadingEllipsis) {
        if (current_page > Math.floor((pagesToShow -1) / 2)) {
            pages.push(<li>...</li>);
        }
    }

    // Show pages, based on pagesToShow variable.
    let minPage = Math.max(0, current_page - Math.floor((pagesToShow - 1) / 2));
    let maxPage = minPage + pagesToShow - 1;

    // Check if we reached the end or beginning to render more before or after the current (first or last) page.
    if (maxPage >= totalPages) {
        maxPage = totalPages - 1;
        minPage = Math.max(0, maxPage - (pagesToShow - 1));
    }

    // Loop through min pages and max pages to show.
    for (let i = minPage; i <= maxPage; i++) {
        pages.push(
            <li className={"pager-item pager-item-page " + styles.pager_item + " " + styles.pager_item_page + " " + (current_page === i && styles.pager_current)}>
                <a className={styles.pager_link} href={"?vid=" + view_id + "&page="+String(i) + "#" + view_id}>{i+1}</a>
            </li>
        );
    }

    // Check tailing ellipses.
    if (trailingEllipsis) {
        if (current_page < totalPages - Math.ceil(pagesToShow / 2)) {
            pages.push(<li>...</li>);
        }
    }

    return (
        <nav className="pager pager-mini">
            <ul className={"pager-items " + styles.pager_items}>
                { current_page > 0 &&
                <li className={"pager-item pager-item-first " + styles.pager_item + " " + styles.pager_item_first}>
                    <a className={styles.pager_link} href={"?vid=" + view_id +"&page=0" + "#" + view_id}>
                        <FontAwesomeIcon
                            icon={faChevronLeft}
                            className={styles.arrow_icon_first_last}
                        />
                        <span className={"pager-item-title " + styles.pager_item_title}>First</span>
                        <span className="visually-hidden">First page</span>
                    </a>
                </li>
                }
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
                { pages }
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
                { current_page < totalPages -1 &&
                <li className={"pager-item pager-item-first " + styles.pager_item + " " + styles.pager_item_last}>
                    <a className={styles.pager_link} href={"?vid=" + view_id +"&page=" + (totalPages -1) + "#" + view_id}>
                        <span className={"pager-item-title " + styles.pager_item_title}>Last</span>
                        <FontAwesomeIcon
                        icon={faChevronRight}
                        className={styles.arrow_icon_first_last}
                        />
                        <span className="visually-hidden">Last page</span>
                    </a>
                </li>
                }
            </ul>
        </nav>
    )
}
