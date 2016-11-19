/**
 * This sample demonstrates a simple skill built with the Amazon Alexa Skills Kit.
 * The Intent Schema, Custom Slots, and Sample Utterances for this skill, as well as
 * testing instructions are located at http://amzn.to/1LzFrj6
 *
 * For additional samples, visit the Alexa Skills Kit Getting Started guide at
 * http://amzn.to/1LGWsLG
 */

const Alexa = require('alexa-sdk');

const states = {
  STARTMODE: '_STARTMODE',                // Prompt the user to start or restart the game.
  ASKMODE: '_ASKMODE',                    // Alexa is asking user the questions.
  DESCRIPTIONMODE: '_DESCRIPTIONMODE',     // Alexa is describing the final choice and prompting to start again or quit
};

// Questions
const nodes = [
  {
    node: 1,
    message: 'Enter question here',
    yes: 2,
    no: 3,
  }, {
    node: 2,
    message: 'Enter question here',
    yes: 4,
    no: 5,
  }, {
    node: 3,
    message: 'Enter question here',
    yes: 6,
    no: 7,
  }, {
    node: 4,
    message: 'Enter question here',
    yes: 8,
    no: 9,
  }, {
    node: 5,
    message: 'Enter question here',
    yes: 10,
    no: 11,
  }, {
    node: 6,
    message: 'Enter question here',
    yes: 12,
    no: 13,
  }, {
    node: 7,
    message: 'Enter question here',
    yes: 14,
    no: 15,
  },

  // Answers & descriptions
  {
    node: 8,
    message: 'Enter answer here',
    yes: 0,
    no: 0,
    description: 'Enter description here.',
  }, {
    node: 9,
    message: 'Enter answer here',
    yes: 0,
    no: 0,
    description: 'Enter description here.',
  }, {
    node: 10,
    message: 'Enter answer here',
    yes: 0,
    no: 0,
    description: 'Enter description here.',
  }, {
    node: 11,
    message: 'Enter answer here',
    yes: 0,
    no: 0,
    description: 'Enter description here.',
  }, {
    node: 12,
    message: 'Enter answer here',
    yes: 0,
    no: 0,
    description: 'Enter description here.',
  }, {
    node: 13,
    message: 'Enter answer here',
    yes: 0,
    no: 0,
    description: 'Enter description here.',
  }, {
    node: 14,
    message: 'Enter answer here',
    yes: 0,
    no: 0,
    description: 'Enter description here.',
  }, {
    node: 15,
    message: 'Enter answer here',
    yes: 0,
    no: 0,
    description: 'Enter description here.',
  },
];


// this is used for keep track of visted nodes when we test for loops in the tree
let visited = [nodes.length];

// These are messages that Alexa says to the user during conversation

// This is the intial welcome message
const welcomeMessage = 'Enter message here';

// This is the message that is repeated if the response to the initial welcome message is not heard
const repeatWelcomeMessage = 'Enter message here';

// this is the message that is repeated if Alexa does not hear/understand the
// reponse to the welcome message
const promptToStartMessage = 'Enter message here';

// This is the prompt during the game when Alexa doesnt hear or understand a yes / no reply
const promptToSayYesNo = 'Enter message here';

// This is the response to the user after the final question when Alex decides
// on what group choice the user should be given
const decisionMessage = 'Enter message here';

// This is the prompt to ask the user if they would like to hear a short
// description of thier chosen profession or to play again
const playAgainMessage = 'Enter message here';

// this is the help message during the setup at the beginning of the game
const helpMessage = 'Enter message here';

// This is the goodbye message when the user has asked to quit the game
const goodbyeMessage = 'Enter message here';

const speechNotFoundMessage = 'Could not find speech for node';

const nodeNotFoundMessage = 'In nodes array could not find node';

const descriptionNotFoundMessage = 'Could not find description for node';

const loopsDetectedMessage = 'A potential loop was detected on the node tree, please fix before continuing';

const utteranceTellMeMore = 'Enter utterance here';

const utterancePlayAgain = 'Enter utterance here';

// the first node that we will use
const START_NODE = 1;

// --------------- Handlers -----------------------

// Called when the session starts.
exports.handler = function (event, context, callback) {
  const alexa = Alexa.handler(event, context);
  alexa.registerHandlers(
    newSessionHandler,
    startGameHandlers,
    askQuestionHandlers,
    descriptionHandlers,
  );
  alexa.execute();
};

