const fs = require('fs');
const path = require('path');

// Function to extract metadata from markdown content
function extractMetadata(content) {
    const lines = content.split('\n');
    let title = '';
    let date = '';
    let excerpt = '';
    let tags = [];
    
    // Extract title (first line starting with #)
    for (const line of lines) {
        if (line.startsWith('# ')) {
            title = line.replace('# ', '').trim();
            break;
        }
    }
    
    // Extract date (line with *Date: YYYY-MM-DD*)
    const dateMatch = content.match(/\*Date: (\d{4}-\d{2}-\d{2})\*/);
    if (dateMatch) {
        date = dateMatch[1];
    }
    
    // Extract excerpt (first paragraph after title and date)
    let inBody = false;
    for (const line of lines) {
        if (line.startsWith('##') || line.startsWith('---')) {
            break;
        }
        if (line.trim() && !line.startsWith('#') && !line.includes('*Date:') && !inBody) {
            excerpt = line.trim();
            inBody = true;
        }
    }
    
    // Extract tags (line with *Tags: tag1, tag2*)
    const tagsMatch = content.match(/\*Tags: ([^*]+)\*/);
    if (tagsMatch) {
        tags = tagsMatch[1].split(',').map(tag => tag.trim());
    }
    
    return { title, date, excerpt, tags };
}

// Function to generate posts data
function generatePosts() {
    const postsDir = './posts';
    const posts = [];
    
    // Read all markdown files in the posts directory
    const files = fs.readdirSync(postsDir);
    
    for (const file of files) {
        if (file.endsWith('.md')) {
            const filePath = path.join(postsDir, file);
            const content = fs.readFileSync(filePath, 'utf8');
            const metadata = extractMetadata(content);
            
            posts.push({
                title: metadata.title,
                date: metadata.date,
                excerpt: metadata.excerpt,
                tags: metadata.tags,
                filename: `posts/${file}`
            });
        }
    }
    
    // Sort posts by date (newest first)
    posts.sort((a, b) => new Date(b.date) - new Date(a.date));
    
    // Write to posts.json
    fs.writeFileSync('./posts.json', JSON.stringify(posts, null, 2));
    
    console.log(`Generated posts.json with ${posts.length} posts:`);
    posts.forEach(post => {
        console.log(`- ${post.title} (${post.date})`);
    });
}

// Run the generation
generatePosts(); 