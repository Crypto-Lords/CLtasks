import chalk from "chalk"
import { Guild, GuildMember, PermissionFlagsBits, PermissionResolvable, TextChannel, User } from "discord.js"
import GuildDB from "./schemas/Guild"
import UserDB from "./schemas/User"
import { GuildOption, UserBal } from "./types"
import mongoose from "mongoose";

type colorType = "success" | "text" | "variable" | "error"

const themeColors = {
    success: "#00FF17",
    text: "#4DF4FF",
    variable: "#FF624D",
    error: "#FF0000"
}

export const getThemeColor = (color: colorType) => Number(`0x${themeColors[color].substring(1)}`)

export const color = (color: colorType, message: any) => {
    return chalk.hex(themeColors[color])(message)
}

export const checkPermissions = (member: GuildMember, permissions: Array<PermissionResolvable>) => {
    let neededPermissions: PermissionResolvable[] = []
    permissions.forEach(permission => {
        if (!member.permissions.has(permission)) neededPermissions.push(permission)
    })
    if (neededPermissions.length === 0) return null
    return neededPermissions.map(p => {
        if (typeof p === "string") return p.split(/(?=[A-Z])/).join(" ")
        else return Object.keys(PermissionFlagsBits).find(k => Object(PermissionFlagsBits)[k] === p)?.split(/(?=[A-Z])/).join(" ")
    })
}

export const sendTimedMessage = (message: string, channel: TextChannel, duration: number) => {
    channel.send(message)
        .then(m => setTimeout(async () => (await channel.messages.fetch(m)).delete(), duration))
    return
}

export const getGuildOption = async (guild: Guild, option: GuildOption) => {
    if (mongoose.connection.readyState === 0) throw new Error("Database not connected.")
    let foundGuild = await GuildDB.findOne({ guildID: guild.id })
    if (!foundGuild) return null;
    return foundGuild.options[option]
}

export const setGuildOption = async (guild: Guild, option: GuildOption, value: any) => {
    if (mongoose.connection.readyState === 0) throw new Error("Database not connected.")
    let foundGuild = await GuildDB.findOne({ guildID: guild.id })
    if (!foundGuild) return null;
    foundGuild.options[option] = value
    foundGuild.save()
}

export const getUserBalance = async (user: User, option: UserBal) => {
    if (mongoose.connection.readyState === 0) throw new Error("Database not connected.")
    let foundUser = await UserDB.findOne({ userID: user.id })
    if (!foundUser) return null;
    return foundUser.balance[option]
}

export const setUserBalance = async (user: User, option: UserBal, value: any) => {
    if (mongoose.connection.readyState === 0) throw new Error("Database not connected.")
    let foundUser = await UserDB.findOne({ userID: user.id })
    if (!foundUser) return null;
    foundUser.balance[option] = value
    foundUser.save()
}