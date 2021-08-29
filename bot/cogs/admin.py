import discord
from discord.ext import commands




class Admin(commands.Cog):
    def __init__(self, bot):
        self.bot = bot
        self.system = bot.system


    @commands.command()
    async def hello(self,ctx):
        await ctx.send("hello")












def setup(bot):
    bot.add_cog(Admin(bot))
