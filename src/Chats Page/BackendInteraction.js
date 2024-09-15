export async function searchForUser(first_name, last_name) {
    try {
        const response = await fetch(`http://16.171.25.156:5000/user?first_name=${first_name}&last_name=${last_name}`)
        const data = await response.json();

        if (!response.ok) {

            throw new Error(`HTTP error! status: ${response.status}, ${JSON.stringify(data)}`);
        }
        return data;
    }
    catch (error) {
        console.error('Fetch error:', error);
        throw error; // Re-throw error to handle it where the function is called
    }
}

export async function createNewChat(owner_id, chat_name) {
    console.log(`values: ${owner_id, chat_name}`)
    try {
        const response = await fetch(`http://16.171.25.156:5000/newchat?owner_id=${owner_id}&chat_name=${chat_name}`, { method: 'POST' })
        const data = await response.json();
        console.log(`response: ${JSON.stringify(response)}`)
        console.log(`data: ${JSON.stringify(data)}`)

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}, ${JSON.stringify(data)}`);
        }
        return data;
    }
    catch (error) {
        console.error('error:', error);
        throw error; // Re-throw error to handle it where the function is called
    }
}

export async function addUserToChat(chat_id, added_user_id) {
    try {
        const query = `http://16.171.25.156:5000/add_user_to_chat?chat_id=${chat_id}&added_user_id=${added_user_id}`;
        console.log(query);
        const response = await fetch(query, { method: 'POST' });
        const data = await response.json();
        console.log(`data: ${JSON.stringify(data)}`);

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}, ${JSON.stringify(data)}`);
        }
        return data;
    }
    catch (error) {
        console.error('error:', error);
        throw error; // Re-throw error to handle it where the function is called
    }
}

export async function getChatsOfUser(user_id) {
    try {
        const query = `http://16.171.25.156:5000/user_chats?user_id=${user_id}`;
        console.log(query);
        const response = await fetch(query, { method: 'GET' });
        const data = await response.json();
        console.log(`data: ${JSON.stringify(data)}`);

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}, ${JSON.stringify(data)}`);
        }
        return data;
    }
    catch (error) {
        console.error('error:', error);
        throw error; // Re-throw error to handle it where the function is called
    }
}

export async function getMessagesOfChat(chat_id, numberOfMessages) {
    // TODO IMPLEMENT THIS
    // try {
    //     const query = `http://16.171.25.156:5000/user_chats?user_id=${user_id}`;
    //     console.log(query);
    //     const response = await fetch(query, { method: 'GET' });
    //     const data = await response.json();
    //     console.log(`data: ${JSON.stringify(data)}`);

    //     if (!response.ok) {
    //         throw new Error(`HTTP error! status: ${response.status}, ${JSON.stringify(data)}`);
    //     }
    //     return data;
    // }
    // catch (error) {
    //     console.error('error:', error);
    //     throw error; // Re-throw error to handle it where the function is called
    // }
}

export async function sendMessage(user_id, chat_id, message_content) {
    // TODO IMPLEMENT THIS
    // try {
    //     const query = `http://16.171.25.156:5000/user_chats?user_id=${user_id}`;
    //     console.log(query);
    //     const response = await fetch(query, { method: 'GET' });
    //     const data = await response.json();
    //     console.log(`data: ${JSON.stringify(data)}`);

    //     if (!response.ok) {
    //         throw new Error(`HTTP error! status: ${response.status}, ${JSON.stringify(data)}`);
    //     }
    //     return data;
    // }
    // catch (error) {
    //     console.error('error:', error);
    //     throw error; // Re-throw error to handle it where the function is called
    // }
}
