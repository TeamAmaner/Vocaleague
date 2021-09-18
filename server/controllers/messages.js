const axios = require('axios');
const instance = axios.create({ baseURL: 'http://localhost:5000' });

const getUserById = async (req, reply) => {
  try {
    const { id } = req.params;
    const data = await instance.get('/users/' + id).then((res) => res.data);

    reply.send(data);
  } catch (err) {
    reply.send(err);
  }
};

const getUsers = async (req, reply) => {
  try {
    const sortByName = (a, b) => {
      if (a.name < b.name) {
        return -1;
      }
      if (a.name > b.name) {
        return 1;
      }
      return 0;
    };

    const userList = await instance
      .get(`/users`)
      .then((res) => res.data?.sort(sortByName));

    reply.send(userList);
  } catch (err) {
    reply.send(err);
    console.error(err.response);
  }
};

const getAnswers = async (req, reply) => {
  try {
    const data = await instance.get('/answers').then((res) => res.data);

    const messageList = await Promise.all(
      data.map(async (msg) => {

        const user = await instance.get('/users/' + msg.id).then((res) => res.data);

        return {
          ...msg,
          username: user.name,
          // avatar_url: user?.avatar_url,
        };
      }),
    );

    reply.send(messageList);
  } catch (err) {
    reply.send(err);
    console.error(err.response);
  }
};

const getQus = async (req, reply) => {
  try {

    const Qus = await instance
      .get(`/qus`)
      .then((res) => res.data);

    reply.send(Qus);
  } catch (err) {
    reply.send(err);
    console.error(err.response);
  }
};

const postAnswer = async (req, reply) => {
  try {
    const { id, answer, name, date } = req.body;

    const msgData = {
      answer,
      id,
      name,
      date,
    };

    const data = await instance
      .post('/answers', JSON.stringify(msgData), {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then((res) => res.data);

    reply.code(201).send(data);
  } catch (err) {
    reply.send(err);
  }
};

const postQu = async (req, reply) => {
  try {
    const { id, ready, q, a, date } = req.body;

    const msgData = {
      id,
      ready,
      q,
      a,
      date,
    };

    const data = await instance
      .post('/qus', JSON.stringify(msgData), {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then((res) => res.data);

    reply.code(201).send(data);
  } catch (err) {
    reply.send(err);
  }
};


const postUser = async (req, reply) => {
  try {
    const { id, name, avatar_url } = req.body;

    const usrData = {
      id,
      name,
      avatar_url
    };

    await instance
      .post('/users', JSON.stringify(usrData), {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then((res) => res.data);

  } catch (err) {
    reply.send(err);
  }
};

const deleteAnswers = async (req, reply) => {
  try {
    await instance.delete('/answers').then((res) => res.data);
  } catch (err) {
    reply.send(err);
    console.error(err.response);
  }
};

const deleteAnswerById = async (req, reply) => {
  try {
    const { id } = req.params;
    await instance.delete('/answers/' + id).then((res) => res.data);
  } catch (err) {
    reply.send(err);
  }
};

const deleteUserById = async (req, reply) => {
  try {
    const { id } = req.params;
    await instance.delete('/users/' + id).then((res) => res.data);
  } catch (err) {
    reply.send(err);
  }
};


module.exports = {
  getAnswers,
  getUserById,
  getUsers,
  getQus,
  postAnswer,
  postUser,
  postQu,
  deleteAnswers,
  deleteAnswerById,
  deleteUserById,
};
