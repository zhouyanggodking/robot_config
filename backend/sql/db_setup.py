import os
from data_access import dbmgr

conn = dbmgr.get_connection()
base_dir = os.path.dirname(os.path.abspath(__file__))


def execute_sql_file(filename, connection):
    file = open(filename, 'r')
    sql = file.read()
    file.close()
    print(sql)

    sql_commands = sql.split(';')
    cursor = connection.cursor()
    for command in sql_commands:
        if command.strip() != '':
            cursor.execute(command)

    connection.commit()


execute_sql_file(os.path.join(base_dir, 'create_database.sql'), conn)
execute_sql_file(os.path.join(base_dir, 'create_tables.sql'), conn)

conn.close()



