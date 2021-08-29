from discord.ext import commands
from discord_slash import SlashCommand

from os import environ
import discord
import logging



class Vocaleague(commands.Bot):
    def __init__(self):
        super().__init__(
            command_prefix=commands.when_mentioned_or(environ.get('PREFIX', 'v ')),
            help_command=None,
        )
        self.logging = logging
        # self.logging.basicConfig(level=logging.DEBUG)
        self.slash = SlashCommand(self, sync_commands=True)

    async def on_ready(self):
        # status = discord.Game("Vocaleague")
        status = discord.Game("v add <url>")
        await self.change_presence(activity=status)
