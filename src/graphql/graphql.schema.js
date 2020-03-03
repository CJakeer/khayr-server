const graphql = require("graphql");
const Fund = require("../models/fund.model");
const FundRaiser = require("../models/fundRaiser.model");

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLID,
  GraphQLList,
  GraphQLNonNull,
  GraphQLSchema
} = graphql;

const FundType = new GraphQLObjectType({
  name: "Fund",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    description: { type: GraphQLString },
    fundAmount: { type: GraphQLInt },
    // date: { type: GraphQLString },
    fundRaiserId: { type: GraphQLString }, //this not actually not required here
    fundRaiser: {
      type: FundRaiserType,
      resolve(parent, args) {
        return FundRaiser.findById(parent.fundRaiserId);
      }
    }
  })
});

const FundRaiserType = new GraphQLObjectType({
  name: "FundRaiser",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    age: { type: GraphQLInt },
    gender: { type: GraphQLString },
    funds: {
      type: FundType,
      resolve(parent, arg) {
        return Fund.find({ fundRaiserId: parent.id });
      }
    }
  })
});

const RootQuery = new GraphQLObjectType({
  name: "RootQuery",
  fields: {
    fund: {
      type: FundType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return Fund.findById(args.id);
      }
    },
    fundRaiser: {
      type: FundRaiserType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return FundRaiser.findById(args.id);
      }
    },
    funds: {
      type: new GraphQLList(FundType),
      resolve(parent, args) {
        return Fund.find({});
      }
    },
    fundRaisers: {
      type: new GraphQLList(FundRaiserType),

      resolve(parent, args) {
        return FundRaiser.find({});
      }
    }
  }
});

const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    addFund: {
      type: FundType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        description: { type: new GraphQLNonNull(GraphQLString) },
        fundAmount: { type: new GraphQLNonNull(GraphQLInt) },
        // date: { type: new GraphQLNonNull(GraphQLString) },
        fundRaiserId: { type: new GraphQLNonNull(GraphQLString) }
      },

      resolve(parent, args) {
        const fund = new Fund({
          name: args.name,
          description: args.description,
          fundAmount: args.fundAmount,
          //   date: args.date,
          fundRaiserId: args.fundRaiserId
        });
        return fund.save();
      }
    },
    addFundRaiser: {
      type: FundRaiserType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        age: { type: new GraphQLNonNull(GraphQLInt) },
        gender: { type: new GraphQLNonNull(GraphQLString) }
      },
      resolve(parent, args) {
        const fundRaiser = new FundRaiser({
          name: args.name,
          age: args.age,
          gender: args.gender
        });
        return fundRaiser.save();
      }
    }
  }
});

const Schema = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation
});

module.exports = Schema;
