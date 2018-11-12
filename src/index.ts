import * as aws from 'aws-sdk'
import { type } from 'os'
import {
  AthenaClient,
  AthenaClientConfig,
  setConcurrentExecMax,
} from './lib/client'
import { AthenaRequest } from './lib/request'

export interface AwsConfig {
  region: string
  accessKeyId?: string
  secretAccessKey?: string
  sessionToken?: string
}
export type S3Instance = object

export * from './lib/client'

export default class Athena {
  public static createClient = createClient
  public static setConcurrentExecMax = setConcurrentExecMax
}

export function createClient(
  clientConfig: AthenaClientConfig,
  awsConfig: AwsConfig,
  s3Instance: S3Instance,
) {
  if (
    clientConfig === undefined ||
    clientConfig.bucketUri === undefined ||
    clientConfig.bucketUri.length === 0
  ) {
    throw new Error('bucket uri required')
  }

  if (
    awsConfig === undefined ||
    awsConfig.region === undefined ||
    awsConfig.region.length === 0
  ) {
    throw new Error('region required')
  }
  if (s3Instance === undefined) {
    s3Instance = new aws.S3({ apiVersion: '2006-03-01' })
  }

  aws.config.update(awsConfig)
  const athena = new aws.Athena({ apiVersion: '2017-05-18' })
  const request = new AthenaRequest(athena, s3Instance)
  return new AthenaClient(request, clientConfig)
}
