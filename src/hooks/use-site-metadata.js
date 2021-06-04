import { graphql, useStaticQuery } from "gatsby";

export const UseSiteMetadata = () => {
  const { site } = useStaticQuery(
    graphql`
      query SITE_METADATA_QUERY {
        site {
          siteMetadata {
            title
            description
            lastBuildDate
            siteUrl
            image
            authorName
            twitterUsername
            siteLanguage
            siteLocale
          }
        }
      }
    `
  );
  return site.siteMetadata;
};