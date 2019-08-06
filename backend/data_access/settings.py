settings = {
    'camera': 'QVGA',
    'radio': 8000,
    'gps': 'N,12139.72994196,E,4'
}


def get_settings():
    return settings


def update_settings(s):
    if not('camera' in s and 'radio' in s and 'gps' in s):
        return False, 'camera, radio or gps is missing'
    settings['camera'] = s['camera']
    settings['radio'] = s['radio']
    settings['gps'] = s['gps']
    return True, 'updated'
