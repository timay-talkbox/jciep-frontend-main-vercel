import gql from "graphql-tag";

export default gql`
  enum PostStatus {
    draft
    published
    removed
  }

  type PostReference {
    label: String
    url: String
  }

  "An post (unique key = id + lang)"
  type Post {
    id: ID!
    lang: Language!
    slug: String
    publishDate: Timestamp
    title: String
    excerpt: String
    coverImage: String
    category: String
    tags: [String]
    references: [PostReference]
    status: PostStatus!
    content: JsonContent
    viewCount: Int!
  }

  input PostReferenceInput {
    label: String
    url: String
  }

  input PostCreateInput {
    lang: Language!
    slug: String
    title: String
    publishDate: Timestamp
    excerpt: String
    coverImage: String
    category: String
    content: JsonContent
    tags: [String]
    references: [PostReferenceInput]
  }

  input PostUpdateInput {
    id: ID!
    lang: Language!
    slug: String
    title: String
    publishDate: Timestamp
    excerpt: String
    coverImage: String
    category: String
    content: JsonContent
    status: PostStatus
    tags: [String]
    references: [PostReferenceInput]
  }

  type FilteredPosts {
    data: [Post]
    totalRecords: Int
  }

  type Query {
    PostSearch(
      lang: Language!
      status: [PostStatus]
      category: String
      limit: Int!
      offset: Int!
    ): FilteredPosts

    PostGet(idOrSlug: String!, lang: Language!): Post
    "get related posts for post specfiied by id. 延伸閱讀"
    PostGetRelated(id: ID!, category: String, limit: Int!): [Post]
    "熱門文章 limit default = 3"
    PostGetHotest(limit: Int!): [Post]

    "最新文章 Latest Article with pagination"
    PostGetLatest(offset: Int!, limit: Int!): FilteredPosts
  }

  type Mutation {
    PostCreate(input: PostCreateInput): Post @auth(identityTypes: [staff])
    PostUpdate(input: PostUpdateInput): Post @auth(identityTypes: [staff])
    PostDelete(id: ID): Boolean @auth(identityTypes: [staff])

    PostRead(id: ID): Boolean
  }
`;
