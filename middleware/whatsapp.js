const axios = require("axios");
require("dotenv").config();

const sendWhatsAppMessage = async (
  phoneNumber,
  template,
  messagescript,
  whatsapp_url
) => {
  const url = whatsapp_url;
  const access_token = process.env.WHATSAPP_ACCESS_TOKEN;  try {
    const headers = {
      Authorization: `Bearer ${access_token}`,
      "Content-Type": "application/json",
    };

    const parameters = messagescript.map((item) => ({
      type: "text",
      text: item.value,
    }));

    const data = {
      messaging_product: "whatsapp",
      to: phoneNumber,
      type: "template",
      template: {
        name: template,
        language: { code: "en_US" },
        components: [
          {
            type: "body",
            parameters: parameters,
          },
        ],
      },
    };
    const response = await axios.post(url, data, { headers });
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

module.exports={sendWhatsAppMessage};