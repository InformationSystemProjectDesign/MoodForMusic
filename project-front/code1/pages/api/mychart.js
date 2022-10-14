import {MongoClient} from 'mongodb';

// /api/new-meetup
// POST /api/new-meetup

async function MyCharthandler(req, res) {
  if (req.method === "POST") {
    const data = req.body;

    //不會出現在client端，安全!
    const client =  await MongoClient.connect('mongodb+srv://happyday99:happy@cluster0.pflxs.mongodb.net/meetups?retryWrites=true&w=majority');
    const db = client.db();

    const MyChartCollection = db.collection('mychart');

    const result = await MyChartCollection.insertOne(data);

    console.log(result);

    client.close();

    res.status(201).json({message: '文章送出成功'});
  }
}

export default MyCharthandler;