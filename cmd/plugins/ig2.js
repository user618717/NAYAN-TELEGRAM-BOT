const axios = require("axios");
const fs = require("fs-extra");

module.exports = {
  config: {
    name: `${global.config.prefix}`,  // Dynamic prefix from global config
    credits: "Nayan",
    prefix: "auto",
    aliases: ["/"],
    description: "Random Caption With random photo",
    tags: ["General"],
  },

  start: async ({ event, api }) => {
    const From = event.threadId;
    
    try {
      // Fetch data from the API
      const res = await axios.get("https://ig-api-qu3y.onrender.com/ig");
      const data = res.data.data;
      const title = data.title;
      const url = data.url;

      // Fetch the video stream from the URL
      const videoResponse = await axios.get(url, { responseType: 'stream' });
      const videoStream = videoResponse.data;

      // Define the path to store the video temporarily
      const videoFileName = __dirname + "/cache/video.mp4";
      const writeStream = fs.createWriteStream(videoFileName);

      // Pipe the video stream to a file
      videoStream.pipe(writeStream);

      // Once the video has been fully written, send the photo along with the caption
      writeStream.on("finish", () => {
        const msg = `°「 === 「𝗣𝗿𝗲𝗳𝗶𝘅 𝐸𝐯𝐞𝐧𝐭」  ===\n--❖-- 𝐈𝐭'𝐬 𝗠𝗮𝗵𝗮𝗯𝘂𝗯(✷‿✷) --❖--\n✢━━━━━━━━━━━━━━━✢\n\n__${title}\n\n✢━━━━━━━━━━━━━━━✢\n𝐂𝐫𝐞𝐚𝐭𝐨𝐫 : 𝗠𝗔𝗛𝗔𝗕𝗨𝗕 𝗥𝗔𝗛𝗠𝗔𝗡 (✷‿✷) 」`;

        // Send the photo (video file) along with the caption
        api.sendPhoto(From, videoFileName, {
          caption: msg,
          reply_to_message_id: event.messageId, // Respond to the original message
        });
      });
    } catch (error) {
      console.error("Error in generating content:", error);
      // Send an error message in case of failure
      api.sendMessage("❌ An error occurred. Please try again later.", event.threadId);
    }
  },
};
