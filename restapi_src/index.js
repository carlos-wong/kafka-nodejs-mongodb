const { Kafka } = require('kafkajs');
console.log('hello kafka');

setInterval(()=>{

},2000);
const kafka = new Kafka({
  clientId: 'data-recorder',
  brokers: ['kafka:29092']
});

const consumer = kafka.consumer({ groupId: 'save-data-to-db' });

var consumer_fn = async () => {
  await consumer.connect();
  console.log('consumer connected');
  // Subscribe can be called several times
  await consumer.subscribe({ topic: 'topic-name' });
  console.log('consumer subscribed');
  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      console.log('dump consumer eachMessage',message.value.toString());
    },
  });
};
consumer_fn()
  .then(()=>{
    console.log('consumer finish');
  })
  .catch(err=>{
    console.log('consumer err:',err);
  });

const producer = kafka.producer();

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
  producer_fn().then(()=>{}).catch(()=>{});
},5000);
