import tornado.web
import tornado.httpclient
import tornado.escape
from db.db_manager import DBManager
import json
import requests


class StatusHandler(tornado.web.RequestHandler):
    def initialize(self):
        self.db_manager = DBManager()

    def post(self):
        data = tornado.escape.json_decode(self.request.body)
        username = data['username']

        response = self.get_status_from_server(username)

        self.db_manager.add_new_session(username, response)

        self.update_db_and_response(username, response)
        self.finish()

    def get_status_from_server(self, id):
        stdout_response = requests.get(
                f"http://localhost:4040/api/stdout?id={id}")
        status_response = requests.get(
                f"http://localhost:4040/api/status?id={id}")
        print(status_response)
        response = { "status": str(status_response.text),
                     "output": str(stdout_response.text)}
        print(response)
        return response

    def update_db_and_response(self, id, state):
        self.db_manager.add_new_session(id, state)

        current_session = self.db_manager.get_session(id)
        self.write(json.dumps(current_session))
