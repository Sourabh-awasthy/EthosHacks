# Build the Go app
FROM golang:1.25-alpine3.22 AS builder
WORKDIR /app
COPY . .
RUN go mod download
RUN CGO_ENABLED=0 GOOS=linux go build -o /main main.go

# Run the app
FROM alpine:latest
WORKDIR /app
COPY --from=builder /main .
EXPOSE 8080
CMD ["/app/main"]
