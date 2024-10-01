import { fetchAuthSession } from "@aws-amplify/auth";
import {
  DEV_SERVER_IP,
  DEV_SERVER_PORT,
  PROD_SERVER_IP,
  PROD_SERVER_PORT,
  ACTIVE_SERVER,
} from "../NETWROK_CONSTS";

const SERVER_IP = ACTIVE_SERVER === "DEV" ? DEV_SERVER_IP : PROD_SERVER_IP;
const SERVER_PORT =
  ACTIVE_SERVER === "DEV" ? PROD_SERVER_PORT : DEV_SERVER_PORT;

// Auth
// Get user's JWT token
async function getUserToken() {
  try {
    const { credentials, tokens } = await fetchAuthSession();
    if (credentials.accessKeyId) {
      return {
        userTokenValid: true,
        accessToken: tokens.accessToken,
        idToken: tokens.idToken,
      };
    }
  } catch (error) {}
  return {
    userTokenValid: false,
    accessToken: null,
    idToken: null,
  };
}

export async function searchForUser(first_name, last_name) {
  const { userTokenValid, accessToken, idToken } = await getUserToken();
  if (userTokenValid) {
    try {
      const response = await fetch(
        `http://${SERVER_IP}:${SERVER_PORT}/user?first_name=${first_name}&last_name=${last_name}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          `http error! status: ${response.status}, ${JSON.stringify(data)}`
        );
      }
      return data;
    } catch (error) {
      console.error("Fetch error:", error);
      throw error; // Re-throw error to handle it where the function is called
    }
  }
}

export async function getUserByUsername(username) {
  const { userTokenValid, accessToken, idToken } = await getUserToken();
  console.log(userTokenValid);
  if (userTokenValid) {
    try {
      const response = await fetch(
        `http://${SERVER_IP}:${SERVER_PORT}/user_by_username?user_name=${username}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      const data = await response.json();
      if (!response.ok) {
        throw new Error(
          `http error! status: ${response.status}, ${JSON.stringify(data)}`
        );
      }
      return data;
    } catch (error) {
      console.error("Fetch error:", error);
      throw error; // Re-throw error to handle it where the function is called
    }
  }
}

export async function createNewChat(owner_id, chat_name) {
  const { userTokenValid, accessToken, idToken } = await getUserToken();
  if (userTokenValid) {
    try {
      const response = await fetch(
        `http://${SERVER_IP}:${SERVER_PORT}/newchat?owner_id=${owner_id}&chat_name=${chat_name}`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          `http error! status: ${response.status}, ${JSON.stringify(data)}`
        );
      }
      return data;
    } catch (error) {
      console.error("error:", error);
      throw error; // Re-throw error to handle it where the function is called
    }
  }
}

export async function addUserToChat(chat_id, added_user_id) {
  const { userTokenValid, accessToken, idToken } = await getUserToken();
  if (userTokenValid) {
    try {
      const query = `http://${SERVER_IP}:${SERVER_PORT}/add_user_to_chat?chat_id=${chat_id}&added_user_id=${added_user_id}`;

      const response = await fetch(query, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          `http error! status: ${response.status}, ${JSON.stringify(data)}`
        );
      }
      return data;
    } catch (error) {
      console.error("error:", error);
      throw error; // Re-throw error to handle it where the function is called
    }
  }
}

export async function getChatsOfUser(user_name) {
  const { userTokenValid, accessToken, idToken } = await getUserToken();
  if (userTokenValid) {
    try {
      const query = `http://${SERVER_IP}:${SERVER_PORT}/user_chats?user_name=${user_name}`;

      const response = await fetch(query, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          `http error! status: ${response.status}, ${JSON.stringify(data)}`
        );
      }
      return data;
    } catch (error) {
      console.error("error:", error);
      throw error; // Re-throw error to handle it where the function is called
    }
  }
}

export async function sendMessage(user_id, chat_id, message_content) {
  const { userTokenValid, accessToken, idToken } = await getUserToken();
  if (userTokenValid) {
    try {
      const query = `http://${SERVER_IP}:${SERVER_PORT}/send_message?user_id=${user_id}&chat_id=${chat_id}&message_content=${message_content}`;

      const response = await fetch(query, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(
          `http error! status: ${response.status}, ${JSON.stringify(data)}`
        );
      }
      return data;
    } catch (error) {
      console.error("error:", error);
      throw error; // Re-throw error to handle it where the function is called
    }
  }
}

export async function getMessagesOfChat(chat_id, number_of_messages) {
  const { userTokenValid, accessToken, idToken } = await getUserToken();
  if (userTokenValid) {
    try {
      const query = `http://${SERVER_IP}:${SERVER_PORT}/get_chat_messages?chat_id=${chat_id}&number_of_messages=${number_of_messages}`;

      const response = await fetch(query, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(
          `http error! status: ${response.status}, ${JSON.stringify(data)}`
        );
      }
      return data;
    } catch (error) {
      console.error("error:", error);
      throw error; // Re-throw error to handle it where the function is called
    }
  }
}
