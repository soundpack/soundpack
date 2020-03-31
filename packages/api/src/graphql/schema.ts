import gql from "graphql-tag";
import { merge } from "lodash";
import { makeExecutableSchema } from "graphql-tools";
import { GraphQLUpload } from "graphql-upload"
import { GraphQLDateTime } from 'graphql-iso-date';
import userResolvers from "./resolvers/userResolvers";
import fileUploadResolvers from "./resolvers/fileUploadResolvers";
import organizationResolvers from "./resolvers/organizationResolvers";

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
    orgId: String
    organization: Organization
  }

  input UserInput {
    firstName: String!
    lastName: String!
    email: String!
    phoneNumber: String!
    password: String!
  }

  type Authentication {
    user: User!
    token: String!
  }

  ######################################################################
  # Listing
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

    # Listing
    listing(listingId: String!): Listing
    listings(orgId: String): [Listing]

    # Org
    org(orgId: String): Organization
  }

  type Mutation {
    # User
    register(user: UserInput!): Authentication
    login(email: String!, password: String!): Authentication

    # Listing
    createListing(listing: ListingInput!): Listing
    updateListing(listing: ListingInput!): Listing
    deleteListing(listingId: String!): Boolean    


    # Org
    updateOrg(org: OrgInput!): Organization
    deleteOrg(orgId: String!): Boolean    
   
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
      organization: (user, args, context) => organizationResolvers.Query.org(null, { orgId: user.orgId }, context),
    },
    Organization: {
      user: (org, args, context) => userResolvers.Query.user(org, null, context),
    },
    ...resolvers,
  },
  typeDefs: schema
});
