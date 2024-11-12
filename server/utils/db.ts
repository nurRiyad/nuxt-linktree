import { drizzle } from "drizzle-orm/libsql";
import { createClient } from "@libsql/client";
import * as schema from "../database/schema";


export const useDb = () =>{
  const database = createClient({
    url: process.env.NUXT_TURSO_DATABASE_URL!,
    authToken: process.env.NUXT_TURSO_AUTH_TOKEN!,
  });
  
  return drizzle(database);
}



export const  tables = schema
export type Todo = typeof tables.links.$inferSelect
