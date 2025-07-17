import { BlockPublicAccess, Bucket, EventType } from 'aws-cdk-lib/aws-s3';
import * as sqs from 'aws-cdk-lib/aws-sqs';
import * as dest from 'aws-cdk-lib/aws-s3-notifications';
import { Construct } from 'constructs';

//define what properties are needed to create the construct
export type MyProps = {
    name: string,
    age: number
};

//create the construct, initializing any subconstructs 
//This construct creates a bucket and a queue. Whenever an item is added to the bucket, a notification is sent to the queue.
export class MyConstruct extends Construct {
  public readonly bucket: Bucket;
  public readonly queue: sqs.Queue;
  public readonly destination: dest.SqsDestination;
  public readonly age: number;

  constructor(scope: Construct, id: string, props: MyProps) {
    super(scope, id);
    this.age = props.age;
    const validName = props.name.toLowerCase();
    this.bucket = new Bucket(this, validName + "-bucket", {bucketName: validName + "-bucket", publicReadAccess: true, 
        blockPublicAccess: {blockPublicAcls: false, blockPublicPolicy: false, ignorePublicAcls: false, restrictPublicBuckets: false}}
    );
    this.queue = new sqs.Queue(this, validName + "-queue", {queueName: validName + "-queue"});
    this.destination = new dest.SqsDestination(this.queue);
    this.bucket.addEventNotification(EventType.OBJECT_CREATED, this.destination);
  }

  test() {
    return "My age is " + this.age;
  }
}

//call as needed
//const x = new MyConstruct(this, "myuniqueid", {name: "Cool Construct", age: 0});
