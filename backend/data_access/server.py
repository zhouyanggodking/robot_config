from data_access import dbmgr


def get_server_info():
    with dbmgr.get_connection() as conn:
        cursor = conn.cursor()
        cursor.execute('select address, port from robot_conf.server limit 1')
        result = cursor.fetchmany(1)
        if len(result) > 0:
            server_info = {
                'address': result[0][0],
                'port': result[0][1]
            }
            return server_info
        return {}


def update_server_info(s_info):
    if not('address' in s_info and 'port' in s_info):
        return False, 'address or port is missing'
    # first delete record, then add it
    with dbmgr.get_connection() as conn:
        try:
            cursor = conn.cursor()
            cursor.execute('delete from robot_conf.server')
            add_sql = 'insert into robot_conf.server(address, port) values (%s, %s)'
            cursor.execute(add_sql, (s_info['address'], s_info['port']))
            conn.commit()
            return True, 'updated'
        except IOError:
            return False, 'update failed'
