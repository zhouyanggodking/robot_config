from data_access import dbmgr

scanned_bracelet_list = [
    {
        'mac': '5CEA1D8CAAE4'
    },
    {
        'mac': 'EEEE1D8CAAE4'
    },
    {
        'mac': '5CEA1D8CEEEE'
    }
]


def get_configured_bracelet_list():
    conn = dbmgr.get_connection()

    try:
        bracelet_list = []
        cursor = conn.cursor()
        cursor.execute('select id, mac from robot_conf.bracelet limit 2')
        result = cursor.fetchall()

        for record in result:
            bracelet = {
                'id': record[0],
                'mac': record[1]
            }
            bracelet_list.append(bracelet)
        return True, bracelet_list
    except IOError:
        return False, 'database operation error'
    finally:
        conn.close()


def get_bracelet_info(bracelet_id):
    conn = dbmgr.get_connection()
    try:
        bracelet = {}
        cursor = conn.cursor()
        cursor.execute('select id, mac from robot_conf.bracelet where id = %s', bracelet_id)
        result = cursor.fetchall()

        if len(result) > 0:
            bracelet = {
                'id': result[0][0],
                'mac': result[0][1]
            }
        return True, bracelet
    except IOError:
        return False, 'database operation error'
    finally:
        conn.close()


def update_bracelet_info(bracelet_id, mac):
    conn = dbmgr.get_connection()
    try:
        cursor = conn.cursor()
        cursor.execute('update robot_conf.bracelet set mac = (%s) where id = (%s)', (mac, bracelet_id))
        conn.commit()
        return True, 'updated'
    except IOError:
        conn.rollback()
        return False, 'update failed'
    finally:
        conn.close()


def add_bracelet(mac):
    conn = dbmgr.get_connection()
    try:
        cursor = conn.cursor()
        cursor.execute('insert into robot_conf.bracelet(mac) values (%s)', (mac,))
        conn.commit()
        return True, 'added bracelet'
    except IOError:
        conn.rollback()
        return False, 'added bracelet failed'
    finally:
        conn.close()


def delete_bracelet(bracelet_id):
    conn = dbmgr.get_connection()
    try:
        cursor = conn.cursor()
        cursor.execute('delete from robot_conf.bracelet where id = ' + bracelet_id)
        conn.commit()
        return True, 'deleted'
    except IOError:
        conn.rollback()
        return False, 'deleted failed'
    finally:
        conn.close()


def get_scanned_bracelet_list():
    return True, scanned_bracelet_list
