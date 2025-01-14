


import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  /**
   * Specify your server-side environment variables schema here. This way you can ensure the app
   * isn't built with invalid env vars.
   */
  server: {
    OPENAI_API_KEY: z.string().trim().min(1),
    PINECONE_API_KEY: z.string().trim().min(1),
    PINECONE_ENVIRONMENT: z.string().trim().min(1),
    PINECONE_INDEX_NAME: z.string().trim().min(1),
    DATABASE_URL: z.string().url(),
    DIRECT_URL:  z.string().url(),
    NODE_ENV: z.enum(["development", "test", "production"]),
    CLIENT_ID: z.string(),
    CLIENT_SECRET: z.string(),
  ACCESS_KEY: z.string(), 
  SECRET_KEY: z.string(),
  BUCKET_NAME: z.string(), 
  REGION: z.string(), 
  secret_key: z.string(),
  // API_KEY: z.string(),
  RESEND_API_KEY:z.string(),
  UNSD_KEY:z.string(),
  ASSEMBLYAI_API_KEY: z.string(),
  UPSTASH_REDIS_REST_URL:  z.string(),
UPSTASH_REDIS_REST_TOKEN:  z.string()
  },

  /**
   * Specify your client-side environment variables schema here. This way you can ensure the app
   * isn't built with invalid env vars. To expose them to the client, prefix them with
   * `NEXT_PUBLIC_`.
   */

client: {
  NEXT_PUBLIC_SUPABASE_URL:  z.string(),
  NEXT_PUBLIC_SUPABASE_ANON_KEY:  z.string(),
},
  /**
   * You can't destruct `process.env` as a regular object in the Next.js edge runtimes (e.g.
   * middlewares) or client-side so we need to destruct manually.
   */
  runtimeEnv: {
    OPENAI_API_KEY: process.env.OPENAI_API_KEY,
    PINECONE_API_KEY: process.env.PINECONE_API_KEY,
    NEXT_PUBLIC_SUPABASE_URL:  process.env.NEXT_PUBLIC_SUPABASE_URL,
    NEXT_PUBLIC_SUPABASE_ANON_KEY:  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    PINECONE_ENVIRONMENT: process.env. PINECONE_ENVIRONMENT, 
    PINECONE_INDEX_NAME: process.env. PINECONE_INDEX_NAME,
    DATABASE_URL: process.env. DATABASE_URL,
   DIRECT_URL: process.env.DIRECT_URL,

    // Add `.min(1) on ID and SECRET if you want to make sure they're not empty
    CLIENT_ID: process.env.CLIENT_ID,
    CLIENT_SECRET: process.env.  CLIENT_SECRET,
    ACCESS_KEY: process.env.   ACCESS_KEY,
  SECRET_KEY: process.env. SECRET_KEY,
  BUCKET_NAME: process.env .  BUCKET_NAME,
  REGION: process.env.  REGION, 
  secret_key: process.env.   secret_key,
  // API_KEY: process.env
  RESEND_API_KEY:process.env.  RESEND_API_KEY,
  UNSD_KEY:process.env. UNSD_KEY,
  ASSEMBLYAI_API_KEY: process.env.ASSEMBLYAI_API_KEY,
  UPSTASH_REDIS_REST_URL:  process.env.UPSTASH_REDIS_REST_URL,
  UPSTASH_REDIS_REST_TOKEN:  process.env.UPSTASH_REDIS_REST_TOKEN,
  NODE_ENV: process.env.NODE_ENV
  },
  /**
   * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation.
   * This is especially useful for Docker builds.
   */
  skipValidation: !!process.env.SKIP_ENV_VALIDATION,
});