// set state to start up and  welcome the user
let newSessionHandler = {
  LaunchRequest() {
    this.handler.state = states.STARTMODE;
    this.emit(':ask', welcomeMessage, repeatWelcomeMessage);
  },
  'AMAZON.HelpIntent': function () {
    this.handler.state = states.STARTMODE;
    this.emit(':ask', helpMessage, helpMessage);
  },
  Unhandled() {
    this.handler.state = states.STARTMODE;
    this.emit(':ask', promptToStartMessage, promptToStartMessage);
  },
};

// --------------- Functions that control the skill's behavior -----------------------

// Called at the start of the game, picks and asks first question for the user
let startGameHandlers = Alexa.CreateStateHandler(states.STARTMODE, {
  'AMAZON.YesIntent': function () {
        // --------------------------------------------------------------- check
        // to see if there are any loops in the node tree - this section can be
        // removed in production code
    visited = [nodes.length];
    const loopFound = helper.debugFunction_walkNode(START_NODE);
    if (loopFound === true) {
            // comment out this line if you know that there are no loops in your decision tree
      this.emit(':tell', loopsDetectedMessage);
    }
        // ---------------------------------------------------------------

        // set state to asking questions
    this.handler.state = states.ASKMODE;

        // ask first question, the response will be handled in the askQuestionHandler
    const message = helper.getSpeechForNode(START_NODE);

        // record the node we are on
    this.attributes.currentNode = START_NODE;

        // ask the first question
    this.emit(':ask', message, message);
  },
  'AMAZON.NoIntent': function () {
        // Handle No intent.
    this.emit(':tell', goodbyeMessage);
  },
  'AMAZON.StopIntent': function () {
    this.emit(':tell', goodbyeMessage);
  },
  'AMAZON.CancelIntent': function () {
    this.emit(':tell', goodbyeMessage);
  },
  'AMAZON.StartOverIntent': function () {
    this.emit(':ask', promptToStartMessage, promptToStartMessage);
  },
  'AMAZON.HelpIntent': function () {
    this.emit(':ask', helpMessage, helpMessage);
  },
  Unhandled() {
    this.emit(':ask', promptToStartMessage, promptToStartMessage);
  },
});


// user will have been asked a question when this intent is called. We want to
// look at their yes/no response and then ask another question. If we have asked
// more than the requested number of questions Alexa will make a choice, inform
// the user and then ask if they want to play again
let askQuestionHandlers = Alexa.CreateStateHandler(states.ASKMODE, {

  'AMAZON.YesIntent': function () {
        // Handle Yes intent.
    helper.yesOrNo(this, 'yes');
  },
  'AMAZON.NoIntent': function () {
        // Handle No intent.
    helper.yesOrNo(this, 'no');
  },
  'AMAZON.HelpIntent': function () {
    this.emit(':ask', promptToSayYesNo, promptToSayYesNo);
  },
  'AMAZON.StopIntent': function () {
    this.emit(':tell', goodbyeMessage);
  },
  'AMAZON.CancelIntent': function () {
    this.emit(':tell', goodbyeMessage);
  },
  'AMAZON.StartOverIntent': function () {
        // reset the game state to start mode
    this.handler.state = states.STARTMODE;
    this.emit(':ask', welcomeMessage, repeatWelcomeMessage);
  },
  Unhandled() {
    this.emit(':ask', promptToSayYesNo, promptToSayYesNo);
  },
});

// user has heard the final choice and has been asked if they want to hear the
// description or to play again
let descriptionHandlers = Alexa.CreateStateHandler(states.DESCRIPTIONMODE, {

  'AMAZON.YesIntent': function () {
        // Handle Yes intent.
        // reset the game state to start mode
    this.handler.state = states.STARTMODE;
    this.emit(':ask', welcomeMessage, repeatWelcomeMessage);
  },
  'AMAZON.NoIntent': function () {
        // Handle No intent.
    this.emit(':tell', goodbyeMessage);
  },
  'AMAZON.HelpIntent': function () {
    this.emit(':ask', promptToSayYesNo, promptToSayYesNo);
  },
  'AMAZON.StopIntent': function () {
    this.emit(':tell', goodbyeMessage);
  },
  'AMAZON.CancelIntent': function () {
    this.emit(':tell', goodbyeMessage);
  },
  'AMAZON.StartOverIntent': function () {
        // reset the game state to start mode
    this.handler.state = states.STARTMODE;
    this.emit(':ask', welcomeMessage, repeatWelcomeMessage);
  },
  DescriptionIntent() {
        // var reply = this.event.request.intent.slots.Description.value;
        // console.log('HEARD:' + reply);
    helper.giveDescription(this);
  },
  Unhandled() {
    this.emit(':ask', promptToSayYesNo, promptToSayYesNo);
  },
});

