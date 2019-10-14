def get_device_info():
    device_info = {
        'seriesNumber': 'b827eb319c88'
    }
    return True, device_info


def restart_server():
    return True, 'restarted'


def shutdown_server():
    return True, 'shut down successfully'


def mimic_debug():
    return True, 'mimic debug successfully'


def get_version():
    return True, {
        'currVersion': '1.0.0',
        'latestVersion': '1.0.1'
    }


def update_version():
    return True, 'successfully updated to latest version'
