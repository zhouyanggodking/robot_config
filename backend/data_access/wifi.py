wifi_info = {
    'name': 'robot-cfg',
    'password': 'onlyforrobot'
}

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
    return wifi_info


def update_wifi_info(w_info):
    if not('name' in w_info):
        return False, 'wifi name is missing'
    wifi_info['name'] = w_info['name']
    if 'password' in w_info:
        wifi_info['password'] = w_info['password']
    else:
        wifi_info['password'] = ''
    return True, 'update successfully'


def get_available_wifi_list():
    return wifi_list
