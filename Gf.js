const axios = require('axios');  // Make sure you import axios for HTTP requests

  module.exports.config = {
    name: "gf",
    aliases: ["ck", "tesh"],
    permission: 0,
    credits: "Nayan",
    prefix: 'auto',
    description: "guide",
  };

  module.exports.start = async ({ event, api, config, match }) => {
    try {
      // Fetch data from the API
      const response = await axios.get("https://gf-api-imran.onrender.com/imugf");
      const data = response.data.data;
      const title = data.title;
      const url = data.url;
      const authorName = response.data.author.name;

      // Fetch the media stream
      const media = await axios.get(url, { responseType: 'stream' }).then(res => res.data);

      // Send the image with the fetched data
      await api.sendPhoto(event.threadId, media, { caption: `${title},\n\nAuthor: ${authorName}`});

    } catch (error) {
      console.error('Error fetching data:', error);
      // Optionally, send a message if there's an error
      await api.sendMessage("Sorry, there was an error fetching the image. Please try again later.", event.threadId);
    }
  };
