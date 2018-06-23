import json
from pprint import pprint


class DBManager:
    def __init__(self):
        self.file_path = 'db.json'
        with open(self.file_path, 'r') as f:
            self.data = json.load(f)

    def print_data_to_file(self):
        with open(self.file_path, 'w') as f:
            json.dump(self.data, f, indent=2, sort_keys=True)

    def add_new_session(self, index, state):
        if self.check_existing_key(index):
            print('Session with id ' + str(index) + ' already exists while trying to create a new session')
        else:
            self.data['sessions'][str(index)] = state
            self.print_data_to_file()

    def get_session(self, index):
        if self.check_existing_key(index):
            return self.data['sessions'][str(index)]
        else:
            return {}

    def remove_session(self, index):
        del self.data['sessions'][str(index)]
        self.print_data_to_file()

    def print_all_db(self):
        pprint(self.data)

    def check_existing_key(self, index):
        if index in self.data['sessions'].keys():
            return True
        else:
            return False


if __name__ == "__main__":
    print("Testing db_manager")
    db_manager = DBManager()
    session = db_manager.get_session('igor')
    pprint(session)
    db_manager.add_new_session('teste', {"number": 10})
    db_manager.print_all_db()
    db_manager.remove_session('teste')
    db_manager.print_all_db()
