import { ChannelType, PermissionFlagsBits, SlashCommandBuilder } from "discord.js";
import { SlashCommand } from "../types";

const SayCommand : SlashCommand = {
    command: new SlashCommandBuilder()
    .setName("say")
    .setDescription("Makes the bot say anything you want.")
    .addStringOption(option => {
        return option
        .setName("string")
        .setDescription("Enter the string you would like the bot to repeat")
        .setRequired(true)
    })
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
    execute: async (interaction) => {
        let messageString = String(interaction.options.get("string")?.value)
        if(interaction.channel?.type === ChannelType.DM) return;
        else
        await interaction.deferReply({ephemeral: true})
        interaction.editReply({content: "<:CLT:1045427908199592046> Message repeated..."})
        interaction.channel?.send(`${messageString}`)
    },
    cooldown: 10
}

export default SayCommand;