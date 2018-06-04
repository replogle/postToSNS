# postToSNS.js

 Node.js module to post a string, array or object to an SNS Topic. Put this file in a directory,
 such as 'src' and then require the file prior to using the function.

 Usage:

    postToSNS = require('./src/postToSNS.js')
    ....
    postToSNS(thingToPost,topicArn)

 Typically the topicArn will be configured in an environment variable called 'topicArn'. It is 
 the full Arn of the SNS Topic.

 Note that the IAM Role that executes this must have access to post to the SNS topic.
