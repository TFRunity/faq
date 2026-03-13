import 'dotenv/config';
import { drizzle } from 'drizzle-orm/node-postgres';
import { eq } from 'drizzle-orm';
import { faqs } from "@/drizzle/schema";


export const db = drizzle(process.env.DATABASE_URL!)

