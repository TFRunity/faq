FROM redis:8.6.2-trixie

COPY users.acl /usr/local/etc/redis/users.acl
COPY redis.conf /usr/local/etc/redis/redis.conf

CMD ["redis-server", "/usr/local/etc/redis/redis.conf"]