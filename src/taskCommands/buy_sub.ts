import { ActionRowBuilder, ButtonBuilder, ButtonStyle, ChannelType, EmbedBuilder, PermissionFlagsBits, SlashCommandBuilder, StringSelectMenuBuilder } from "discord.js";
import { getUserBalance, setUserBalance } from "../functions";
import { SlashCommand, UserBal } from "../types";
import User from "../schemas/User";

const SayCommand : SlashCommand = {
    
    command: new SlashCommandBuilder()
    .setName("buy_sub")
    .setDescription("Buy a new sub on task bot to create tasks")
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
    
    execute: async (interaction) => {

        let userProfile = await User.findOne({ userID: interaction.user.id });

        if (!userProfile) {

            let newsubembed = new EmbedBuilder()
            .setTitle("🛑 TaskBot Error")
            .setDescription(`<@${interaction.user.id}> : You do not have a task creator account on this server yet 🚫`)
            .setFooter({ text: "Try one of the options below", iconURL: interaction.client.user?.displayAvatarURL() || undefined })

            let buysubselectmenu = new ActionRowBuilder<StringSelectMenuBuilder>()
            .addComponents(
                new StringSelectMenuBuilder()
                .setCustomId("buy_sub_select")
                .setPlaceholder("Select an option")
                .addOptions(
                    {
                        label: "Buy using CLT balance",
                        description: "Buy a subscription using your CLT balance in the taskbot",
                        value: "buy_with_clt"
                    },
                    {
                        label: 'Buy using tip.cc deposit',
                        description: 'Buy a subscription using by depositing tip.cc currencies to the bot',
                        value: 'buy_tip_cc',
                    },
                )
            )

            await interaction.reply({ embeds: [newsubembed], components: [buysubselectmenu] });
        } else {

            let nobalembed = new EmbedBuilder()
                .setTitle("🛑 TaskBot Error")
                .setDescription(`<@${interaction.user.id}> : You have ${userProfile.balance.clt} CLT in your wallet`)
                .setFooter({ text: "Try the /buy_sub command", iconURL: interaction.client.user?.displayAvatarURL() || undefined })

                await interaction.reply({ embeds: [nobalembed] })
        }
    },
    cooldown: 10
}

export default SayCommand;