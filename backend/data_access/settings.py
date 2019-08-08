from data_access import dbmgr


def get_settings():
    conn = dbmgr.get_connection()
    try:
        settings = {}
        cursor = conn.cursor()
        cursor.execute('select camera_resolution, audio_frequency, gps from robot_conf.settings limit 1')
        result = cursor.fetchall()
        if len(result) > 0:
            settings = {
                'cameraResolution': result[0][0],
                'audioFrequency': result[0][1],
                'gpsCoord': result[0][2]
            }
        return True, settings
    except IOError:
        return False, 'database operation error'
    finally:
        conn.close()


def update_settings(s):
    if not('cameraResolution' in s and 'audioFrequency' in s):
        return False, 'cameraResolution or audioFrequency is missing'
    camera_resolution = s['cameraResolution']
    audio_freq = s['audioFrequency']
    gps_coord = ''
    if 'gpsCoord' in s:
        gps_coord = s['gpsCoord']

    # first delete record, then add it
    conn = dbmgr.get_connection()
    try:
        cursor = conn.cursor()
        cursor.execute('delete from robot_conf.settings')
        add_sql = 'insert into robot_conf.settings(camera_resolution, audio_frequency, gps) values (%s, %s, %s)'
        cursor.execute(add_sql, (camera_resolution, audio_freq, gps_coord))
        conn.commit()
        return True, 'updated'
    except IOError:
        return False, 'update failed'
    finally:
        conn.close()
    return True, 'updated'
