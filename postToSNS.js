/*
*
* postToSNS.js
*
* Node.js module to post a string, array or object to an SNS Topic. Put this file in a directory,
* such as 'src' and then require the file prior to using the function.
*
* Usage:
*   postToSNS = require('./src/postToSNS.js')
*   ....
*   postToSNS(thingToPost,topicArn)
*
* Typically the topicArn will be configured in an environment variable called 'topicArn'. It is 
* the full Arn of the SNS Topic.
*
* Note that the IAM Role that executes this must have access to post to the SNS topic.
*
*
* v 1.0.1 2017-09-27 jdr - pretty print the JSON object
* v 1.0.0 2017-09-26 jdr - Initial version as a utility module; added lots more error checking.
*
*/

const aws = require('aws-sdk')
const sns = new aws.SNS()

function postToSNS(thingToPost,topicArn) {
    // post 'thingToPost' to an SNS topic 'topicArn'. Post every type that makes sense.
    let message = ''        // The eventual message to be posted
    let canSend = true      // flag to keep track of sendability

    // make sure the 'topicArn' is configured
    if (typeof(topicArn) != "string" || topicArn === "") {
        console.log({
            warn: "Warning: Could not post to SNS Topic... no topicArn configured in environment varibles",
            object: thingToPost
        })
        return false
    }
    
    // Converty 'thingToPost' to 'message' based on its type.
    switch (typeof(thingToPost)) {
        case "string":
            message = thingToPost
            break
        case "number":
            message += thingToPost
            break
        case "boolean":
            message = (thingToPost) ? "true" : "false"
            break
        case "object":
            message = JSON.stringify(thingToPost,null,2)
            break
        default:
            canSend = false  
    }

    // post to the SNS topicArn
    if (canSend) {
        sns.publish ({
            Message: message,
            TopicArn: topicArn
        }, (err, data) => {
            if (err) console.log(err);    // an error occurred, log it
            // else     console.log(data);           // successful response, but don't log it
        })
    } else {
        console.log({
            warn: "Warn: Could not post to SNS Topic - Invalid type to post.",
            object: thingToPost,
            topicArn: topicArn
        })
        return false 
    }

}

module.exports = postToSNS
