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

