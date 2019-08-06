bracelet_list = [
    {
        'id': 1,
        'mac': '5CEA1D8CAAE4'
    },
    {
        'id': 2,
        'mac': 'FFFF1D8CAAE4'
    }
]

scanned_bracelet_list = ['5CEA1D8CAAE4', 'EEEE1D8CAAE4', '5CEA1D8CEEEE']


def get_configured_bracelet_list():
    return bracelet_list


def get_bracelet_info(bracelet_id):
    for bracelet in bracelet_list:
        if bracelet.id == bracelet_id:
            return bracelet
    return None


def update_bracelet_info(bracelet_id, mac):
    for bracelet in bracelet_list:
        if bracelet['id'] == bracelet_id:
            bracelet['mac'] = mac
            return True, 'OK'
    return False, 'Not Found'


def add_bracelet(mac):
    length = len(bracelet_list)
    bracelet_list.append({
        'id': length,
        'mac': mac
    })
    return True, 'OK'


def delete_bracelet(bracelet_id):
    for bracelet in bracelet_list:
        if bracelet['id'] == bracelet_id:
            bracelet_list.remove(bracelet)
            return True, 'OK'
    return False, 'Not Found'


def get_scanned_bracelet_list():
    return scanned_bracelet_list
