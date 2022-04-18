FROM nginx
COPY nginx/ /vaccination-inventory/nginx/
COPY dist/ /vaccination-inventory/dist/
COPY certs/ /vaccination-inventory/certs/
ENTRYPOINT ["nginx", "-g", "daemon off;"]
