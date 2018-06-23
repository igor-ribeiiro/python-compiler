import os
import tornado.web
from handlers.main_handler import MainHandler
from handlers.login_handler import LoginHandler

public_root = os.path.join(os.path.dirname(__file__), 'public')

handlers = [
    (r'/', MainHandler),
    (r'/login', LoginHandler),
    (r'/(.*)', tornado.web.StaticFileHandler, {'path': public_root}),
]

settings = dict(
    debug=True,
    static_path=public_root,
    template_path=public_root
)


if __name__ == "__main__":
    port = 8888
    app = tornado.web.Application(handlers, **settings)
    app.listen(port)
    print("Server running on port " + str(port))
    tornado.ioloop.IOLoop.instance().start()
