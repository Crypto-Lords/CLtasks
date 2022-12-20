import { Client } from "discord.js";
import { BotEvent } from "../types";
import { color } from "../functions";

const event : BotEvent = {
    name: "ready",
    once: true,
    execute: (client : Client) => {
        console.log(
            color("text", `🤖 Logged in as ${color("success", client.user?.tag)} => 🆔: ${color("success", client.user?.id)}`)
        )
    }
}

export default event;