const { Kafka } = require('kafkajs');
console.log('hello kafka');
const kafka = new Kafka({
  clientId: 'my-app',
  brokers: ['kafka:29092']
});

const producer = kafka.producer();

console.log('producer is:%s',producer);

var producer_fn = async () => {
    await producer.connect();
    await producer.send({
      topic: 'topic-name',
      messages: [
        { key: 'key1', value: 'hello world'+ new Date(), carlos:'123'},
      ],
    });
    // before you exit your app
    await producer.disconnect();
};

setInterval(()=>{
  producer_fn()
    .then(()=>{
      console.log('producer finish');
    })
    .catch(err=>{
      console.log('producer err:',err);
    });
},10000);

