 const siteMetadata = {
  title: `CourtsDawn`,
  description: `Includes a blog and professional portfolio`,
  lastBuildDate: new Date(Date.now()).toISOString(),
  siteUrl: `https://dummy-url-for-now.com`,
  image: `/default-site-image.jpg`,
  authorName: `Cameron Pelkey`,
  twitterUsername: `@authorOfPosts`,
  siteLanguage: `en-CA`,
  siteLocale: `en_gb`,
  }

module.exports = {
 siteMetadata,
  plugins: [
   `gatsby-plugin-styled-components`,
   `gatsby-plugin-fontawesome-css`,
   `gatsby-plugin-react-helmet`,
   `gatsby-plugin-image`,
   `gatsby-transformer-sharp`,
   `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-mdx`,
      options: {
        extensions: [`.mdx`, `.md`],
        gatsbyRemarkPlugins: [
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 640,
            },
          },
        ],
        plugins: [
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 640,
            },
          },
        ],
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/blog`,
        name: `blog`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/src/images`,
        name: `images`,
      },     
    },
   ],
};