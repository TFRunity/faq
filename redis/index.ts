import {createClient} from 'redis'

const redis = createClient({
    url: process.env.REDIS_URL!,
})
if (!redis.isOpen) await redis.connect()
export default redis