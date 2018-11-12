"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
const aws = require("aws-sdk");
const client_1 = require("./lib/client");
const request_1 = require("./lib/request");
__export(require("./lib/client"));
class Athena {
}
Athena.createClient = createClient;
Athena.setConcurrentExecMax = client_1.setConcurrentExecMax;
exports.default = Athena;
function createClient(clientConfig, awsConfig, s3Instance, athenaInstance) {
    if (clientConfig === undefined ||
        clientConfig.bucketUri === undefined ||
        clientConfig.bucketUri.length === 0) {
        throw new Error('bucket uri required');
    }
    if (awsConfig === undefined ||
        awsConfig.region === undefined ||
        awsConfig.region.length === 0) {
        throw new Error('region required');
    }
    if (s3Instance === undefined) {
        s3Instance = new aws.S3({ apiVersion: '2006-03-01' });
    }
    if (athenaInstance === undefined) {
        athenaInstance = new aws.Athena({ apiVersion: '2017-05-18' });
    }
    aws.config.update(awsConfig);
    const request = new request_1.AthenaRequest(athenaInstance, s3Instance);
    return new client_1.AthenaClient(request, clientConfig);
}
exports.createClient = createClient;
//# sourceMappingURL=index.js.map