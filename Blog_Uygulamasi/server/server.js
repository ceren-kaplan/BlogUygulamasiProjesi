const { ApolloServer } = require("apollo-server");
const gql = require("graphql-tag");
const mongoose = require("mongoose");

const DB_URI =
  "mongodb+srv://usrcrn:1mdb30a4@blogcluster.jxghwdj.mongodb.net/blogDB?retryWrites=true&w=majority";
const MakaleModel = require("./models/MakaleModel");

const typeDefs = gql`
  type Makale {
    id: ID!
    baslik: String!
    icerik: String!
  }
  type Query {
    makaleleriGetir: [Makale]!
    makaleGetir(id: ID!): Makale!
  }
  type Mutation {
    makaleOlustur(baslik: String!, icerik: String!): Makale!
    makaleSil(id: ID!): String!
  }
`;

const resolvers = {
  Query: {
    async makaleleriGetir() {
      const makaleler = await MakaleModel.find();
      return makaleler;
    },
    //yöntem 1
    async makaleGetir(parent, args) {
      try {
        const { id } = args;
        return await MakaleModel.findById(id);
      } catch (error) {
        throw new error();
      }
    },
    //yöntem 2
    // async makaleGetir(parent,args){
    //   try {
    //     const id=args.id;
    //     return await MakaleModel.findById(id);
    //   } catch (error) {
    //       throw new error()
    //   }

    // }
  },
  Mutation: {
    makaleOlustur: async (parent, args) => {
      try {
        const makale = {
          baslik: args.baslik,
          icerik: args.icerik,
        };
        return await MakaleModel.create(makale);
      } catch (error) {
        throw new error();
      }
    },
    //yöntem 1
    /* makaleSil:async(_,args)=>{
        try {
        
          const silinecek=await MakaleModel.findById(args.id);
          await silinecek.delete();
          return "silme işlemi başarılı"
        } catch (error) {
          throw new error();
          
        }
      } */
    //yöntem 2
    makaleSil: async (_, { id }) => {
      try {
        const silinecek = await MakaleModel.findById(id);
        await silinecek.delete();
        return "silme işlemi başarılı";
      } catch (error) {
        throw new error();
      }
    },
    //yöntem 3
    /*    makaleSil:async(parent,args)=>{
        try {
        
          const silinecek=await MakaleModel.findById(args.id);
          await silinecek.delete();
          return "silme işlemi başarılı"
        } catch (error) {
          throw new error();
        }
      } */
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

mongoose
  .connect(DB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("mongo db bağlantısı başarılı");
    return server.listen({ port: 5000 });
  })
  .then((res) => {
    console.log(`server ${res.url} adresinde çalışıyor.`);
  });
