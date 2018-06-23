import os
import tornado.ioloop
import tornado.web as web

public_root = os.path.join(os.path.dirname(__file__), 'public')


class MainHandler(tornado.web.RequestHandler):
    def get(self):
        self.render('index.html')


handlers = [
  (r'/', MainHandler),
  (r'/(.*)', web.StaticFileHandler, {'path': public_root}),
]

settings = dict(
  debug=True,
  static_path=public_root,
  template_path=public_root
)

application = web.Application(handlers, **settings)

if __name__ == "__main__":
    port = int(8888)
    application.listen(port)
    str(port)
    print("Server running on port " + str(port))
    tornado.ioloop.IOLoop.instance().start()