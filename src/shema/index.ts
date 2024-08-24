import {mergeTypeDefs} from "@graphql-tools/merge"
import typeDefs from "./Alphabet"

export const MergerDgQLShema = mergeTypeDefs([
   typeDefs
])