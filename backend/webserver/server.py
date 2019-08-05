from flask import Flask, request, jsonify

app = Flask(__name__)

builtinUser = {
    'username': 'admin',
    'password': 'onlyforrobot',
    'token': 'sdljflsadjfk==lasjdklfjaskldfjlkasjdlfjskldjflpf[mvlsdv--=s-df='
}

@app.route('/api/login', methods=['post'])
def login():
    loginModel = request.json
    # check for fields validation
    if not('username' in loginModel and 'password' in loginModel):
        return 'username or password is missing', 400
    username = loginModel['username']
    password = loginModel['password']

    if username == builtinUser['username'] and password == builtinUser['password']:
        res = {
            'token': builtinUser['token']
        }
        return jsonify(res)
    return 'Not Authorized', 401


if __name__ == '__main__':
    app.run(port=9999)
