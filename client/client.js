const PROTO_PATH = "../customers.proto";

const grpc = require("@grpc/grpc-js");
const protoLoader = require("@grpc/proto-loader");

var packageDefinition = protoLoader.loadSync(PROTO_PATH, {
    keepCase: true,
    longs: String,
    enums: String,
    arrays: true
});

const GreeterService = grpc.loadPackageDefinition(packageDefinition).GreeterService;
const client = new GreeterService(
    "localhost:30043",
    grpc.credentials.createInsecure()
);

module.exports = client;