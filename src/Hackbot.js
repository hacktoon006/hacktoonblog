import axios from 'axios';

export const askHackBot = async (message) => {
  try {
    const res = await axios.post('/api/hackbot', { prompt: message });
    return res.data.reply;
  } catch (err) {
    return "⚠️ HackBot couldn't respond. Try again later.";
  }
};
