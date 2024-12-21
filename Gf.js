const axios = require('axios');

module.exports = {
  event: "message", // Specifies the event type (message event)
  handle: async ({ msg, bot }) => {
    const chatId = msg.chat.id; // Get the chat ID from the incoming message
    const text = msg.text;      // Extract the message text

    
    if (text && text.toLowerCase() === "gf") {
      try {
        // Fetch data from the API
        const imran = await axios.get("https://gf-api-imran.onrender.com/imugf");
        const data = imran.data.data;
        const title = data.title;
        const url = data.url;
        const authorName = imran.data.author.name;

        // Fetch the media stream
        const media = (
          await axios.get(url, { responseType: 'stream' })
        ).data;

        // Send a message with fetched data
        await bot.sendMessage(chatId, `Title: ${title}\nAuthor: ${authorName}`);

     
        await bot.sendPhoto(chatId, media, { caption: `Image by ${authorName}` });
      } catch (error) {
        console.error('Error fetching data:', error);
        await bot.sendMessage(chatId, 'Sorry, there was an error fetching the data.');
      }
    }
  },
};
