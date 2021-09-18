const express = require("express");
const { ApolloServer, gql } = require("apollo-server-express");

const membersData = [
  {
  firstname :"Mhosseinsh",
  lastname:"Shabahang",
  mobile:"09381108919",
  id: 1,
  status: true
  },
  {
    firstname :"mehdi",
    lastname:"ranjbar",
    mobile:"09331883418",
    id :2,
    status: true
  },
];

const addressData = [
  {
    addressId :1 ,
    address : "asdasdsadadasda",
    memeberId :1 ,
    cityId :1 ,
  },
  {
    addressId :2 ,
    address : "hjkhjkhjkhjkhjkhhjkhj",
    memeberId :2 ,
    cityId :2 ,
  },
];
const citiesData = [
    {
        cityId: 1,
        title :"this is a city from the soltan mahmud khare kie"
    },
    {
        cityId: 2 ,
        title :"this is test from soltan mahmud kabir"
    },
  ];
const typeDefs = gql`

     type Member {
        firstname: String
        lastname: String
        mobile: String
        id: Int 
        status: Boolean
        address:[Address]
    }

    type Address {
        addresId: Int
        address: String
        city: City
    }

    type City{
      cityId: Int
      title: String
    }
    type Query {
      members(status:Boolean): [Member]
      member(memberId: Int, status:Boolean): Member 
      
  }
`;

const resolvers = {
  Member: {
    address: (parent, args) =>{
      return addressData.filter(item =>item.memeberId === parent.id)
    }
  },

  Query: {
members: (parent, args) => {
  return membersData.filter(item => item.status === args.status)
    },
  member: (parent, args) => {
      return membersData.find(item => item.id === args.memberId &&item.status === args.status)
        }
  },
}
 

const server = new ApolloServer({ typeDefs, resolvers });
const app = express();

server.applyMiddleware({ app });

app.listen({ port: 4000 }, () => {
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`);
});