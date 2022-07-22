import {MongoClient} from 'mongodb';

// /api/new-meetup
// POST /api/new-meetup

async function Personal_spacehandler(req, res) {
  if (req.method === "POST") {
    const data = req.body;

    //不會出現在client端，安全!
    const client =  await MongoClient.connect('mongodb+srv://happyday99:happy@cluster0.pflxs.mongodb.net/meetups?retryWrites=true&w=majority');
    const db = client.db();

    const registerCollection = db.collection('personal-space');

    const result = await registerCollection.insertOne(data);

    console.log(result);

    client.close();

    //res.status(201).json({message: '註冊成功'});
  }
}

export default Personal_spacehandler;