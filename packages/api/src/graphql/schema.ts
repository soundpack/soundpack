import gql from "graphql-tag";
import { merge } from "lodash";
import { makeExecutableSchema } from "graphql-tools";
import { GraphQLUpload } from "graphql-upload"
import { GraphQLDateTime } from 'graphql-iso-date';
import userResolvers from "./resolvers/user.resolvers";
import fileUploadResolvers from "./resolvers/fileUpload.resolvers";
import organizationResolvers from "./resolvers/organization.resolvers";
import fileResolvers from "./resolvers/file.resolvers";

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
    lastUpdatedAt: GraphQLDateTime
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
  # Transcription
  ######################################################################

  type Transcription {
    results: [Result]
  }

  type Result {
    alternatives: [Alternative]
  }

  type Alternative {
    transcript: String
    confidence: Float
    words: [Word]
  }

  type Word {
    startTime: Time
    endTime: Time
    word: String
  }

  type Time {
    seconds: String
    nanos: Int
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
    file: Transcription

    # Org
    organization(organizationId: String): Organization
  }

  type Mutation {
    # User
    register(user: UserInput!): Authentication
    login(email: String!, password: String!): Authentication
    sendPasswordReset(email: String!): Boolean
    resetPassword(resetPasswordCode: String!, password: String!): Authentication
    verifyEmail(verifyEmailCode: String!): Boolean

    # Organization
    updateOrganization(organization: OrgInput!): Organization
    deleteOrganization(organizationId: String!): Boolean

    # Miscellaneous
    uploadFiles(files: [Upload!]!): [File!]!
  }
`;

export const resolvers = merge(
  userResolvers,
  fileResolvers,
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
