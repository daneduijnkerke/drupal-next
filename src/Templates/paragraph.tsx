
export default async function paragraph({paragraph}) {
    const title = (
        <h2>{await paragraph.get('field_title')}</h2>
    );
    const field_text = await paragraph.get('field_text');
    const content = (
        `<span>${field_text.processed}</span>`
    );

    return (
        <div className={paragraph.bundle}>
            <h1>NORMAL PARAGRAPH</h1>
            {title}
            <div dangerouslySetInnerHTML={{__html: content}} className="paragraph-inner"></div>
        </div>
    );
}
