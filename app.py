import os
import tornado.escape
import tornado.httpserver
import tornado.ioloop
import tornado.options
import tornado.web
from handlers.main_handler import MainHandler
from handlers.login_handler import LoginHandler

# import and define tornado-y things
from tornado.options import define
define("port", default=8888, help="run on the given port", type=int)

public_root = os.path.join(os.path.dirname(__file__), 'public')


# application settings and handle mapping info
class Application(tornado.web.Application):
    def __init__(self):
        handlers = [
            (r'/', MainHandler),
            (r'/login', LoginHandler),
            (r'/(.*)', tornado.web.StaticFileHandler, {'path': public_root})
        ]
        settings = dict(
            debug=True,
            static_path=public_root,
            template_path=public_root
        )
        tornado.web.Application.__init__(self, handlers, **settings)


# RAMMING SPEEEEEEED!
def main():
    tornado.options.parse_command_line()
    http_server = tornado.httpserver.HTTPServer(Application())
    port = tornado.options.options.port
    print("Server running on port " + str(port))

    http_server.listen(tornado.options.options.port)

    # start it up
    tornado.ioloop.IOLoop.instance().start()


if __name__ == "__main__":
    main()
