const {
  getAnswers,
  getUserById,
  getUsers,
  postAnswer,
  deleteAnswers,
  deleteAnswerById
} = require('../controllers/messages');

// Message schema
const Answer = {
  type: 'object',
  properties: {
    answer: { type: 'string' },
    date: { type: 'string' },
    id: { type: 'string' },
  },
};

// User schema
const User = {
  type: 'object',
  properties: {
    name: { type: 'string' },
    id: { type: 'string' },
    avatar_url: { type: 'string' },
  },
};

// Options for /getUserById
const getUserByIdOpts = {
  schema: {
    response: {
      200: User,
    },
  },
  handler: getUserById,
};

// Options for /getUsers
const getUsersOpts = {
  schema: {
    response: {
      200: {
        type: 'array',
        message: User,
      },
    },
  },
  handler: getUsers,
};

// Options for /getMessages
const getAnswersOpts = {
  schema: {
    response: {
      200: {
        type: 'array',
        message: Answer,
      },
    },
  },
  handler: getAnswers,
};

// Options for /postMessage
const postAnswerOpts = {
  schema: {
    response: {
      200: Answer,
    },
    response: {
      201: Answer,
    },
  },
  handler: postAnswer,
};


// Options for /postMessage
const deleteAnswersOpts = {
  handler: deleteAnswers,
};

// Options for /getUserById
const deleteAnswerByIdOpts = {
  handler: deleteAnswerById,
};


function itemRoutes(fastify, options, done) {
  // Get messages by channelId
  fastify.get('/answers', getAnswersOpts);

  // Get user by userId
  fastify.get('/users/:id', getUserByIdOpts);

  // Get users by channelId
  fastify.get('/users', getUsersOpts);

  // Add message
  fastify.post('/answers', postAnswerOpts);

  fastify.delete('/answers', deleteAnswersOpts);

  fastify.delete('/answers/:id', deleteAnswerByIdOpts);

  done();
}

module.exports = itemRoutes;
