import tornado.web
from db.db_manager import DBManager
import json


class CodeHandler(tornado.web.RequestHandler):
    def initialize(self):
        self.db_manager = DBManager()

    @tornado.web.asynchronous
    def get(self):
        form = """<form method="post">
        <input type="text" name="username"/>
        <input type="text" name="code"/>
        <input type="submit"/>
        </form>"""
        self.write(form)

        # username = self.get_argument('username')
        username = "igor"
        response = self.get_status_from_server(username)

        self.update_db_and_response(username, response)

        self.finish()

    @tornado.web.asynchronous
    def post(self):
        username = self.get_argument('username')
        code = self.get_argument('code')

        response = self.run_code(code, username)

        self.db_manager.add_new_session(username, response)

        self.update_db_and_response(username, response)
        self.finish()

    def get_status_from_server(self, id):
        return {"Status": "ok", "output": "This is the output from the server"}

    def run_code(self, id, username):
        status = {"Status": "Running", "output": "EMPTY"}
        return status

    def update_db_and_response(self, id, state):
        self.db_manager.add_new_session(id, state)

        current_session = self.db_manager.get_session(id)
        print(current_session)
        self.write(json.dumps(current_session))
