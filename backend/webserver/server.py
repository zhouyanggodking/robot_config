from flask import Flask, request, jsonify, render_template
from data_access import device, server, wifi, bracelet, settings, test_func
import os

basedir = os.path.dirname(os.path.abspath(__file__))
print(basedir)
app = Flask(__name__,static_url_path='', static_folder=os.path.join(basedir, 'static'), template_folder=os.path.join(basedir, 'static'))

builtinUser = {
    'username': 'admin',
    'password': 'onlyforrobot',
    'token': 'sdljflsadjfk==lasjdklfjaskldfjlkasjdlfjskldjflpf[mvlsdv--=s-df='
}


@app.route('/')
def index():
    return render_template('index.html')


@app.route('/api/login', methods=['post'])
def login():
    login_model = request.json
    # check for fields validation
    if not('username' in login_model and 'password' in login_model):
        return 'username or password is missing', 400
    username = login_model['username']
    password = login_model['password']

    if username == builtinUser['username'] and password == builtinUser['password']:
        res = {
            'token': builtinUser['token']
        }
        return jsonify(res)
    return 'Not Authorized', 401


@app.route('/api/device')
def get_device_info():
    device_info = device.get_device_info()
    return jsonify(device_info)


@app.route('/api/server')
def get_server_info():
    server_info = server.get_server_info()
    return jsonify(server_info)


@app.route('/api/server', methods=['post'])
def update_server_info():
    server_info = request.json
    success, msg = server.update_server_info(server_info)
    if success:
        return msg, 200
    else:
        return msg, 400


@app.route('/api/wifi')
def get_wifi_info():
    wifi_info = wifi.get_wifi_info()
    return jsonify(wifi_info)


@app.route('/api/wifi_list')
def get_available_wifi_list():
    wifi_list = wifi.get_available_wifi_list()
    return jsonify(wifi_list)


@app.route('/api/wifi', methods=['post'])
def update_wifi_info():
    wifi_info = request.json
    success, msg = wifi.update_wifi_info((wifi_info))
    if success:
        return msg, 200
    else:
        return msg, 400


@app.route('/api/bracelet_list')
def get_configured_bracelet_list():
    bracelet_list = bracelet.get_configured_bracelet_list()
    return jsonify(bracelet_list)


@app.route('/api/bracelet/<int:bracelet_id>')
def get_bracelet_info(bracelet_id):
    bracelet_info = bracelet.get_bracelet_info(bracelet_id)
    return jsonify(bracelet_info)


@app.route('/api/bracelet/<int:bracelet_id>', methods=['put'])
def update_bracelet_info(bracelet_id):
    bracelet_info = request.json
    if not('mac' in bracelet_info):
        return 'mac field is missing', 400
    status, msg = bracelet.update_bracelet_info(bracelet_id, bracelet_info['mac'])
    if status:
        return 'updated', 200
    else:
        return msg, 404  # TODO: more error message


@app.route('/api/bracelet', methods=['post'])
def add_bracelet():
    bracelet_info = request.json
    if not ('mac' in bracelet_info):
        return 'mac field is missing', 400
    status, msg = bracelet.add_bracelet(bracelet_info['mac'])
    if status:
        return msg, 200
    else:
        return 'add bracelet failed', 400


@app.route('/api/bracelet/<int:bracelet_id>', methods=['delete'])
def delete_bracelet(bracelet_id):
    status, msg = bracelet.delete_bracelet(bracelet_id)
    if status:
        return msg, 200
    else:
        return msg, 404


@app.route('/api/scan_bracelet_list')
def get_scanned_bracelet_list():
    bracelet_list = bracelet.get_scanned_bracelet_list()
    return jsonify(bracelet_list)


@app.route('/api/settings')
def get_settings():
    s = settings.get_settings()
    return jsonify(s)


@app.route('/api/settings', methods=['put'])
def update_settings():
    s = request.json
    status, msg = settings.update_settings(s)
    if status:
        return msg, 200
    else:
        return msg, 400


# test functionalities
@app.route('/api/start_test_radio', methods=['post'])
def start_test_radio():
    status, msg = test_func.start_test_radio()
    if status:
        return msg, 200
    else:
        return msg, 400


@app.route('/api/stop_test_radio', methods=['post'])
def stop_test_radio():
    status, msg = test_func.stop_test_radio()
    if status:
        return msg, 200
    else:
        return msg, 400


@app.route('/api/start_recording_audio', methods=['post'])
def start_recording_audio():
    status, msg = test_func.start_recording_audio()
    if status:
        return msg, 200
    else:
        return msg, 400


@app.route('/api/stop_recording_audio', methods=['post'])
def stop_recording_audio():
    status, msg = test_func.stop_recording_audio()
    if status:
        return msg, 200
    else:
        return msg, 400


@app.route('/api/play_recorded_audio', methods=['post'])
def play_recorded_audio():
    status, msg = test_func.play_recorded_audio()
    if status:
        return msg, 200
    else:
        return msg, 400


@app.route('/api/start_test_monitor', methods=['post'])
def start_test_monitor():
    status, msg = test_func.start_test_monitor()
    if status:
        return msg, 200
    else:
        return msg, 400


@app.route('/api/stop_test_monitor', methods=['post'])
def stop_test_monitor():
    status, msg = test_func.stop_test_monitor()
    if status:
        return msg, 200
    else:
        return msg, 400


@app.route('/api/capture_camera', methods=['post'])
def capture_camera():
    status, image_data = test_func.capture_camera()
    if status:
        return image_data, 200
    else:
        return 'failed', 400


@app.route('/api/keypad')
def get_keypad_strings():
    status, arr = test_func.get_keypad_strings()
    if status:
        return jsonify(arr), 200
    else:
        return 'failed', 400


if __name__ == '__main__':
    app.run(port=9999)
