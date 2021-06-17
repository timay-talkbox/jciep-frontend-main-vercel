import gql from "graphql-tag";

export default gql`
  "unique key = key + lang"
  type Page {
    id: ID!
    "unique page key"
    key: String!
    lang: Language

    "follow page structure (defined in tinaCMS)"
    content: JsonContent

    title: String
    description: String
    thumbnail: File
  }

  input PageUpdateInput {
    key: String!
    lang: Language
    content: JsonContent

    title: String
    description: String
    thumbnail: FileInput
  }

  type Query {
    "return null if not exists"
    PageGet(key: String!, lang: Language!): Page
  }
  type Mutation {
    "header: x-token, require 'adminUser'"
    PageUpdate(input: PageUpdateInput): Page
  }
`;
