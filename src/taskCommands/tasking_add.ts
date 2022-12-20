import { ChannelType, EmbedBuilder, PermissionFlagsBits, SlashCommandBuilder } from "discord.js";
import { SlashCommand } from "../types";
import User from "../schemas/User"

const SayCommand : SlashCommand = {
    command: new SlashCommandBuilder()
    .setName("task_add")
    .setDescription("Adds a NEW task to the existing queue...")
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
    execute: async (interaction) => {

        let userProfile = await User.findOne({ userID: interaction.user.id });

        if (!userProfile) {

            let nousrembed = new EmbedBuilder()
            .setTitle("🛑 TaskBot Error")
            .setDescription(`<@${interaction.user.id}> : You do not have a task creator account on this server yet 🚫`)
            .setFooter({ text: "Try the /buy_sub command", iconURL: interaction.client.user?.displayAvatarURL() || undefined })

            await interaction.reply({ embeds: [nousrembed] })
        } else {

            let usrBal = userProfile.balance.clt

            if (usrBal <= 0) {

                let nobalembed = new EmbedBuilder()
                .setTitle("🛑 TaskBot Error")
                .setDescription(`<@${interaction.user.id}> : You do not have enough credit to create any tasks 🚫`)
                .setFooter({ text: "Try the /buy_sub command", iconURL: interaction.client.user?.displayAvatarURL() || undefined })

                await interaction.reply({ embeds: [nobalembed] })
            }
        }
    },
    cooldown: 10
}

export default SayCommand;