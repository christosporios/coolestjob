import { createClient } from "redis";

let redis: Awaited<ReturnType<typeof createClient>> | null = null;

async function getRedis() {
    if (!redis) {
        redis = await createClient({ url: process.env.REDIS_URL }).connect();
    }
    return redis;
}

export default getRedis;