const PROTO_PATH = "./customers.proto";

var grpc = require("@grpc/grpc-js");
var protoLoader = require("@grpc/proto-loader");

var packageDefinition = protoLoader.loadSync(PROTO_PATH, {
    keepCase: true,
    longs: String,
    enums: String,
    arrays: true
});

var customersProto = grpc.loadPackageDefinition(packageDefinition);

const { v4: uuidv4 } = require("uuid");

const server = new grpc.Server();
const hello = [
    {
        message: "Hello world"
    }
];

server.addService(customersProto.GreeterService.service, {
    seyHello: (_, callback) => {
        callback(null, { hello });
    }
});

server.bindAsync('127.0.0.1:30043', grpc.ServerCredentials.createInsecure(), (error, port) => {
    try {
        server.start();
        console.log('started on ' + port);
        // resolve(server);
    }
    catch (e) {
        console.log(e);
    }
});