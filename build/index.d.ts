import { AthenaClient, AthenaClientConfig, setConcurrentExecMax } from './lib/client';
export interface AwsConfig {
    region: string;
    accessKeyId?: string;
    secretAccessKey?: string;
    sessionToken?: string;
}
export declare type S3Instance = object;
export declare type AthenaInstance = object;
export * from './lib/client';
export default class Athena {
    static createClient: typeof createClient;
    static setConcurrentExecMax: typeof setConcurrentExecMax;
}
export declare function createClient(clientConfig: AthenaClientConfig, awsConfig: AwsConfig, s3Instance: S3Instance, athenaInstance: AthenaInstance): AthenaClient;
