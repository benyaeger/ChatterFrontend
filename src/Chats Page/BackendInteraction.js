import { fetchAuthSession } from "@aws-amplify/auth";

// Auth
// Get user's JWT token
async function getUserToken() {
  try {
    const { accessToken, idToken } = (await fetchAuthSession()).tokens ?? {};
    if (accessToken) {
      return {
        'userTokenValid': true,
        'accessToken': accessToken,
        'idToken': idToken
      };
    }
  }
  catch (error) { }
  return {
    'userTokenValid': false,
    'accessToken': null,
    'idToken': null
  };
}

export async function searchForUser(first_name, last_name) {
  const { userTokenValid, accessToken, idToken } = await getUserToken();
  if (userTokenValid) {
    try {
      const response = await fetch(
        `http://16.171.25.156:5000/user?first_name=${first_name}&last_name=${last_name}`
        , {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${accessToken}`,
          }
        });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          `HTTP error! status: ${response.status}, ${JSON.stringify(data)}`
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
        `http://16.171.25.156:5000/newchat?owner_id=${owner_id}&chat_name=${chat_name}`,
        {
          method: "POST",
          headers: {
            'Authorization': `Bearer ${accessToken}`,
          }
        }
      );
      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          `HTTP error! status: ${response.status}, ${JSON.stringify(data)}`
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
      const query = `http://16.171.25.156:5000/add_user_to_chat?chat_id=${chat_id}&added_user_id=${added_user_id}`;

      const response = await fetch(query, {
        method: "POST", headers: {
          'Authorization': `Bearer ${accessToken}`,
        }
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          `HTTP error! status: ${response.status}, ${JSON.stringify(data)}`
        );
      }
      return data;
    } catch (error) {
      console.error("error:", error);
      throw error; // Re-throw error to handle it where the function is called
    }
  }
}

export async function getChatsOfUser(user_id) {
  const { userTokenValid, accessToken, idToken } = await getUserToken();

  if (userTokenValid) {
    try {
      const query = `http://16.171.25.156:5000/user_chats?user_id=${user_id}`;

      const response = await fetch(query, {
        method: "GET",
        headers: {
          'Authorization': `Bearer ${accessToken}`,
        }
      });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          `HTTP error! status: ${response.status}, ${JSON.stringify(data)}`
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
      const query = `http://16.171.25.156:5000/send_message?user_id=${user_id}&chat_id=${chat_id}&message_content=${message_content}`;

      const response = await fetch(query, {
        method: "POST",
        headers: {
          'Authorization': `Bearer ${accessToken}`,
        }
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(
          `HTTP error! status: ${response.status}, ${JSON.stringify(data)}`
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
      const query = `http://16.171.25.156:5000/get_chat_messages?chat_id=${chat_id}&number_of_messages=${number_of_messages}`;

      const response = await fetch(query, {
        method: "GET",
        headers: {
          'Authorization': `Bearer ${accessToken}`,
        }
      });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          `HTTP error! status: ${response.status}, ${JSON.stringify(data)}`
        );
      }
      return data;
    } catch (error) {
      console.error("error:", error);
      throw error; // Re-throw error to handle it where the function is called
    }
  }
}
