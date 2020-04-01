import gql from "graphql-tag";
import { merge } from "lodash";
import { makeExecutableSchema } from "graphql-tools";
import { GraphQLUpload } from "graphql-upload"
import { GraphQLDateTime } from 'graphql-iso-date';
import userResolvers from "./resolvers/user.resolvers";
import fileUploadResolvers from "./resolvers/fileUpload.resolvers";
import organizationResolvers from "./resolvers/organization.resolvers";

const schema = gql`
  scalar Upload
  scalar GraphQLDateTime

  ######################################################################
  # User
  ######################################################################

  type User {
    _id: String
    firstName: String
    lastName: String
    email: String
    phoneNumber: String
    createdAt: Float
    organizationId: String
    organization: Organization
  }

  input UserInput {
    firstName: String!
    lastName: String!
    email: String!
    phoneNumber: String
    password: String!
  }

  type Authentication {
    user: User!
    token: String!
  }

  ######################################################################
  # Organization
  ######################################################################

  type Organization {
    _id: String
    userId: String
    user: User
    createdAt: GraphQLDateTime
    updatedAt: GraphQLDateTime
    active: Boolean
    name: String
    description: String
    phoneNumber: String
    email: String
    address: String
  }

  input OrgInput {
    _id: String
    name: String
    description: String
    phoneNumber: String
    email: String
    address: String
  }

  ######################################################################
  # Miscellaneous
  ######################################################################
  
  type File {
    filename: String!
    mimetype: String!
    encoding: String!
    url: String!
  }

  ######################################################################
  # Queries and Mutations
  ######################################################################

  type Query {
    # User
    user: User

    # Org
    organization(organizationId: String): Organization
  }

  type Mutation {
    # User
    register(user: UserInput!): Authentication
    login(email: String!, password: String!): Authentication

    # Organization
    updateOrganization(organization: OrgInput!): Organization
    deleteOrganization(organizationId: String!): Boolean    
   
    # Miscellaneous
    uploadFiles(files: [Upload!]!): [File!]!
  }
`;

export const resolvers = merge(
  userResolvers,
  organizationResolvers,
  fileUploadResolvers,
);

export const executableSchema = makeExecutableSchema({
  resolvers: {
    Upload: GraphQLUpload,
    GraphQLDateTime: GraphQLDateTime,
    User: {
      organization: (user, args, context) => organizationResolvers.Query.organization(null, { organizationId: user.organizationId }, context),
    },
    Organization: {
      user: (org, args, context) => userResolvers.Query.user(org, null, context),
    },
    ...resolvers,
  },
  typeDefs: schema
});
