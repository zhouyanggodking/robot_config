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
