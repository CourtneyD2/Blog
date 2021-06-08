 const siteMetadata = {
  title: `CourtsDawn`,
  description: `A resource for anyone who shares interest in Video Games, RPGs, and Coding. Content for Path of Exile, Outriders, Dungeons and Dragons, JS, Java and more`,
  lastBuildDate: new Date(Date.now()).toISOString(),
  siteUrl: `https://www.courtsdawn.com/`,
  image: `/default-site-image.jpg`,
  authorName: `Courtney Pelkey`,
  twitterUsername: `@courts_dawn`,
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