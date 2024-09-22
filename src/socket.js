import { io } from "socket.io-client";
import { DEV_SERVER_IP, DEV_SERVER_PORT, PROD_SERVER_IP, PROD_SERVER_PORT, ACTIVE_SERVER } from "./NETWROK_CONSTS";

const dev_URL = process.env.NODE_ENV === 'production' ? undefined : `http://${DEV_SERVER_IP}:${DEV_SERVER_PORT}`

const production_URL = process.env.NODE_ENV === 'production' ? undefined : `http://${PROD_SERVER_IP}:${PROD_SERVER_PORT}`

export const socket = io(ACTIVE_SERVER === 'DEV' ? dev_URL : production_URL, {
    autoConnect: false
});