// --------------- Helper Functions  -----------------------

let helper = {

    // gives the user more information on their final choice
  giveDescription(context) {
        // get the speech for the child node
    const description = helper.getDescriptionForNode(context.attributes.currentNode);
    const message = `${description}, ${repeatWelcomeMessage}`;

    context.emit(':ask', message, message);
  },

    // logic to provide the responses to the yes or no responses to the main questions
  yesOrNo(context, reply) {
        // this is a question node so we need to see if the user picked yes or no
    const nextNodeId = helper.getNextNode(context.attributes.currentNode, reply);

        // error in node data
    if (nextNodeId === -1) {
      context.handler.state = states.STARTMODE;

            // the current node was not found in the nodes array this is due to
            // the current node in the nodes array having a yes / no node id for
            // a node that does not exist
      context.emit(':tell', nodeNotFoundMessage, nodeNotFoundMessage);
    }

        // get the speech for the child node
    let message = helper.getSpeechForNode(nextNodeId);

        // have we made a decision
    if (helper.isAnswerNode(nextNodeId) === true) {
            // set the game state to description mode
      context.handler.state = states.DESCRIPTIONMODE;

            // append the play again prompt to the decision and speak it
      message = `${decisionMessage} ${message} ,${playAgainMessage}`;
    }

        // set the current node to next node we want to go to
    context.attributes.currentNode = nextNodeId;

    context.emit(':ask', message, message);
  },

    // gets the description for the given node id
  getDescriptionForNode(nodeId) {
    for (let i = 0; i < nodes.length; i++) {
      if (nodes[i].node === nodeId) {
        return nodes[i].description;
      }
    }
    return descriptionNotFoundMessage + nodeId;
  },

    // returns the speech for the provided node id
  getSpeechForNode(nodeId) {
    for (let i = 0; i < nodes.length; i++) {
      if (nodes[i].node === nodeId) {
        return nodes[i].message;
      }
    }
    return speechNotFoundMessage + nodeId;
  },

    // checks to see if this node is an choice node or a decision node
  isAnswerNode(nodeId) {
    for (let i = 0; i < nodes.length; i++) {
      if (nodes[i].node === nodeId) {
        if (nodes[i].yes === 0 && nodes[i].no === 0) {
          return true;
        }
      }
    }
    return false;
  },

    // gets the next node to traverse to based on the yes no response
  getNextNode(nodeId, yesNo) {
    for (let i = 0; i < nodes.length; i++) {
      if (nodes[i].node === nodeId) {
        if (yesNo === 'yes') {
          return nodes[i].yes;
        }
        return nodes[i].no;
      }
    }
        // error condition, didnt find a matching node id. Cause will be a yes /
        // no entry in the array but with no corrosponding array entry
    return -1;
  },

    // Recursively walks the node tree looking for nodes already visited This
    // method could be changed if you want to implement another type of checking
    // mechanism This should be run on debug builds only not production returns
    // false if node tree path does not contain any previously visited nodes,
    // true if it finds one
  debugFunction_walkNode(nodeId) {
        // console.log("Walking node: " + nodeId);

    if (helper.isAnswerNode(nodeId) === true) {
            // found an answer node - this path to this node does not contain a
            // previously visted node so we will return without recursing
            // further

            // console.log("Answer node found");
      return false;
    }

        // mark this question node as visited
    if (helper.debugFunction_AddToVisited(nodeId) === false) {
            // node was not added to the visited list as it already exists, this
            // indicates a duplicate path in the tree
      return true;
    }

        // console.log("Recursing yes path");
    const yesNode = helper.getNextNode(nodeId, 'yes');
    let duplicatePathHit = helper.debugFunction_walkNode(yesNode);

    if (duplicatePathHit === true) {
      return true;
    }

        // console.log("Recursing no");
    const noNode = helper.getNextNode(nodeId, 'no');
    duplicatePathHit = helper.debugFunction_walkNode(noNode);

    if (duplicatePathHit === true) {
      return true;
    }

        // the paths below this node returned no duplicates
    return false;
  },

    // checks to see if this node has previously been visited
    // if it has it will be set to 1 in the array and we return false (exists)
    // if it hasnt we set it to 1 and return true (added)
  debugFunction_AddToVisited(nodeId) {
    if (visited[nodeId] === 1) {
            // node previously added - duplicate exists
            // console.log("Node was previously visited - duplicate detected");
      return false;
    }

        // was not found so add it as a visited node
    visited[nodeId] = 1;
    return true;
  },
};
