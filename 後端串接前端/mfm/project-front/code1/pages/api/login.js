import {MongoClient} from 'mongodb';

// /api/new-meetup
// POST /api/new-meetup

async function LoginHandler(req, res) {
  if (req.method === "POST") {
    const data = req.body;

    //不會出現在client端，安全!
    const client =  await MongoClient.connect('mongodb+srv://happyday99:happy@cluster0.pflxs.mongodb.net/meetups?retryWrites=true&w=majority');
    const db = client.db();

    const LoginCollection = db.collection('Login');

    const result = await LoginCollection.insertOne(data);

    console.log(result);

    client.close();

    res.status(201).json({message: '登入成功'});
  }
}

export default LoginHandler;
