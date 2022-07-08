# Install Node dependencies
FROM node:16-alpine AS deps

RUN apk add --no-cache libc6-compat
WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

# Build the source code and export build artifacts
FROM node:16-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN yarn export

# Build Go binary with the exported artifacts
FROM golang:1.18.3-alpine AS runner
RUN apk add build-base 
WORKDIR /app
COPY go.mod ./
COPY go.sum ./
RUN go mod download
COPY . .
RUN go build -o /main.go ./cmd/main.go 
EXPOSE 8081

CMD ["/main.go"]