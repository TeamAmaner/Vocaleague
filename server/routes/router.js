const {
  getAnswers,
  getUserById,
  getUsers,
  getQus,
  getQuById,
  postAnswer,
  postUser,
  postQu,
  putQu,
  deleteAnswers,
  deleteAnswerById,
  deleteUserById,
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
    id: { type: 'string' },
    name: { type: 'string' },
    avatar_url: { type: 'string' },
  },
};

const Qu = {
  type: 'object',
  properties: {
    id: { type: 'string' },
    ready: { type: 'string' },
    q: { type: 'string' },
    a: { type: 'string' },
    date: { type: 'string' },
  }
}


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

// Options for /getMessages
const getQusOpts = {
  schema: {
    response: {
      200: {
        type: 'array',
        message: Qu,
      },
    },
  },
  handler: getQus,
};

// Options for /getUserById
const getQuByIdOpts = {
  schema: {
    response: {
      200: Qu,
    },
  },
  handler: getQuById,
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
const postUserOpts = {
  schema: {
    response: {
      200: User,
    },
    response: {
      201: User,
    },
  },
  handler: postUser,
};

// Options for /postMessage
const postQuOpts = {
  schema: {
    response: {
      200: Qu,
    },
    response: {
      201: Qu,
    },
  },
  handler: postQu,
};

// Options for /postMessage
const putQuOpts = {
  schema: {
    response: {
      200: Qu,
    },
    response: {
      201: Qu,
    },
  },
  handler: putQu,
};



// Options for /postMessage
const deleteAnswersOpts = {
  handler: deleteAnswers,
};

// Options for /getUserById
const deleteAnswerByIdOpts = {
  handler: deleteAnswerById,
};

const deleteUserByIdOpts = {
  handler: deleteUserById,
};


function itemRoutes(fastify, options, done) {
  // Get messages by channelId
  fastify.get('/answers', getAnswersOpts);

  // Get user by userId
  fastify.get('/users/:id', getUserByIdOpts);

  // Get users by channelId
  fastify.get('/users', getUsersOpts);

  // Get users by channelId
  fastify.get('/qus', getQusOpts);

  // Get user by userId
  fastify.get('/qus/:id', getQuByIdOpts);

  // Add message
  fastify.post('/answers', postAnswerOpts);

  fastify.post('/users', postUserOpts);

  fastify.post('/qus', postQuOpts);

  fastify.put('/qus/:id', putQuOpts);

  fastify.delete('/answers', deleteAnswersOpts);

  fastify.delete('/answers/:id', deleteAnswerByIdOpts);

  fastify.delete('/users/:id', deleteUserByIdOpts);

  done();
}

module.exports = itemRoutes;
