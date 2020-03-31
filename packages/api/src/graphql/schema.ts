import gql from "graphql-tag";
import { merge } from "lodash";
import { makeExecutableSchema } from "graphql-tools";
import { GraphQLUpload } from "graphql-upload"
import { GraphQLDateTime } from 'graphql-iso-date';
import userResolvers from "./resolvers/userResolvers";
import listingResolvers from "./resolvers/listingResolvers";
import fileUploadResolvers from "./resolvers/fileUploadResolvers";
import orgResolvers from "./resolvers/orgResolvers";

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
    org: Org
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

  type Listing {
    _id: String
    orgId: String
    org: Org
    createdAt: GraphQLDateTime
    updatedAt: GraphQLDateTime
    active: Boolean
    title:String 
    minPrice: Int
    askPrice: Int
    location:String 
    imageUrls: [String]
    videoUrls: [String]
    numberOfHead: Int
    class:String 
    weight: Int
    origin:String 
    slide: Int
    slideTerms:String 
    breed:String 
    bodyCondition: Int
    flesh:String 
    estWeightVariance: String
    feedHistory:String 
    estDeliveryDate: GraphQLDateTime
    weighingConditions:String 
    vaccs:String 
    implanted: Boolean
    ageSourceVerfieid: Boolean
    horns: Boolean
    comments: String  
  }

  input ListingInput {
    _id: String
    title: String
    minPrice: Int
    askPrice: Int
    location:String 
    imageUrls: [String]
    videoUrls: [String]
    numberOfHead: Int
    class:String 
    weight: Int
    origin:String 
    slide: Int
    slideTerms:String 
    breed:String 
    bodyCondition: Int
    flesh:String 
    estWeightVariance: String
    feedHistory:String 
    estDeliveryDate: GraphQLDateTime
    weighingConditions:String 
    vaccs:String 
    implanted: Boolean
    ageSourceVerfieid: Boolean
    horns: Boolean
    comments: String  
  }

    ######################################################################
  # Listing
  ######################################################################

  type Org {
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
    org(orgId: String): Org
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
    updateOrg(org: OrgInput!): Org
    deleteOrg(orgId: String!): Boolean    
   
    # Miscellaneous
    uploadFiles(files: [Upload!]!): [File!]!
  }
`;

export const resolvers = merge(
  userResolvers,
  listingResolvers,
  orgResolvers,
  fileUploadResolvers,
);

export const executableSchema = makeExecutableSchema({
  resolvers: {
    Upload: GraphQLUpload,
    GraphQLDateTime: GraphQLDateTime,
    User: {
      org: (user, args, context) => orgResolvers.Query.org(null, { orgId: user.orgId }, context),
    },
    Org: {
      user: (org, args, context) => userResolvers.Query.user(org, null, context),
    },
    Listing: {
      org: (listing, args, context) => orgResolvers.Query.org(null, { orgId: listing.orgId }, context),
    },

    ...resolvers,
  },
  typeDefs: schema
});
