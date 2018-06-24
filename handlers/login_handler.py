import tornado.web
from db.db_manager import DBManager


class LoginHandler(tornado.web.RequestHandler):
    def initialize(self):
        self.db_manager = DBManager()

    def get(self):
        form = """<form method="post">
        <input type="text" name="username"/>
        <input type="text" name="designation"/>
        <input type="submit"/>
        </form>"""
        self.write(form)

    def post(self):
        username = self.get_argument('username')
        designation = self.get_argument('designation')
        self.write("Wow " + username + " you're a " + designation)
        print(self.db_manager.get_session(username))
        # return self.db_manager.get_session(username)
