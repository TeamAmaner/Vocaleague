class System():
    """システム変数
    status(bool): 起動中の是非
    players(Players): プレイヤー一覧
    guild(discord.Guild): 実行鯖ID

    """
    def __init__(self):
        self.status = "nothing"
        self.on = False
        self.move_wait = False
        self.guild = None
        self.channel = Channels()
        self.role = Roles()
        self.player = Player()
        self.wolf = Wolf()
        self.fortun = Fortun()


class Channels():
    def __init__(self):
        self.yes = "no"
        self.wolf = None
        self.fortun = None

class Roles():
    def __init__(self):
        self.yes = "no"
        self.on = None
        self.no = None
        self.alive = None
        self.killed = None
        self.live = []
        self.dead = []

class Player():
    def __init__(self):
        self.yes = "no"
        self.all = []
        self.live = []
        self.dead = []

class Wolf():
    def __init__(self):
        self.can_move = False
        self.flag = None

class Fortun():
    def __init__(self):
        self.can_move = False
        self.flag = None
