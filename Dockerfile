# Install Node dependencies
FROM node:16-alpine AS builder

RUN apk add --no-cache libc6-compat
WORKDIR /usr/src/app
COPY . .
RUN cd web && \
    yarn install --frozen-lockfile && \
    yarn export

# Build Go binary with the exported artifacts
FROM golang:1.18.3-alpine AS runner
ENV PORT 8081
RUN apk add build-base 
WORKDIR /app
COPY go.mod ./
COPY go.sum ./
RUN go mod download
COPY . ./
COPY --from=builder /usr/src/app/web/out ./web/out
RUN go build -o /main.go ./cmd/main.go 
EXPOSE ${PORT}

CMD ["/main.go"]