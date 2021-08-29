from os import startfile
import discord
from discord.ext import commands

import json
import requests


class Admin(commands.Cog):
    def __init__(self, bot):
        self.bot = bot

    @commands.command()
    async def add(self, ctx, url=''):
        if not url:
            return

        with open("../src/question.json", mode="r", encoding='utf-8') as f:
            qus = json.load(f)
            songAdd = False
        
        res = self.get_data(url)
        try:
            song = res['items'][0]
            lylic = song['lyrics'][0]['value'].replace('\r', '').split('\n\n')[0]
        except IndexError:
            await ctx.reply("この曲は追加できません")
            return
        
        if url.startswith('https://www.nicovideo.jp/watch/'):
            songid = url.replace('https://www.nicovideo.jp/watch/', '')
            if songid in qus["niconico"]:
                await ctx.reply("この曲は既に追加されています。")
                return
            qus["niconico"].append(songid)
            songAdd = True
        if url.startswith('http://nico.ms/'):
            songid = url.replace('http://nico.ms/', '')
            if songid in qus["niconico"]:
                await ctx.reply("この曲は既に追加されています。")
                return
            qus["niconico"].append(songid)
            songAdd = True

        if url.startswith('https://www.youtube.com/watch?v='):
            songid = url.replace('https://www.youtube.com/watch?v=', '')
            if songid in qus["youtube"]:
                await ctx.reply("この曲は既に追加されています。")
                return
            qus["youtube"].append(songid)
            songAdd = True
        if url.startswith('https://youtu.be/'):
            songid = url.replace('https://youtu.be/', '')
            if songid in qus["youtube"]:
                await ctx.reply("この曲は既に追加されています。")
                return
            qus["youtube"].append(songid)
            songAdd = True
        
        if songAdd == True:
            with open("../src/question.json", mode="w", encoding='utf-8') as f:
                WriteQu = json.dumps(qus, ensure_ascii=False, indent=2)
                f.write(WriteQu)
                f.close()
            songName = song["name"]
            await ctx.reply(f"楽曲 {songName} は正常に追加されました")



    def get_data(self, url):
        baseurl = "https://vocadb.net/api/songs"
        pyaload = {"query": url, "maxResults": "1", "fields": "Lyrics"}
        r = requests.get(baseurl, params=pyaload)
        return r.json()


def setup(bot):
    bot.add_cog(Admin(bot))
