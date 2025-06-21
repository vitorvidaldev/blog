# Blog

A simple, fast blog built with GitHub Pages and Markdown.

## Features

- **Simple and Clean**: Minimal design focused on content
- **Search Functionality**: Search through posts by title, content, or tags
- **Tag Filtering**: Filter posts by tags
- **Responsive Design**: Works well on desktop and mobile
- **Fast Loading**: Static site with no server-side processing
- **Markdown Support**: Write posts in Markdown format

## How to Use

### Adding New Posts

1. Create a new `.md` file in the `posts/` directory
2. Use the following format for your post:

```markdown
# Your Post Title

*Date: YYYY-MM-DD*

Your content here...

---

*Tags: tag1, tag2, tag3*
```

3. Update the `posts` array in `index.html` to include your new post:

```javascript
{
    title: "Your Post Title",
    date: "YYYY-MM-DD",
    excerpt: "A brief description of your post",
    tags: ["tag1", "tag2", "tag3"],
    filename: "posts/your-post-filename.md"
}
```

### Converting Markdown to HTML

Since GitHub Pages serves static files, you'll need to convert your Markdown posts to HTML. You can:

1. **Use a Markdown converter** like Pandoc:
   ```bash
   pandoc posts/your-post.md -o posts/your-post.html
   ```

2. **Use online tools** like:
   - [Markdown to HTML Converter](https://www.markdowntohtml.com/)
   - [Dillinger](https://dillinger.io/)

3. **Use the provided template**: Copy `post-template.html` and replace the placeholders:
   - `POST_TITLE` with your post title
   - `POST_DATE` with your post date
   - `POST_CONTENT` with your converted HTML content
   - `POST_TAGS` with your tags

### Setting up GitHub Pages

1. Push your code to GitHub
2. Go to your repository settings
3. Scroll down to "GitHub Pages" section
4. Select "Deploy from a branch"
5. Choose the branch (usually `main` or `master`)
6. Your site will be available at `https://yourusername.github.io/your-repo-name`

## File Structure

```
blog/
├── index.html          # Main homepage with post listing
├── post-template.html  # Template for individual posts
├── README.md          # This file
└── posts/             # Directory containing markdown posts
    ├── getting-started.md
    └── why-github-pages.md
```

## Customization

### Styling
- Edit the CSS in the `<style>` section of `index.html` and `post-template.html`
- The design uses a clean, minimal aesthetic with blue accents

### Search and Tags
- The search functionality works client-side and searches through titles, excerpts, and tags
- Tags are automatically extracted from the `posts` array in `index.html`

### Adding Features
- The current setup is minimal but extensible
- You can add more features like comments (using Disqus), analytics, or social sharing

## Limitations

- **Static Content**: No server-side processing or database
- **Manual Updates**: Need to manually update the posts array when adding new posts
- **No Comments**: Comments would require external services like Disqus
- **No Analytics**: Would need to add Google Analytics or similar

## Future Enhancements

- [ ] Automated markdown to HTML conversion
- [ ] RSS feed generation
- [ ] Social media sharing buttons
- [ ] Comment system integration
- [ ] Analytics integration
- [ ] Dark mode toggle
- [ ] Reading time estimates

## License

This blog template is open source and available under the MIT License.

---

*Happy blogging!*

## How to Add New Posts

1. Create a new markdown file in the `posts/` directory
2. Follow this format:

```markdown
# Your Post Title

*Date: YYYY-MM-DD*

Your post content here...

---

*Tags: tag1, tag2, tag3*
```

3. Run the build script to update the post listing:

```bash
npm run build
```

Or if you want to watch for changes automatically:

```bash
npm run watch
```

## Setup

1. Install dependencies (optional, for watch mode):
```bash
npm install
```

2. Generate the initial posts.json:
```bash
npm run build
```

3. Deploy to GitHub Pages

## File Structure

- `posts/` - Your markdown blog posts
- `index.html` - Main blog page
- `generate-posts.js` - Script to generate posts.json
- `posts.json` - Auto-generated post metadata (don't edit manually)

## GitHub Pages Deployment

The blog works perfectly with GitHub Pages. Just:

1. Add new posts to the `posts/` directory
2. Run `npm run build` to update `posts.json`
3. Commit and push to GitHub
4. GitHub Pages will automatically serve your updated blog 