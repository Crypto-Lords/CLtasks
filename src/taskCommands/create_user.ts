import { PermissionFlagsBits, SlashCommandBuilder } from "discord.js";
import { SlashCommand, UserBal } from "../types";
import User from "../schemas/User";
import { setUserBalance } from "../functions";

const SayCommand : SlashCommand = {
    command: new SlashCommandBuilder()
    .setName("create_user")
    .setDescription("Makes the bot say anything you want.")
    .addUserOption(option => {
        return option
        .setName("user")
        .setDescription("The user you would like to create an account for")
        .setRequired(true)
    })
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
    execute: async (interaction) => {

        let newmember = interaction.options.getUser("user");
        
        let userProfile = await User.findOne({ userID: newmember?.id });

        if (!userProfile) {

            let newUsr = new User({
                userID: newmember?.id,
                balance: {
                    clt: 0
                }
            })
            await newUsr.save().catch(console.error);

            interaction.reply({ content: `No user found for ${newmember}\nAccount has been created with zero balances`})
        } else {

            interaction.reply({ content: `Account already exists for ${newmember} with ${userProfile.balance.clt} CLT`})
        }
    },
    cooldown: 10
}

export default SayCommand;