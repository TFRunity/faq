FROM nginx:1.29.8-alpine
COPY nginx.conf /etc/nginx/nginx.conf

COPY ["faqchuvsu+2.pem", "/etc/ssl"]
COPY ["faqchuvsu+2-key.pem", "/etc/ssl"]

EXPOSE 80
EXPOSE 443