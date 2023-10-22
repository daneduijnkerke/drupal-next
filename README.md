# drupal-next

A package to connect Drupal's JSON:API with a NextJS frontend. This package contains tools to make it easier to develop a fancy frontend in NextJS with a Drupal headless backend. The package normalizes the data and contains dynamic templating to theme every entity.

[![NPM Version](https://img.shields.io/npm/v/drupal-next.svg)](https://www.npmjs.com/package/drupal-next)
[![License](https://img.shields.io/npm/l/drupal-next.svg)](https://github.com/daneduijnkerke/drupal-next/blob/master/LICENSE)

## Installation

Use npm to install this package:

```bash
npm install drupal-next
```

In the project root, create a **_drupal_next.config.json_** file containing the following key/value pairs:

```json
{
    "protocol": "http://",
    "host": "localhost",
    "api": "/jsonapi/",
    "router": "/router/translate-path?path=",
    "bearer": "{SOME BEARER TOKEN, WHEN USING BASIC AUTH}"
}
```
* Set protocol to desired protocol (http or https)
* Set host to desired hostname pointing to where your backend is located, localhost or project.local for example.
* Set api as the prefix used in Drupal, usually /jsonapi/ by default.
* Keep router as it is. This is used from the contrib module "decoupled_router"
* Remove the bearer line, or set it to null when you are **not** using basic auth.

In the project root, create a drupal_next.theme.js file. This can be empty for now.
```javascript
module.exports = {
    "node": {
    }
}
```

Add the drupal-next package as a transpile package to the next.config.js
```javascript
const nextConfig = {
    transpilePackages: ['drupal-next'],
}

module.exports = nextConfig
```

## Installation backend
To make this package work with your backend. Some core & contrib modules might be required.
* serialization
* jsonapi
* (optional) jsonapi_extras
* decoupled_router
  * This is used for the node resolving
* jsonapi_views
  * Used to fetch a view resource based on a display id of the view.

## Usage

### Resolving nodes by paths
To resolve nodes by (alias) paths, create a dynamic segment which covers all possible patterns.
```
[project_root]/src/app/[[...slug]]/page.tsx
```
**page.tsx**
```typescript
import DrupalNodeComponent from "drupal-next/Components/DrupalNodeComponent";
import DrupalClient from "drupal-next/DrupalClient";

type Params = {
    params: {
        slug: string[]
    }
}

export default async function Page({ params, searchParams } : Params) {
    let currentPath = '/' + String(params.slug ?? '').replaceAll(',', '/');
    
    let node = await DrupalClient.resolveNode(currentPath);

    return (
        <main>
            <DrupalNodeComponent node={node} searchParams={searchParams} />
        </main>
    )
}
```

The _**node**_ variable contains the normalized node object which can be used in drupal-next's **_DrupalNodeComponent_**. Now this node object contains the fields and values of the fetched node. To use these values in your frontend, you can override the default template. The DrupalNodeComponent will dynamically load the correct template for this bundle. When there is no override found, it falls back to its default template, which only contains a Title field and a body field. To override the template, read the next section.

### Theming and overiding templates

Drupal-next allows theming for all entities, including bundles and even viewmodes. To do this, you only need to define your template and let drupal-next know about it.

#### Creating a template
In your app root (ie: **_[project_root]/src/app_**) create a new folder named **_DrupalTemplates_**. In here we can define all the custom templates. To keep it organized, use folders for entites and keep the naming and structure used in drupal-next entities and. For example, a node entity in drupal-next is called a **_DrupalNode_**. So to override a node entity with bundle page, create a folder named **_DrupalNode_** in the **_DrupalTemplates_** folder. In this folder we can define all our node templates with specific bundles. In the **_DrupalNode_** folder create your template file as **_NodePage.tsx_**. To keep this organized, keep the file name structure of **_EntityBundle.tsx_** or **_EntityBundleViewmode.tsx_** when using any other viewmode besides the default. 

Example structure:
```
project-root
├── src
│   └── app
│       └── DrupalTemplates
│           ├── DrupalNode
│           │   ├── NodePage.tsx
│           │   └── NodeBlog.tsx
│           │   └── NodeBlogTeaser.tsx
│           ├── DrupalParagraph
│           │   ├── ParagraphText.tsx
│           │   └── ParagraphImage.tsx
```

Back to our example, edit **_NodePage.tsx_** to define your own layout with your own fields. In this example we use a simple node which contains:
* header image
  * In this example we use responsive images. This example has a responsive image in the backend named **_header_banner_**
* title
* paragraphs
```typescript
export default async function NodePage(node: DrupalNode, searchParams) {
    // Get the node title and wrap it in a h1 tag.
    const title = (
        <h1>{node.title}</h1>
    );

    // Get the header image.
    const header_image: DrupalMedia = await node.get('field_header_image');

    // Get the paragraphs.
    const paragraphs = await node.get('field_paragraphs');

    // The css classes within the article.
    const classes = [
        'node',
        'node-' + node.bundle,
    ];

    // Render the actual node.
    return (
        <article className={classes.join(' ')}>
            <div className="header">
                <div className="header-inner text">
                    {title}
                </div>
                <DrupalResponsiveImageComponent media={header_image} responsive_image_style_id='header_banner' />
            </div>
            <div id="content" className="content">
            {
                paragraphs.map((paragraph: DrupalParagraph) => <DrupalParagraphComponent key={paragraph.id} paragraph={paragraph} searchParams={searchParams}/>)
            }
            </div>
        </article>
    );
}
```

Please note that sometimes your fields might contain empty values. Maybe you do not always want to render the header image for example. Besides the **_.get()_** method, you can also use the **_.notEmpty()_** method to check for empty values or use the **_.has()_** method to check if the field actually exists on the entity.

Example:
```typescript
// Boolean to check wether this field has content or not.
const hasHeader = node.notEmpty('field_header_image');

// Only render the media when this boolean equals true.
{ hasHeader && media instanceof DrupalMedia && <DrupalResponsiveImageComponent media={media} responsive_image_style_id='header_banner' /> }
```

#### Linking the template

To let drupal-next know about the new template, we need to edit the **_drupal_next.theme.js_** file. The file consists of an object with entity types as the first key, where their sub key corresponds to a bundle and their sub keys correspods to view modes. For now view modes are only used in drupal views, for example to create a blog overview page. Use 'default' as viewmode to render its default view mode.

```javascript
module.exports = {
    "node": {
        "page": {
            "default": NodePage,
        },
        "blog": {
            "default": NodeBlog,
            "teaser": NodeBlogTeaser,
        },
    },
    "paragraph": {
        "text": {
            "default": ParagraphText
        },
        "image": {
            "default": ParagraphImage
        },
    }
}
```
Make sure the template files are imported at the top of the file. Example:
```javascript
import NodePage from "@DrupalTemplates/DrupalNode/NodePage";
```

### Rendering a menu
drupal-next can load a menu based on just its machine name. It will load all its menu items with its configured weight into a **_DrupalEntityCollection\<DrupalMenuItem>_**. The entity collections allows for looping through all its menu items.

Example renders a main menu inside the **_layout.tsx_** Nav is a custom components which actually renders the items.
```typescript
const menu: DrupalEntityCollection<DrupalMenuItem> = JSON.parse(JSON.stringify(await DrupalClient.getMenu('main')));

return (
  <html lang="en">
    <body className={inter.className}>
      <header>
        <div id="logo">DaneIT.nl</div>
        <Nav menuItems={menu.data} />
      </header>
      {children}
    </body>
  </html>
```
Nav component:
```typescript
export default function Nav({menuItems}: {menuItems: DrupalMenuItem[]}) {
  const pathname = usePathname();
  
  const content = (
          <ul>
              {
                menuItems.map((menuItem: DrupalMenuItem) => {
                  const firstSlug = (menuItem.link.full_url ?? '').split('/');
                  const isActive = pathname == ('/' + firstSlug[1])

                  return (
                    <li key={menuItem['id']}>
                        <Link
                          className={isActive ? 'active' : ''}
                          href={menuItem.link.full_url ?? ''}
                          key={menuItem.id}
                        >
                          {menuItem.title}
                        </Link>
                    </li>
                  );
                })
              }
          </ul>
  );

  return (
    <nav className="main-menu">
      { content }
    </nav>
);
}
```

## Overview of usable components currently in drupal-next
* **DrupalEntityComponent**
  * A base entity component used to render entities where the type is unknown. For example this is used in a DrupalView to dynamically render its entities from a DrupalEntityCollection. You should not really need besides dynamically rendering entities.
* **DrupalNodeComponent**
  * A DrupalNodeComponent renders a node object into HTML. It automatically selects the correct template for it depnding on the bundle and viewmode set in the node object. 
  * Example renders a node fetched from a path. Typically this happends in page.tsx inside the dynamic segment. See "_Resolving nodes by paths_" for more info.
```typescript
const currentPath = '/' + String(params.slug ?? '').replaceAll(',', '/');
const node = await DrupalClient.resolveNode(currentPath);

return (
  <main>
      <DrupalNodeComponent node={node} searchParams={searchParams} />
  </main>
);
```
* **DrupalMediaComponent**
  * A DrupalMediaComponent renders a media file used in Drupal's media library. Currently it only handles images, but will soon handle videos and documents aswell. Note it will render the **original file** attached to the media entity.
  * Example renders an icon from a node's field_icon inside a node template:
```typescript
const icon: DrupalMedia | null = node.has('field_icon') ? await node.get('field_icon'): null

return (
    <div className="icon">
        { icon instanceof DrupalMedia && <DrupalMediaComponent media={icon} /> }
    </div>
);
```
* **DrupalImageComponent**
  * A DrupalImageComponent renders an image with an image style. Instead of using the DrupalMediaComponent, which only renders the original image, use this component to use an image style with it.
  * Example renders an image used as a blog teaser in a blog teaser node template.
```typescript
const media: DrupalMedia | null = node.has('field_image') ? await node.get('field_image'): null

return (
    <div className={classes.join(' ')}>
        <h3>{ node.title }</h3>
        // More HTML....
        { media instanceof DrupalMedia && <DrupalImageComponent media={media} image_style_id={"blog_item"} /> }
    </div>
);
```
* **DrupalResponsiveImageComponent**
  * Basically the same as a DrupalImageComponent, but with responsive image styles. Instead of setting an image style, you can set a responsive image style.
  * Example creates a header image with a responsive image style (header_banner) in Drupal with specified breakpoints in a breakpoints.yml file.
```typescript
const header_image: DrupalMedia | null = node.has('field_header_image') ? await node.get('field_header_image'): null
const hasHeader = node.notEmpty('field_header_image');

return (
    // More HTML...
    { hasHeader && media instanceof DrupalMedia && <DrupalResponsiveImageComponent media={header_image} responsive_image_style_id='header_banner' /> }
    // More HTML...
);
```
* **DrupalParagraphComponent**
  * A DrupalParagraphComponent handles most functionalities that the commonly used paragraph contrib module (https://drupal.org/project/paragraphs) would do.
  * Example renders paragraphs from a reference field in a node.
```typescript
  const paragraphs = await node.get('field_content');

  return(
    <div id="content" className="content">
      {
        paragraphs.map((paragraph: DrupalParagraph) => <DrupalParagraphComponent key={paragraph.id} paragraph={paragraph} searchParams={searchParams}/>)
      }
    </div>
  );
```
* **DrupalViewComponent**
  * A DrupalViewComponent handles most functionalities a Drupal View would do. It can use sorting, filters and even pagers. 
  * Example renders a view, configured in Drupal, using a view reference field inside a paragraph.
```typescript
  const view = await paragraph.get('field_view');

  const classes = [
    'paragraph',
    'paragraph-' + paragraph.bundle,
  ];
    
  return (
    <section className={classes.join(' ')}>
      <DrupalViewComponent view={view} />
    </section>
  );
```
* **DrupalUserComponent**
  * Coming soon!

## Overview of usable entities currently in drupal-next
The documentation is not complete yet. You can debug every entity by using a console.log on the entity to see its available fields. Below are some examples which should get you going.

drupal-next has some entities build in, and entities can be extended in your own project. Currently drupal-next has the following entities build in:
Note all entities extends DrupalEntity and thus all these entities also contain the parents fields.
* **DrupalEntity**
  * This is the base entity, other entities extend.
  * Fields:
    * id
    * type
    * entity
    * bundle
    * langcode
    * default_langcode
    * status
    * changed
    * created
    * fields
      * All the entities fields, configured using the Field UI.
    * key_conversions
      * A map to convert keys (fields) when necessary.
      * An example of this is visible in the DrupalMedia entity where it overrides the JSON:API id to a shorter version.
```typescript
export class DrupalMedia extends DrupalEntity implements DrupalMediaInterface {
    mid: string | null = null;
    name: string | null = null;
    path: Record<string, string> | null = null;
    files: DrupalFile[] = [];
  
    override key_conversions = {
        'drupal_internal__mid': 'mid',
    };
    
    //...
```
* .
  * Methods:
```typescript
    public has(field: string) // Checks if this entity has a field.
    public notEmpty(field: string) // Checks if a certain field is not empty.
    public async get(field: string) // Gets the value of a specific field. Async because it might contain different entities (used in entity reference fields).
```
* **DrupalEntityCollection**
  * In JSON:API you can get a collection of multiple entities of a specific type. The EntityCollection can handle these type of requests. This is also used in DrupalView
  * Fields:
    * type
      * A string telling what type of entities this collection contains.
    * data
      * A list of the entities.
    * key_conversions
* **DrupalFile**
  * A file entity which represents a file uploaded in the Drupal file system. 
  * Fields:
    * fid
    * filename
    * filemime
    * filesize
    * uri
  * Methods:
```typescript
    getAbsolutePath(): string | null
```
* **DrupalLink**
  * A link entity, currently only used in menu items.
  * Fields:
    * uri
    * full_url
    * title
    * options
* **DrupalMedia**
  * A Media entity used by the Media Library.
  * Fields:
    * mid: string | null;
    * name: string | null;
    * path: Record<string, string> | null;
    * files: DrupalFile[];
  * Methods:
```typescript
    getFile(): DrupalFile | null
    getFiles(): DrupalFile[] 
```
* **DrupalMenuItem**
  * A Drupal menu item (or menu_link_content in Drupal)
  * Fields:
    * mid
    * enabled
    * title
    * description
    * menu_name
    * external
    * rediscover
    * weight
    * expanded
    * parent
    * link
* DrupalNode
* DrupalParagraph
* DrupalView
  * Has basic view features, it's recommended to use DrupalViewDisplay but it requires jsonapi_views in your backend.
* DrupalViewDisplay
  * More advanced component to render Drupal Views, works with different view displays, filters, sorting and pager.
* DrupalUser (COMING SOON)