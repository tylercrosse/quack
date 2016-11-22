var nodes = [
  {
    "node": 1,
    "message": "What is your code supposed to accomplish?",
    "yes": 11,
    "no": 3
  }, {
    "node": 2,
    "message": "Can you walk me though what you're doing line by line?",
    "decision 4": 4,
    "decision 5": 5
  }, {
    "node": 3,
    "message": "What is the result of that?",
    "decision 6": 6,
    "decision 7": 7
  }, {
    "node": 4,
    "message": "Are you still stuck?",
    "decision 8": 8,
    "decision 9": 9
  }, {
    "node": 5,
    "message": "What does the next line say?",
    "decision 10": 10,
    "decision 11": 11
  }, {
    "node": 6,
    "message": "When was the code last working?",
    "decision 12": 12,
    "decision 13": 13
  }, {
    "node": 7,
    "message": "Have you had a similar problem before?",
    "decision 14": 14,
    "decision 15": 15
  }, {
    "node": 8,
    "message": "What have you added to your code since it was last working?",
    "decision 16": 16,
    "decision 17": 17
  }, {
    "node": 9,
    "message": "Have you been asked such questions before?",
    "decision 16": 16,
    "decision 17": 17
  }, {
    "node": 10,
    "message": "What have you added to your code since it was last working?",
    "decision 16": 16,
    "decision 17": 17
  },
  // Answers & descriptions

  {
    "node": 11,
    "message": "No problem.  ",
    "yes": 0,
    "no": 0,
    "description": "An artist is a person engaged in one or more of any of a broad spectrum of activities related to creating art, practicing the arts, and, or demonstrating an art."
  }, {
    "node": 12,
    "message": "Zookeeper",
    "yes": 0,
    "no": 0,
    "description": "A zookeeper is a person who manages zoo animals that are kept in captivity for conservation or to be displayed to the public, and are usually responsible for the feeding and daily care of the animals."
  }, {
    "node": 13,
    "message": "Software engineer",
    "yes": 0,
    "no": 0,
    "description": "A software engineer is a person who applies the principles of software engineering to the design, development, maintenance, testing, and evaluation of the software and systems that make computers or anything containing software work."
  }, {
    "node": 14,
    "message": "Security Guard",
    "yes": 0,
    "no": 0,
    "description": "A security guard is a private person who is paid to protect an organization's assets from various hazards such as criminal activity, by utilizing preventative measures. "
  }, {
    "node": 15,
    "message": "Lighthouse keeper",
    "yes": 0,
    "no": 0,
    "description": "A lighthouse keeper is the person responsible for tending and caring for a lighthouse, particularly the light and lens in the days when oil lamps and clockwork mechanisms were used."
  }
];

// This is the intial welcome message
var welcomeMessage = "Welcome to Quack, do you want help with a coding problem?";

// This is the message that is repeated if the response to the initial welcome message is not heard
var repeatWelcomeMessage = "Say yes to start or no to quit.";

// this is the message that is repeated if Alexa does not hear/understand the reponse to the welcome message
var promptToStartMessage = "Say yes to continue, or no to exit quack.";

// This is the prompt during the game when Alexa doesnt hear or understand a yes / no reply
var promptToSayYesNo = "Please say yes or no to indicate if you need help.";

// This is the response to the user after the final question when Alex decides on what group choice the user should be given
var decisionMessage = "Part of being a good programmer is exercizing self-care.  Be sure to take a break from time to time.  And remember: you've got this!";

// This is the prompt to ask the user if they would like to hear a short description of thier chosen profession or to play again
var playAgainMessage = "Congratulations on getting unstuck!  Quack!  I knew you could do it!  Just keep coding, and it'll get easier and easier.  Do you want help debugging another part of your code?";

// this is the help message during the setup at the beginning of the game
var helpMessage = "From time to time, we all get stuck while growing as software developers.  Sometimes, taking a break and steadying ourselves can be beneficial.  I'm here to help you get unstuck.  Ready to get quacking?";

// This is the goodbye message when the user has asked to quit the game
var goodbyeMessage = "Quack!  Quack!  If you need help again, come back!";

var speechNotFoundMessage = "Quack!  Quack!  I didn't understand that!";

var nodeNotFoundMessage = "Quack!  You must be a ninja because the node you're looking for vanished!  404'd!";

var descriptionNotFoundMessage = "This node needs a proper description.  Can you help with that?  Quack!";

var loopsDetectedMessage = "Quack!  So, I heard you like tautologies...";

var utteranceTellMeMore = "You have such a lovely voice.  Tell me more.  Quack!";

var utterancePlayAgain = "Quack! Do you need help getting unstuck again?";

// the first node that we will use
var START_NODE = 1;
