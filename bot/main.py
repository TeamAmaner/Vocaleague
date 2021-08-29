from bot import Vocaleague
import setting

bot = Vocaleague()

BOT_TOKEN = setting.BOT

bot.load_extension("add")

bot.run(BOT_TOKEN)
