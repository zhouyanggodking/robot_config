from flask import Flask, request, jsonify
from data_access import device, server

app = Flask(__name__)

builtinUser = {
    'username': 'admin',
    'password': 'onlyforrobot',
    'token': 'sdljflsadjfk==lasjdklfjaskldfjlkasjdlfjskldjflpf[mvlsdv--=s-df='
}


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


if __name__ == '__main__':
    app.run(port=9999)
