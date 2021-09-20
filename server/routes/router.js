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

const Answer = {
  type: 'object',
  properties: {
    answer: { type: 'string' },
    date: { type: 'string' },
    id: { type: 'string' },
  },
};

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


const getUserByIdOpts = {
  schema: {
    response: {
      200: User,
    },
  },
  handler: getUserById,
};

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

const getQuByIdOpts = {
  schema: {
    response: {
      200: Qu,
    },
  },
  handler: getQuById,
};

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

const deleteAnswersOpts = {
  handler: deleteAnswers,
};

const deleteAnswerByIdOpts = {
  handler: deleteAnswerById,
};

const deleteUserByIdOpts = {
  handler: deleteUserById,
};


function itemRoutes(fastify, options, done) {
  
  fastify.get('/answers', getAnswersOpts);

  fastify.get('/users/:id', getUserByIdOpts);

  fastify.get('/users', getUsersOpts);

  fastify.get('/qus', getQusOpts);

  fastify.get('/qus/:id', getQuByIdOpts);

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
