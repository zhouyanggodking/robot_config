from data_access import dbmgr

wifi_list = [
    {
        'name': 'robot-cfg',
        'isSecured': True
    },
    {
        'name': 'godking',
        'isSecured': False
    },
    {
        'name': 'test',
        'isSecured': True
    }
]


def get_wifi_info():
    conn = dbmgr.get_connection()
    try:
        wifi_info = {}
        cursor = conn.cursor()
        cursor.execute('select name, password from robot_conf.wifi limit 1')
        result = cursor.fetchall()
        if len(result) > 0:
            wifi_info = {
                'name': result[0][0],
                'password': result[0][1]
            }
        return True, wifi_info
    except IOError:
        return False, 'database operation error'
    finally:
        conn.close()


def update_wifi_info(w_info):
    if not('name' in w_info):
        return False, 'wifi name is missing'
    conn = dbmgr.get_connection()
    try:
        cursor = conn.cursor()
        cursor.execute('delete from robot_conf.wifi')
        add_sql = 'insert into robot_conf.wifi(name, password) values (%s, %s)'
        cursor.execute(add_sql, (w_info['name'], w_info['password']))
        conn.commit()
        return True, 'updated'
    except IOError:
        return False, 'update failed'
    finally:
        conn.close()


def get_available_wifi_list():
    # TODO: call external API to get available wifi list
    return True, wifi_list
