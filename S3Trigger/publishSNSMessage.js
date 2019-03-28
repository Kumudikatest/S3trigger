let AWS = require('aws-sdk');
const sns = new AWS.SNS();

exports.handler = function (event, context, callback) {
    event.Records.forEach((record) => {
        console.log('Bucket record: ', JSON.stringify(record, null, 2));
        if (record.eventName == 'ObjectCreated:Put') {
            sns.publish({
                Message: 'Test trigger',
                Subject: 'Test',
                MessageAttributes: {},
                MessageStructure: 'String',
                TopicArn: 'arn:aws:sns:us-east-1:318300609668:dynamodb'
            }).promise()
                .then(data => {
                    // your code goes here
                })
                .catch(err => {
                    // error handling goes here
                });
        }
    });
    callback(null, { "message": "Successfully executed" });
};