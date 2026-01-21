# Next.js Portfolio with Notion Blog

A modern, responsive portfolio website built with Next.js, featuring a blog powered by Notion as a CMS.

## Features

- 🌓 Dark/Light mode with system preference detection
- 📱 Responsive sidebar navigation
- 📝 Blog powered by Notion CMS with categories
- 🏷️ Category filtering for blog posts
- 🎨 Modern UI with shadcn/ui components
- ⚡ Fast performance with Next.js App Router
- 🔍 SEO optimized

## Notion Setup

### 1. Create a Notion Integration

1. Go to [Notion Developers](https://developers.notion.com/)
2. Click "Create new integration"
3. Give it a name (e.g., "Portfolio Blog")
4. Copy the "Internal Integration Token"

### 2. Create a Blog Database

Create a new database in Notion with these properties:

- **Title** (Title)
- **Description** (Text)
- **Slug** (Text) - URL-friendly version of the title
- **Date** (Date)
- **Tags** (Multi-select)
- **Category** (Select) - Blog post category (e.g., Tutorial, Personal, Tech, Review)
- **ReadTime** (Number) - estimated reading time in minutes
- **Published** (Checkbox) - to control which posts are visible

### 3. Create an Experience Database (Optional)

Create a separate database for work experience with these properties:

- **Title** (Title) - Job title/position
- **Company** (Text) - Company name
- **Location** (Text) - Work location
- **StartDate** (Date) - Employment start date
- **EndDate** (Date) - Employment end date (optional)
- **Current** (Checkbox) - Currently employed
- **Description** (Text) - Job description
- **Technologies** (Multi-select) - Technologies used
- **Achievements** (Text) - Key achievements
- **Type** (Select) - Employment type (Full-time, Part-time, etc.)
- **Published** (Checkbox) - Show on website

### 4. Share Database with Integration

1. Open your database in Notion
2. Click "Share" in the top right
3. Click "Invite" and select your integration
4. Copy the database ID from the URL

### 5. Environment Variables

Create a `.env.local` file:

\`\`\`env
NOTION_TOKEN=your_notion_integration_token_here
NOTION_DATABASE_ID=your_notion_database_id_here
NOTION_EXPERIENCE_DATABASE_ID=your_notion_experience_database_id_here
REVALIDATION_SECRET=your_secret_key_here
\`\`\`

## Blog Categories

The blog now supports categories! You can organize your posts into different categories such as:

- **Tutorial** - Step-by-step guides and how-tos
- **Personal** - Personal thoughts and experiences
- **Tech** - Technology discussions and reviews
- **Review** - Product and service reviews
- **General** - General posts that don't fit other categories

### Category Features

- **Filter by Category**: Readers can filter posts by category
- **Category Badges**: Each post displays its category with color-coded badges
- **Category Counts**: See how many posts are in each category
- **Responsive Design**: Category filters work on all device sizes

## Getting Started

\`\`\`bash
npm install
npm run dev
\`\`\`

Open [http://localhost:3000](http://localhost:3000) to view your portfolio.

## Blog Content

Write your blog posts directly in Notion using:

- Headings (H1, H2, H3)
- Paragraphs
- Lists (bulleted and numbered)
- Code blocks
- Quotes
- Images
- Dividers

The content will automatically render on your blog with proper styling and category organization.

## Debug Page

Visit `/debug` to check your Notion integration status and see all your blog posts and categories.
