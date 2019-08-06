serverInfo = {
    'address': 'http://ttyoa.com',
    'port': 8097
}


def get_server_info():
    return serverInfo


def update_server_info(s_info):
    if not('address' in s_info and 'port' in s_info):
        return False, 'address or port is missing'
    serverInfo['address'] = s_info['address']
    serverInfo['port'] = s_info['port']
    return True, 'update successfully'
