// import { graphql } from "gatsby";
// import { MDXRenderer } from "gatsby-plugin-mdx";
// import React from "react";
// import SEO from "react-seo-component";
// //import { UseSiteMetadata } from "../../hooks/use-site-metadata";

// export default function PostPage({ data }) {
//   const {
//     body,
//     slug,
//     excerpt,
//     frontmatter: { title, date },
//   } = data.mdx;

//   // const {
//   //   title: siteTitle,
//   //   siteUrl,
//   //   siteLanguage,
//   //   siteLocale,
//   //   twitterUsername,
//   //   authorName,
//   // } = useSiteMetadata();



//   return (
//     <>
//       {/* <SEO
//         title={title}
//         titleTemplate={siteTitle}
//         description={excerpt}
//         pathname={`${siteUrl}/blog/${slug}`}
//         article={true}
//         siteLanguage={siteLanguage}
//         siteLocale={siteLocale}
//         twitterUsername={twitterUsername}
//         author={authorName}
//         publishedDate={date}
//         modifiedDate={new Date(Date.now()).toISOString()}
//       /> */}
//       <h1>
//         {title}
//       </h1>
//       <MDXRenderer>{body}</MDXRenderer>
//     </>
//   );
// }

// export const query = graphql`
//   query POST_BY_SLUG($slug: String) {
//     mdx(slug: { eq: $slug }) {
//       id
//       slug
//       body
//       excerpt
//       frontmatter {
//         date
//         title
//       }
//     }
//   }
// `;