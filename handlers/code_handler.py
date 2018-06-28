import tornado.web
from db.db_manager import DBManager
import json


class CodeHandler(tornado.web.RequestHandler):
    def initialize(self):
        self.db_manager = DBManager()

    @tornado.web.asynchronous
    def post(self):
        data = tornado.escape.json_decode(self.request.body)

        username = data['username']
        code = data['code']

        response = self.run_code(code, username)

        self.db_manager.add_new_session(username, response)

        self.update_db_and_response(username, response)
        self.finish()

    def run_code(self, id, username):
        status = {"status": "Running", "output": "EMPTY"}
        return status

    def update_db_and_response(self, id, state):
        self.db_manager.add_new_session(id, state)

        current_session = self.db_manager.get_session(id)
        self.write(json.dumps(current_session))
