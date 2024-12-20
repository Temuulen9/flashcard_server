FROM denoland/deno:alpine-1.44.4

WORKDIR /app

COPY . .
RUN deno cache main.ts


USER root
EXPOSE 80

CMD ["run", "-A", "main.ts"]