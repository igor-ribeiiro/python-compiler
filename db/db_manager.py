import json
from pprint import pprint


class DB_Manager:
    def __init__(self):
        self.file_path = 'db.json'
        with open(self.file_path, 'r') as f:
            self.data = json.load(f)

    def add_new_session(self, id):
        self.data['sessions'].append({
            'id': id
        })
        with open(self.file_path, 'w') as f:
            json.dump(self.data, f)

    def get_session(self, id):
        for i in self.data['sessions']:
            if i['id'] == id:
                return i
        print('Session with id ' + str(id) + " not found.")
        return {}

    def print_all_db(self):
        pprint(self.data)


if __name__ == "__main__":
    print("Testing db_manager")
    db_manager = DB_Manager()
    session = db_manager.get_session(3)
    pprint(session)
    db_manager.add_new_session(3)
    db_manager.print_all_db()
