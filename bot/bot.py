from discord.ext import commands
from discord_slash import SlashCommand

from lib.system import System

from os import environ
import discord
import json
import logging



class Zect(commands.Bot):
    def __init__(self):
        super().__init__(
            command_prefix=commands.when_mentioned_or(environ.get('PREFIX', './')),
            help_command=None,
        )
        self.logging = logging
        # self.logging.basicConfig(level=logging.DEBUG)
        self.system = System()
        self.slash = SlashCommand(self, sync_commands=True)

    async def on_ready(self):
        status = discord.Game("d.py Sample")
        # status = discord.Game("メンテナンス中")
        await self.change_presence(activity=status)
