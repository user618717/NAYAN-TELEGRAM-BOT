module.exports = {
  config: {
    name: "info",
    prefix: "auto",
    credits: "Nayan",
    aliases: ["info", "details"],
    permission: 0,
    description: "Displays detailed information about the admin, bot, and server",
    tags: ["Utility"],
  },
  start: async ({ event, api }) => {
    const { threadId } = event;

    const n = await api.getMe();

    
    const formatUptime = (uptime) => {
      const hours = Math.floor(uptime / 3600);
      const minutes = Math.floor((uptime % 3600) / 60);
      const seconds = Math.floor(uptime % 60);
      return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    };

    const uptime = formatUptime(process.uptime());

    
    const adminInfo = `
𝐀𝐝𝐦𝐢𝐧 𝐈𝐧𝐟𝐨
𝐍𝐚𝐦𝐞       : 𝐌𝐚𝐡𝐚𝐛𝐮𝐛 𝐑𝐚𝐡𝐦𝐚𝐧
𝐅𝐚𝐜𝐞𝐛𝐨𝐨𝐤 : MR᭄﹅ MAHABUB﹅ メꪜ 
𝐑𝐞𝐥𝐢𝐠𝐢𝐨𝐧   : 𝐈𝐬𝐥𝐚𝐦
𝐏𝐞𝐫𝐦𝐚𝐧𝐞𝐧𝐭 𝐀𝐝𝐝𝐫𝐞𝐬𝐬: 𝐁𝐨𝐠𝐮𝐫𝐚, 𝐁𝐚𝐧𝐝𝐠𝐥𝐚𝐝𝐞𝐬𝐡
𝐂𝐮𝐫𝐫𝐞𝐧𝐭 𝐀𝐝𝐝𝐫𝐞𝐬𝐬: 𝐊𝐮𝐧𝐝𝐨𝐠𝐫𝐚𝐦, 𝐀𝐝𝐨𝐦𝐝𝐢𝐠𝐡𝐢, 𝐁𝐨𝐠𝐮𝐫𝐚
𝐆𝐞𝐧𝐝𝐞𝐫   : 𝐌𝐚𝐥𝐞
𝐀𝐠𝐞       : 𝟏𝟖+
𝐑𝐞𝐥𝐚𝐭𝐢𝐨𝐧𝐬𝐡𝐢𝐩 : 𝐒𝐢𝐧𝐠𝐥𝐞
𝐖𝐨𝐫𝐤      : 𝐒𝐭𝐮𝐝𝐞𝐧𝐭
𝐆𝐦𝐚𝐢𝐥     : mahaburpk479@gmail.com
𝐖𝐡𝐚𝐭𝐬𝐀𝐩𝐩 : wa.me/+8801613356376
𝐓𝐞𝐥𝐞𝐠𝐫𝐚𝐦  : t.me/Mahabub_x_Rahman
𝐅𝐚𝐜𝐞𝐛𝐨𝐨𝐤 𝐋𝐢𝐧𝐤 : https://www.facebook.com/www.xnxx.com.140
`;

    
    const botInfo = `
𝐁𝐨𝐭 𝐈𝐧𝐟𝐨
𝐁𝐨𝐭 𝐔𝐬𝐞𝐫 𝐍𝐚𝐦𝐞: ${n.username || "N/A"}
𝐁𝐨𝐭 𝐍𝐚𝐦𝐞       : ${n.first_name || "N/A"}
𝐁𝐨𝐭 𝐔𝐬𝐞𝐫 𝐈𝐃     : ${n.id || "N/A"}
`;

    
    const serverInfo = `
𝐒𝐞𝐫𝐯𝐞𝐫 𝐈𝐧𝐟𝐨
𝐒𝐞𝐫𝐯𝐞𝐫 𝐔𝐩𝐭𝐢𝐦𝐞      : ${uptime}
𝐒𝐞𝐫𝐯𝐞𝐫 𝐍𝐨𝐝𝐞 𝐕𝐞𝐫𝐬𝐢𝐨𝐧 : ${process.version}
𝐌𝐞𝐦𝐨𝐫𝐲 𝐔𝐬𝐞𝐝      : ${(process.memoryUsage().rss / 1024 / 1024).toFixed(2)} MB
`;

    const fullInfo = `${adminInfo}\n${botInfo}\n${serverInfo}`;
    await api.sendMessage(threadId, fullInfo.trim());
  },
};
