import { EmbedBuilder, Interaction } from "discord.js";
import { BotEvent } from "../types";

const event : BotEvent = {
    name: "interactionCreate",
    execute: (interaction: Interaction) => {
        
        if (!interaction.isSelectMenu()) return;

        const selected = interaction.values.join(', ');
        
        try {
            
            if (interaction.customId === "buy_sub_select") {
                
                if (selected === "buy_with_clt") {

                    let cltipbuyembed = new EmbedBuilder()
                    .setTitle("✅ Crypto Lords TaskBot")
                    .setDescription("Follow the instructions below to deposit and/or transfer *CLT* to your taskbot balance")
                    .addFields(
                        { name: 'Buy CLT on CLtip', value: "You can buy CLT on the CLtip bot" },
                        { name: 'Buy your sub', value: "After completing the above, you can use the */buy_sub* command again" },
                    )
                    .setTimestamp()

                    interaction.update({ content: "", embeds: [cltipbuyembed], components: [] })

                } else if (selected === "buy_tip_cc") {

                    let tipccbuyembed = new EmbedBuilder()
                    .setTitle("✅ Crypto Lords TaskBot")
                    .setDescription("Follow the instructions below to deposit and/or transfer *CLT* to your taskbot balance")
                    .addFields(
                        { name: 'Buy CLT on CLtip', value: "You can buy CLT on CLtip and transfer to the taskbot using the */transfer* command. Your taskbot balance will be updated automatically after doing that" },
                        { name: 'Buy your sub', value: "After completing the above, you can use the */buy_sub* command again" },
                    )
                    .setTimestamp()

                    interaction.update({ content: "", embeds: [tipccbuyembed], components: [] })

                }

            }
        
        } catch (error) {
            
            console.error(error);
        
        }
    }

}

export default event;