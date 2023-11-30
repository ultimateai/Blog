# The Ultimate. RnD Blog

This Blog uses [Jekyll](https://jekyllrb.com/), a static site generator, and the [Argon Theme](https://argon.jekyllthemes.io/) 
as a base, which we customized to fit our needs.

---

## Setup

### Prerequisites

[Jekyll](https://jekyllrb.com/) is a Ruby Gem, to set up this project you need:

- [Ruby](https://www.ruby-lang.org/en/downloads/) version 2.7.3 or higher, including all development headers (check your Ruby version using `ruby -v`)
- [RubyGems](https://rubygems.org/pages/download) (check your Gems version using `gem -v`)
- [GCC](https://gcc.gnu.org/install/) and [Make](https://www.gnu.org/software/make/) (check versions using `gcc -v`,`g++ -v`, and `make -v`)

Check the detailed [installation guide for macOS here](https://jekyllrb.com/docs/installation/macos/).

### Run the project locally

- Navigate to the blog directory in your terminal and run `bundle install` to install the dependencies.
- If Bundler is not installed yet, you can do so by running `gem install bundler`. 
- Run `jekyll serve` to start the Jekyll server.
- The project will be served on [http://localhost:4000/](http://localhost:4000/)

---

## Add a Blog Post or Podcast

Blog Posts and Podcasts are rendered from markdown files in `/_posts`. 
To add a new post, follow these steps:

#### 1. Create an Author
If this is the first contribution by this author, add the author 
with name, role and path to their profile picture to `/_data/blog_authors.yml`.

#### 2. Add the post and fill in the Front Matter information
Add a new markdown file in `/_posts` and add a [Front Matter](https://jekyllrb.com/docs/front-matter/) section in the following format:

```markdown
---
layout: post | podcast
title:  "The title of your post"
date:   date
description: "Two or three sentences summarizing the content. This is the text that will appear in the overview page and at the top of your article-page, telling readers what this article is about."
categories: optional categories
preview_image: path/to/the/preview.png
author: "Name of the Author"
link: "If this is a podcast link to where people can listen to it"
---
```

- **layout**: Enum { post, podcast } - Chose `post` for blog posts, these will be rendered in the overview with a link to an article page to read the full content. Chose `podcast` for podcasts that don't need a separate page. They will be rendered in the overview the same way posts are, but instead of the article they will link to an external url where the podcast is hosted.
- **title**: Title of your Post or Podcast
- **date**: Publishing Date in the format YYYY-MM-DD
- **description**: Two or three sentences summarizing the content. This is the text that will appear in the overview page and at the top of your article-page, telling readers what this article is about.
- **categories**: Adding categories (ie: ai, leadership etc.) is optional. Currently they are not used, but could be used in the future to display similar content below the article.
- **preview_image**: `path/to/the/preview.png` this image will be displayed in the overview.
- **author**: Add the author's name as it appears in `/_data/blog_authors.yml`.
- **link**: If you chose layout `podcast`, add a link to where people can listen to the podcast.

#### 3. Add content 

If you are adding a podcast, you can skip this step. 

If you are adding a post, add the content for your article page underneath the 
Front Matter information in your markdown file.

You can use headlines and horizontal rules to structure your content into 
digestible sections and use images, blockquotes, lists, tables or code blocks 
to highlight and display information.

To see an example of components and text highlighting that is available, check out 
the demo post in `/_demo-posts/2023-11-14-demo-post.md`

---

## Add or update a quote

The quotes on the careers page are defined in `_data/employee_quotes.yml`
To add a new quote, add a new entry in that yaml file with the quote, as well as name, 
role and picture of the employee.

---

## Customizing the theme

This theme can be adapted to suit your needs...

### The `_config.yml` file

You'll need to change:

- site: Change this to your website's name
- url: The full URL that your site will be hosted at, e.g. https://your-domain.com
- baseurl: Add a base URL here if you will be publishing the site inside a folder, e.g. https://your-domain.com/project/ – or if you're hosting it as a 'project page' on GitHub Pages. Example: `baseurl: /project`
- paginate: Change this to set the number of blog posts on each page. If you are using the blog grid styles, this is best in multiples of 3.

When using baseurl, you should reference images in your post/project Frontmatter **without** the baseurl, e.g. `/images/image.jpg` but images inside the Markdown content **should include** the baseurl snippet, e.g. `{{site.baseurl}}/images/image.jpg`

You can also change more advanced things here like the path names, collections etc. You do not need to change any of these to achieve the same look as the demo, so best to leave everything else unless you are confident.

### The `settings.yml` file

You'll find this inside the `_data` folder – this is where you can set all of the theme options.

**Basic settings**

`site_title` – change this to your website's title. This shows up in the browser's title bar, and in the header and footer.
`favicon_image` – change this to the location of your favicon image, which shows up in the browser's title bar.

**Header settings**

`logo_image` – if you'd like to use a logo instead of plain text title in your header, enter the link to it here.
`theme` – choose a color for your header [blue, dark, light]

**Blog settings**

`theme` – choose a format for your blog listings [basic, narrow, grid]
`read_more` – display a narrow grid of other blog posts after each blog [yes, no]

**Menu settings**

This allows you to set the links inside your menu. Add each one as a list item with a `title` and `url`. When hosting on GitHub Pages, make sure you leave a trailing `/` at the end of links to category pages (e.g. `/blog/` or `/projects/`).

**Footer settings**

`footer_tagline` – sets the text that displays on the left hand side of the footer.

**Contact settings**

The theme comes with a pre-made contact form that you can use with [Formspree](https://formspree.io/create/jekyllthemes), which is free for up to 50 submissions per month. They also have two great paid plans that offer advanced features. Use the link above to set up your account and then paste the 'endpoint' integration code into the theme settings:

`form_action` – this is the form endpoint attribute that you get from FormSpree, for example `https://formspree.io/abcdefgh`
`confirmation_url` – by default the user is shown a default Formspree thank you page. If you have a premium plan, you can use this setting to provide an alternative URL for that page, for example `/thanks` – we have included a basic thank you page with the theme.
`email_subject` – choose the subject of the email you receive from Formspree.
`send_button_text` – change the text used on the form submit button.

Hint: you can add the contact form to any page of your site using the include – `{% include contact-form.html %}` – for example if you wanted to have the contact form on your About page.

**Social settings**

Here you can add links to your profiles on social networks, and they'll be shown in the footer. Simply add your URL next to the ones you want to show.

**Advanced options**

`analytics_code` – use this option to add your Google Analytics code.
`header_js` – use this option to insert javascript into the header of the page.
`footer_js` – use this option to insert javascript at the end of the page.

---

### CSS Overrides

Inside the `/assets/styles/custom/` folder you'll find a few SASS files which contain Ultimate theme overrides.

`assets/styles/custom/_variables.scss` contains all variables the Argo Theme provides. They already are customized to the Ultimate brand. If you need to change or define any other variables, this is the place to do so.
`assets/styles/custom/_styles.scss` does the same as above just for CSS styles. You can use all SASS specific syntaxes as well as all variables defined in the file mantioned above!
`assets/styles/custom/teamtailor-widget.scss` contains style overrides for our teamtailor widget embedded in the career page.

---

### Images

Inside the `/assets/img/` folder you'll find a few images included with the theme.

`favicon.png` – you should replace this with the favicon image you'd like to use for your website.

Also we moved all brand related images into the `/assets/img/brand` folder.

---

## Main pages

The theme comes with some pages set up ready for your content.

#### Home – `/index.html`

This is your website home page. You can edit some details in the Front Matter at the top of the page:

- `title` – this sets the page title, which shows up in the browser's title bar and on search engine results, social shares etc.
- `description` – this sets the page meta description, which shows up on search engine results, social shares etc.
- `featured_image` – this sets the header image for the page, as well as the meta image, which shows up on social shares.

Below the Front Matter is the code for the page. We've included an example, but you can replace this with your own text content written in markdown.

If you want to add some pre-made sections, such as a pricing table, carousel of team members, or an accordion, following the steps below:

1. Find the component you like in `_includes/component`
2. Add it to index.html by typing `{% include components/pricing/pricing-1.html %}` replacing `/pricing/pricing-1.html` with your desired component

#### Blog – `/blog/index.html`

This is the blog listing page, which shows all your blog posts. You can edit the same things as on the home page to customise it for your website.

#### Sample Content and Other Pages

We have included some example pages in `_pages` to help you get started and easily see how the included components are displayed.

You may delete them or modify them to suit your needs.  You can edit some details in the Front Matter at the top of the page:

- `title` – this sets the page title, which shows up in the browser's title bar and on search engine results, social shares etc.
- `subtitle` – this sets the page title, which displays below the title in the header
- `description` – this sets the page meta description, which shows up on search engine results, social shares etc.
- `featured_image` – this sets the header image for the page, as well as the meta image, which shows up on social shares.
- `layout` – this sets the layout for the page. You can choose from page-heading, no-page-heading or page. Page-heading shows a banner, no-page-header has no heading at all and page has a simple text heading.

Below the Front Matter is the code for the page. We've included all of the components built into the theme as an example, but you can replace this with your own text content written in markdown.

If you want to add some pre-made sections, such as a pricing table, carousel of team members, or an accordion, following the steps below:

1. Find the component you like in `_includes/component`
2. Add it to index.html by typing `{% include components/pricing/pricing-1.html %}` replacing `/pricing/pricing-1.html` with your desired component

#### Modify components with your content

If you want to modify these components, we recommend the workflow below:

1. Find the component you like in `_includes/component`
2. Duplicate it and rename it
3. Add it to your page by typing `{% include components/pricing/pricing-1.html %}` replacing `/pricing/pricing-1.html` with your renamed component


## Any questions?

If you need help with using the **Argon design system itself**, you should visit the [documentation page](https://demos.creative-tim.com/argon-design-system/docs/getting-started/overview.html) or [contact the Creative Tim team](https://www.creative-tim.com/contact-us) for support.

If you have any questions or feedback about the **Jekyll features** of the theme, don't hesitate to reach out to hello@jekyllthemes.io for 1-to-1 support direct from the developers!

🤘

